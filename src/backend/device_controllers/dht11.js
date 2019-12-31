const dht = require("node-dht-sensor");
const fs = require('fs');
async function dhtToFile() {
    let dht = await getDHT11Reading();
    fs.writeFile(global.rootDir + "/readings/dht11.json", JSON.stringify(dht), function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  function getDHT11Reading() {
    return new Promise(function(resolve, reject) {
      dht.read(11, 3, function(err, temperature, humidity) {
        if (!err) {
          var dht11 = {};
          dht11.temp = temperature;
          dht11.humid = humidity;
          resolve(dht11);
        } else {
          reject(err);
        }
      });
    });
  }

  setInterval(dhtToFile, 10000);