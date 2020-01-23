const express = require("express");
const fs = require("fs");
const dateformat = require("dateformat");

const usermanager = require("./modules/user_management");
const cookiemanager = require("./modules/cookies_management");
const db = require("./database/database_handler");
const deviceControler = require("./device_controllers/devices");
const relay = require("./device_controllers/relay");
const led_strip = require("./device_controllers/led_strip");
const door_sensor = require("./device_controllers/door_sensor");
const alarms = require("./modules/alarms");
const messageboard = require("./modules/messageboard");
const weather = require("./modules/weather");
const logger = require("./util/logger");
const log = logger.log;
const config = require("./configs/config");

const router = express.Router();

/*****MIDDLEWARE*****/
router.use(async function visitorCheck(req, res, next) {
  let ua = req.headers["user-agent"];
  let time = dateformat(new Date(), "dd-mm-yyyy HH:MM:ss");
  let visitors = await db.getVisitors();
  let exists = false;
  visitors.forEach(x => {
    if (x.ip == req.ip) {
      exists = true;
    }
  });
  if (!exists) db.addVisitor(req.ip, ua, time);
  next();
});

const permsCheck = usermanager.permsCheck;

/*****AUTHORIZATION*****/
router.post("/login", async function(req, res) {
  let authdata = await usermanager.logIn(req.body.password);
  if (authdata === 0) {
    cookiemanager.sendLogoutCookies(res);

    res.end("0");
  } else if (authdata === "inactive") {
    cookiemanager.sendLogoutCookies(res);

    res.end("inactive");
  } else {
    cookiemanager.sendLoginCookies(res, authdata);
    let client_authdata = {
      id: authdata.id,
      name: authdata.name,
      permission_level: authdata.permission_level
    };
    log("security", `${authdata.name} has logged in.`);
    res.json(client_authdata);
  }
});

router.get("/login", async function(req, res) {
  let user = req.signedCookies.user;
  if (user) {
    let active = await db.isUserActive(user.id);
    if (active) {
      res.json(user);
    } else {
      cookiemanager.sendLogoutCookies(res);
    }
  }
});

router.get("/logout", async function(req, res) {
  log("security", `${req.signedCookies.user.name} logged out.`);
  cookiemanager.sendLogoutCookies(res);
  res.end("ok");
});

/*****USER MANAGEMENT*****/
router.get("/users", permsCheck(3), async function(req, res) {
  let users = await db.getAllUsers();
  res.json(users);
});

router.get("/users/:id(\\d+)", permsCheck(3), async function(req, res) {
  let user = await db.getUserById(req.params.id);
  res.json(user);
});

/*****LED STRIP*****/
router.post("/setLedStrip", permsCheck(5), function(req, res) {
  led_strip.setLedStrip(req.body.r, req.body.g, req.body.b);
  res.end("ok");
});

router.get("/discoOn", permsCheck(5), function(req, res) {
  led_strip.hsvCycleStart();
  log("led", `${req.signedCookies.user.name} turned on disco mode.`);
  res.end("ok");
});

router.get("/discoOff", permsCheck(5), function(req, res) {
  led_strip.hsvCycleStop();
  log("led", `${req.signedCookies.user.name} turned off disco mode.`);
  res.end("ok");
});

/*****RELAY*****/
router.get("/switchRelay/:id", permsCheck(5), function(req, res) {
  relay.switch(req.params.id);
  log(
    "relay",
    `${req.signedCookies.user.name} switched relay channel ${req.params.id}.`
  );
  res.end("ok");
});

router.get("/openDoor", permsCheck(2), function(req, res) {
  relay.openDoor();
  log("relay", `${req.signedCookies.user.name} has opened the door.`);
  res.end("ok");
});

router.get("/openDoorToken", async function(req, res) {
  if (req.query.token) {
    let auth = await db.tokenAuth(req.query.token);

    if (auth) {
      log(
        "relay",
        `Door was opened using token id ${auth.id} belonging to ${auth.name}.`
      );
      relay.openDoor();
      res.end("ok");
      return;
    }
  }
  res.end("bad token");
});

