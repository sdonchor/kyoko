const express = require("express");
const router = express.Router();
const db = require("./database/database_handler");
const deviceControler = require("./device_controllers/device_controller");
const fs = require("fs");


const dateformat = require("dateformat");

const relay = require('./device_controllers/relay')
const led_strip = require('./device_controllers/led_strip')

  router.use(function middlewaretest(req, res, next) {
  /*let ua = req.headers["user-agent"];
  let location = geoip.allData(req.ip);
  let time = dateformat(new Date(),"dd-mm-yyyy h:mm:ss")
  let visitors = fs.readFileSync('visitors.txt');
  if(!visitors.includes(req.ip))
    fs.appendFileSync('visitors.txt', `[${time}] ${req.ip} from ${location.city}, ${location.country} using ${ua}\n`);*/
  next();
});

router.post("/login", async function(req, res) {
  let auth = await db.auth(req.body.password, req.session, req.sessionID);
  if (!auth) {
    res.end("0");
  } else if (auth === "inactive") {
    res.end("inactive");
  } else {
    req.session.loggedIn = true;
    req.session.authData = auth;
    res.end(JSON.stringify(auth));
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
      deviceControler.openDoor();
      res.end("ok");
      return;
    }
  }
  console.log(req.query.token);
  res.end("bad token");
});

router.get("/getDHT11Reading", async function(req, res) {
  let json = fs.readFileSync("./src/backend/readings/dht11.json");
  res.end(json);
});

router.get("/getRpiTemp", async function(req, res) {
  let json = fs.readFileSync("./src/backend/readings/rpi_temp.json");
  res.end(json);
});

router.post("/alarmOn", function(req, res) {
  if (!(req.session.authData && req.session.authData.permission_level > 2))
    res.end("0");
  deviceControler.alarmOn(req.body.time);
  res.end("ok");
});
module.exports = router;