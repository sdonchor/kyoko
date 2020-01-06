const Gpio = require("onoff").Gpio;
const fs = require("fs");
const utils = require("../util/utils");




/*****Devices******/

const dht11 = require('./dht11')
const rpi = require('./rpi')
const buzzer = require('./buzzer')
const led_strip = require('./led_strip')

/******************/

/*****Buttons*****/
const button = new Gpio(17, "in", "rising", { debounceTimeout: 10 });
button.watch((err, value) => {
  if (err) {
    throw err;
  } else {
    buzzer.stopBeep();
    led_strip.hsvCycleOn() ? led_strip.hsvCycleStop() : led_strip.hsvCycleStart();
  }
});

/******************/

module.exports = {
  
};