/*****SENSOR DATA*****/
router.get("/getDHT11Reading", permsCheck(0), async function(req, res) {
  let json = fs.readFileSync("./src/backend/readings/dht11.json");
  res.end(json);
});

router.get("/getRpiTemp", permsCheck(0), async function(req, res) {
  let json = fs.readFileSync("./src/backend/readings/rpi_temp.json");
  res.end(json);
});

router.get("/doorStatus", permsCheck(0), function(req, res) {
  let status = door_sensor.isDoorOpen();
  res.end(status ? "1" : "0");
});

router.get("/doorLastOpened",permsCheck(3),async function(req,res){
  let status = await door_sensor.lastOpened();
  res.end(status);
})

/*****ALARMS*****/
router.get("/getAlarms", permsCheck(5), function(req, res) {
  res.json(alarms.getAlarms());
});

router.post("/setAlarm", permsCheck(5), function(req, res) {
  let description = req.body.description;
  let time = req.body.time;
  if (alarms.addAlarm(description, time)) {
    log(
      "alarms",
      `${req.signedCookies.user.name} added alarm at ${time}, description ${description}.`
    );
    res.end("ok");
  } else res.end("exists");
});

router.post("/removeAlarm", permsCheck(5), function(req, res) {
  alarms.removeAlarm(req.body.idx);
  log(
    "alarms",
    `${req.signedCookies.user.name} deleted alarm id ${req.body.idx}.`
  );
  res.end("ok");
});

/*****MESSAGEBOARD*****/
router.get("/messages", permsCheck(4), async function(req, res) {
  let messages = await messageboard.getMessages();
  res.json(messages);
});
router.post("/messages", permsCheck(5), function(req, res) {
  const id = req.signedCookies.user.id;
  let message = {
    content: req.body.content,
    author: id
  };
  let status = messageboard.addMessage(message);
  if (status) {
    log("messageboard", `${who} added message ${req.body.content}.`);
    res.json(status);
  } else {
    res.end("0");
  }
});
router.delete("/messages/:id(\\d+)", permsCheck(5), function(req, res) {
  let who = req.signedCookies.user.id;
  let status = messageboard.removeMessage(req.params.id, who);
  if (status) {
    log("messageboard", `${who} deleted message id ${req.params.id}.`);
    res.json(status);
  } else {
    res.end("0");
  }
});

/*****WEATHER*****/
router.get("/weather", permsCheck(0), function(req, res) {
  res.json(weather.getWeather());
});

/*****SAFEMODE*****/
router.put("/safemode", permsCheck(5), function(req, res) {
  door_sensor.setSafeMode(!door_sensor.getSafeMode());
  res.json(door_sensor.getSafeMode());
});

router.get("/safemode", permsCheck(5), function(req, res) {
  res.json(door_sensor.getSafeMode());
});

/*****CONFIG*****/
router.get("/config/:type", permsCheck(10), function(req, res) {
  if (req.params.type == "modules") {
    let modulesConfig = {
      weather: config.getConfig("weather"),
      led: config.getConfig("led")
    };
    res.json(modulesConfig);
  } else if(req.params.type=="mailer"){
    res.json(config.getConfig("mailer"));
  }
});

router.post("/config/:type",permsCheck(10), function(req,res){
  if (req.params.type == "modules") {
    config.editConfig("weather",req.body.weather);
    config.editConfig("led",req.body.led);

    config.saveConfig("weather");
    config.saveConfig("led");

  }
})
/*****LOGS*****/
router.get("/logcategories",permsCheck(9), async function(req,res){
  let categories = await db.getLogCategories();
  res.json(categories);
})

router.get("/logs",permsCheck(9), async function(req,res){
  let logs = await db.getLogs();
  res.json(logs);
})
module.exports = router;
