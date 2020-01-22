const Gpio = require("onoff").Gpio;
const doorSensor = new Gpio(23, "in", "both", { debounceTimeout: 1000 });
const buzzer = require('./buzzer');
const mailer = require('../util/email');
const dateformat = require('dateformat');

let mailReceivers = ["sdonchor@gmail.com","shaku1745@gmail.com"];

let doorOpened=-1;
let safeMode = false;

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
                if(safeMode)
                {
                    mailer.sendmail(
                        'SAFEMODE ALERT',
                        `Door was opened at ${dateformat(new Date(),'yyyy-mm-dd HH:MM:ss')} while the safemode was active`,
                        mailReceivers.join(' ,')
                    )
                }
                //buzzer.startBeep('single',1500)
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
    },
    setSafeMode: function(on){
        console.log('safemode is '+on);
        safeMode = on;
    },
    getSafeMode: function(){
        return safeMode;
    }
}