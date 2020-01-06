const express = require("express");
const router = express.Router();
const db = require("./database/database_handler");
const deviceControler = require("./device_controllers/devices");
const fs = require("fs");
const dateformat = require("dateformat");

const relay = require("./device_controllers/relay");
const led_strip = require("./device_controllers/led_strip");

const alarms = require("./modules/alarms");

/*****MIDDLEWARE*****/
router.use(function middlewaretest(req, res, next) {
  let ua = req.headers["user-agent"];
  let time = dateformat(new Date(), "dd-mm-yyyy h:mm:ss");
  let visitors = fs.readFileSync("visitors.txt");
  if (!visitors.includes(req.ip))
    fs.appendFileSync("./visitors.txt", `[${time}] ${req.ip} using ${ua}\n`);
  next();
});

/*****AUTHORIZATION*****/
router.post("/login", async function(req, res) {
  let auth = await db.auth(req.body.password, req.session, req.sessionID);
  if (!auth) {
    res.end("0");
  } else if (auth === "inactive") {
    res.end("inactive");
  } else {
    req.session.loggedIn = true;
    req.session.authData = auth;
    res.json(auth);
  }
});

router.get("/logincheck", async function(req, res) {
  if (req.session.loggedIn && req.session.authData) {
    res.end(JSON.stringify(req.session.authData));
  } else {
    let fail = {};
    fail.error = "no current session";
    res.end(JSON.stringify(fail));
  }
});

/*****LED STRIP*****/
router.post("/setLedStrip", function(req, res) {
  /* if (!(req.session.authData && req.session.authData.permission_level > 2))
     res.end("0");*/
  led_strip.setLedStrip(req.body.r, req.body.g, req.body.b);
  res.end("ok");
});

router.get("/discoOn", function(req, res) {
  /* if (!(req.session.authData && req.session.authData.permission_level > 2))
     res.end("0");*/
  led_strip.hsvCycleStart();
  res.end("ok");
});

router.get("/discoOff", function(req, res) {
  /* if (!(req.session.authData && req.session.authData.permission_level > 2))
     res.end("0");*/
  led_strip.hsvCycleStop();
  res.end("ok");
});

/*****RELAY*****/
router.get("/openDoor", function(req, res) {
  /* if (!(req.session.authData && req.session.authData.permission_level > 2))
    res.end("0");*/
  relay.openDoor();
  res.end("ok");
});

router.get("/openDoorToken", async function(req, res) {
  if (req.query.token) {
    let auth = await db.tokenAuth(req.query.token);
    if (auth == 1) {
      relay.openDoor();
      res.end("ok");
      return;
    }
  }
  res.end("bad token");
});

/*****SENSOR DATA*****/
router.get("/getDHT11Reading", async function(req, res) {
  let json = fs.readFileSync("./src/backend/readings/dht11.json");
  res.end(json);
});

router.get("/getRpiTemp", async function(req, res) {
  let json = fs.readFileSync("./src/backend/readings/rpi_temp.json");
  res.end(json);
});

/*****ALARMS*****/
router.get("/getAlarms", function(req, res) {
  res.json(alarms.getAlarms());
});

router.post("/setAlarm", function(req, res) {
  let description = req.body.description;
  let time = req.body.time;
  if (alarms.addAlarm(description, time)) res.end("ok");
  else res.end("exists");
});

router.post("/removeAlarm", function(req, res) {
  alarms.removeAlarm(req.body.idx);
  res.end("ok");
});

module.exports = router;
