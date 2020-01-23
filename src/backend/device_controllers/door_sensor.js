const Gpio = require("onoff").Gpio;
const doorSensor = new Gpio(23, "in", "both", { debounceTimeout: 1000 });
const buzzer = require('./buzzer');
const mailer = require('../util/email');
const dateformat = require('dateformat');
const fs = require('fs');
let mailReceivers = ["sdonchor@gmail.com","shaku1745@gmail.com"];

let doorOpened=-1;
let safeMode = false;

const setLastOpened = function(time){
    fs.writeFileSync(global.rootDir + "/readings/door_last_opened.txt",time);
}

doorSensor.watch((err, value) => {
    if (err) {
      throw err;
    } else {
        if(doorOpened==-1)
        {
            doorOpened=value;
            return;
        }
        if(doorOpened!=value)
        {
            doorOpened=value; 
            if(value===0)
            {
                console.log('door opened');
                setLastOpened(dateformat(new Date(),'yyyy-mm-dd HH:MM:ss'));
                if(safeMode)
                {
                    mailer.sendmail(
                        'SAFEMODE ALERT',
                        `Door was opened at ${dateformat(new Date(),'yyyy-mm-dd HH:MM:ss')} while the safemode was active`
                    )
                }
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
    },
    lastOpened: function(){
        return fs.readFileSync(global.rootDir + "/readings/door_last_opened.txt");
    }
}