const rpitemp = require("pi-temperature");
const fs = require('fs')


async function rpiTempToFile() {
    let rpi = await getRpiTempReading();
    fs.writeFile(global.rootDir + "/readings/rpi_temp.json", JSON.stringify(rpi), function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  
function getRpiTempReading() {
    return new Promise(function(resolve, reject) {
      rpitemp.measure(function(err, temp) {
        if (err) reject(err);
        else {
          var rpi = {};
          rpi.temp = temp;
          resolve(rpi);
        }
      });
    });
  }
  

  
setInterval(rpiTempToFile, 10000);