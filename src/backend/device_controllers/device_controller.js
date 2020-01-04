const Gpio = require("onoff").Gpio;
const fs = require("fs");


const utils = require("../util/utils");


const button = new Gpio(17, "in", "rising", { debounceTimeout: 10 });

/*****Devices******/

const dht11 = require('./dht11')
const rpi = require('./rpi')
const buzzer = require('./buzzer')
const led_strip = require('./led_strip')

/******************/



/************** */


let alarmsList = [];
var alarmclock = null;


//cycleHSV(0,'up');

var randomColorTest = null;

button.watch((err, value) => {
  if (err) {
    throw err;
  } else {
    buzzer.stopBeep();
    led_strip.hsvCycleOn() ? led_strip.hsvCycleStop() : led_strip.hsvCycleStart();
  }
});


module.exports = {
  alarmOn: function(time) {
    let time_tmp = time.split(":");
    let hours = time_tmp[0];
    stopsignal = false;
    let minutes = time_tmp[1];
    let now = new Date();
    let millisTillTime =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0,
        0
      ) - now;
    if (millisTillTime < 0) {
      millisTillTime += 86400000; // it's after 10am, try 10am tomorrow.
    }
    alarmsList.push({
      time: time,
      timeout: setTimeout(() => {
        alarmsList = alarmsList.filter(function(obj) {
          return obj.time !== time;
        });
        constantBeep();
      }, millisTillTime)
    });
  }

  //alarmsList(), alarmOff()
};
