const express = require("express");
const fs = require("fs");
const dateformat = require("dateformat");

const usermanager = require("./modules/user_management");
const cookiemanager = require("./modules/cookies_management");
const db = require("./database/database_handler");
const deviceControler = require("./device_controllers/devices");
const relay = require("./device_controllers/relay");
const led_strip = require("./device_controllers/led_strip");
const alarms = require("./modules/alarms");

const router = express.Router();

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
  let authdata = await usermanager.logIn(req.body.password);
  if (authdata === 0) {
    cookiemanager.sendLogoutCookies(res);

    res.end("0");
  } else if (authdata === "inactive") {
    cookiemanager.sendLogoutCookies(res);

    res.end("inactive");
  } else {   //TODO sync vuex and cookies
    cookiemanager.sendLoginCookies(res, authdata);
    req.session.loggedIn = true;
    req.session.authdata = authdata;
    let client_authdata={
      id: authdata.id,
      name: authdata.name,
      permissions: authdata.permissions
    };
    res.json(client_authdata);
  }
});

router.get("/login", async function(req, res) {
  if (req.session.loggedIn && req.session.authdata) {
    res.json(req.session.authdata);
  } else {
    cookiemanager.sendLogoutCookies(res);
    res.end('0');
  }
});

router.get("/logout", async function(req, res) {
  cookiemanager.sendLogoutCookies(res);
  req.session.loggedIn=false;
  req.session.authdata=null;
  res.end('ok');
});

/*****LED STRIP*****/
router.post("/setLedStrip", function(req, res) {
  led_strip.setLedStrip(req.body.r, req.body.g, req.body.b);
  res.end("ok");
});

router.get("/discoOn", function(req, res) {
  led_strip.hsvCycleStart();
  res.end("ok");
});

router.get("/discoOff", function(req, res) {
  led_strip.hsvCycleStop();
  res.end("ok");
});

/*****RELAY*****/
router.get("/openDoor", function(req, res) {
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
