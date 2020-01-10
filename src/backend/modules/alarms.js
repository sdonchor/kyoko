const utils = require('../util/utils')
const buzzer = require('../device_controllers/buzzer')
let alarms = [];

const ringAlarm = (time)=>{
  buzzer.constantBeep();
  let active = alarms.filter((x)=>{
    return x.time === time;
  })
  active.forEach((x,idx) => {
    alarms.splice(idx,1);
  });
   
   
}

module.exports = {
  addAlarm: function(description, time) {
    alarms.forEach(x => {
      if(x.time==time)
      {
        return false; //FIXME duplicate detection
      }
    });
    let ms = utils.msTillTime(time);
    let alarm = {description, time, timeout: setTimeout(()=>{
      ringAlarm(time)
    },ms)}
    alarms.push(alarm);
    return true;
  },
  getAlarms: function(){
      let list = [];
      alarms.forEach((x)=>{
        let obj = {
          description: x.description,
          time: x.time
        }
        list.push(obj);
      });
      return list;
  },
  removeAlarm: function(idx){
      clearTimeout(alarms[idx].timeout)
      alarms.splice(idx,1);
  }
};
