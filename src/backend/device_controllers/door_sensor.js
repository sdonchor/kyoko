const Gpio = require("onoff").Gpio;
const doorSensor = new Gpio(23, "in", "both", { debounceTimeout: 1000 });
const buzzer = require('./buzzer');

let doorOpened=-1;

doorSensor.watch((err, value) => {
    if (err) {
      throw err;
    } else {
        if(doorOpened!=value)
        {
            doorOpened=value; 
            if(value===0)
            {
                console.log('door opened');
                buzzer.startBeep('single',1500)
            }
            else if(value===1)
            {
                console.log('door closed');
            }
        }
    }
});

module.exports={
    isDoorOpen: function(){
        return doorOpened===1;
    }
}