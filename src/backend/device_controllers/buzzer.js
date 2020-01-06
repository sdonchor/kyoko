const Gpio = require("onoff").Gpio;

const buzzer = new Gpio(26, "out");
let beepInterval = null;

let stopsignal = false;



module.exports = {
  stopBeep: function() { 
    stopsignal = true;
    clearInterval(beepInterval);
    beepInterval=null;
    buzzer.writeSync(0);
  },
  startBeep: function(mode,param=5){
    stopsignal = false;
    if(mode==="repeat")
    {
        this.beepBeep(param,0)
    }
    else if(mode==="constant")
    {
        this.constantBeep();
    }
  },
  beepBeep: function(n, curr) {
    if (stopsignal == true) {
      stopsignal = false;
      buzzer.writeSync(0);
      return;
    }
    if (curr == 0) {
      buzzer.writeSync(1);
      if (n > 0)
        setTimeout(()=> {
          this.beepBeep(n - 1, 1);
        }, 180);
      else buzzer.writeSync(0);
    } else {
      buzzer.writeSync(0);
      if (n > 0)
        setTimeout(()=> {
          this.beepBeep(n, 0);
        }, 100);
      else buzzer.writeSync(0);
    }
  },

  constantBeep: function() {
    beepInterval = setInterval(()=> {
      this.beepBeep(5, 0);
    }, 2000);
  }
};
