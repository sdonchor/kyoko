const pigpio = require("pigpio").Gpio;

const led_strip_red = new pigpio(21, { mode: pigpio.OUTPUT });
const led_strip_green = new pigpio(20, { mode: pigpio.OUTPUT });
const led_strip_blue = new pigpio(16, { mode: pigpio.OUTPUT });
const rgb_interval = null;
const animation_speed = 3;
const utils = require('../util/utils')

let hsv_interval = null;
let hue=0;

function cycleHSV() {
  let rgb = utils.HSVtoRGB(hue / 360, 1, 1);
  setLedStrip(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]));
  if(hue>=360)
  {
      hue=0;
  }
  else
  {
      hue++;
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
  setLedStrip,
  hsvCycleStart: function() {
    if(hsv_interval===null)
      hsv_interval=setInterval(cycleHSV,animation_speed);
  },
  hsvCycleStop: function(){
      clearInterval(hsv_interval);
      hsv_interval=null;
      setLedStrip(0,0,0);
  },
  hsvCycleOn: function(){
      if(hsv_interval)
      {
          return true;
      }
      else
      {
          return false;
      }
  }
};
