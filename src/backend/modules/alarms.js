const utils = require('../util/utils')
const buzzer = require('../device_controllers/buzzer')
let alarms = [];

const ringAlarm = ()=>{
    buzzer.constantBeep();
}

module.exports = {
  addAlarm: function(description, time) {
    let ms = utils.msTillTime(time);
    let alarm = {description, time, timeout: setTimeout(ringAlarm,ms)}
    alarms.push(alarm);
  },
  getAlarms: function(){
      return alarms;
  },
  removeAlarm: function(idx){
      clearTimeout(alarms[idx].timeout)
      alarms.splice(idx,1);
  }
};
