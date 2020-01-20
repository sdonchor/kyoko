const Gpio = require("onoff").Gpio;

const buzzer = require("./buzzer");

const ins = [new Gpio(2, "high", { reconfigureDirection: false }), null, null];

module.exports = {
  switch: function(id) {
    let status = ins[id-1].readSync();
    if(status==0)
    {
      ins[id-1].writeSync(1);
    }
    else
    {
      ins[id-1].writeSync(0);
    }
  },
  openDoor: function() {
    ins[0].writeSync(0);
    buzzer.startBeep("repeat", 5);
    setTimeout(function() {
      ins[0].writeSync(1);
    }, 1500);
  }
};
