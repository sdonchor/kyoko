const Gpio = require("onoff").Gpio;

const buzzer = require("./buzzer");

const ins = [new Gpio(2, "high", { reconfigureDirection: false }), null, null,null]; //TODO add the rest of channels

module.exports = {
  switch: function(id) {
    let status = ins[id].readSync();
    if(status==0)
    {
      ins[id].writeSync(1);
    }
    else
    {
      ins[id].writeSync(0);
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
