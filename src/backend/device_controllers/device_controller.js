const Gpio = require("onoff").Gpio;
const fs = require("fs");
const pigpio = require("pigpio").Gpio;

const utils = require("../util/utils");


const led_strip_red = new pigpio(21, { mode: pigpio.OUTPUT });
const led_strip_green = new pigpio(20, { mode: pigpio.OUTPUT });
const led_strip_blue = new pigpio(16, { mode: pigpio.OUTPUT });
const rgb_interval = null;
const animation_speed = 10;



const button = new Gpio(17, "in", "rising", { debounceTimeout: 10 });

/*****Devices******/

const dht11 = require('./dht11')
const rpi = require('./rpi')
const buzzer = require('./buzzer')

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
  }
});

function cycleHSV(hue, dir) {
  if(stopsignal)
  {
    stopsignal==false;
    return;
  }
  let rgb = utils.HSVtoRGB(hue/360, 1, 1);
  setLedStrip(Math.round(rgb[0]),Math.round(rgb[1]),Math.round(rgb[2]));
  if (dir === "up") {
    if (hue >= 360) {
      setTimeout(function() {
        cycleHSV(359, "down");
      }, animation_speed);
    } else {
      setTimeout(function() {
        cycleHSV(hue + 1, "up");
      }, animation_speed);
    }
  } else if (dir === "down") {
    if (hue <= 0) {
      setTimeout(function() {
        cycleHSV(1, "up");
      }, animation_speed);
    } else {
      setTimeout(function() {
        cycleHSV(hue - 1, "down");
      }, animation_speed);
    }
  }
}
function setLedStrip(r, g, b) {
  led_strip_red.pwmWrite(r);
  led_strip_green.pwmWrite(g);
  led_strip_blue.pwmWrite(b);
}






function ledStripRandom() {
  let r = utils.randomInt(0, 255);
  let g = utils.randomInt(0, 255 - r);
  let b = utils.randomInt(0, 255 - r - g);

  led_strip_red.pwmWrite(r);
  led_strip_green.pwmWrite(g);
  led_strip_blue.pwmWrite(b);
}





module.exports = {
  
  setLedStrip: function(r, g, b) {
    led_strip_red.pwmWrite(r);
    led_strip_green.pwmWrite(g);
    led_strip_blue.pwmWrite(b);
  },
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
