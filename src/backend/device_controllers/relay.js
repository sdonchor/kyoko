const buzzer = require("./buzzer");
const relay_ins1 = new Gpio(2, "high", { reconfigureDirection: false });
module.exports = {
  openDoor: function() {
    relay_ins1.writeSync(0);
    buzzer.startBeep("repeat", 5);
    setTimeout(function() {
      relay_ins1.writeSync(1);
    }, 1500);
  }
};
