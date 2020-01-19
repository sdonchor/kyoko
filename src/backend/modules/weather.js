const axios = require("axios");
const fs = require("fs");
const dateformat = require('dateformat');

const updateWeatherFile = function(weather) {
    fs.writeFile(global.rootDir + "/readings/weather.json", JSON.stringify(weather), function(err) {
        if (err) {
          return console.log(err);
        }
      });
};


let options = { //get from config
    api_key: "1a4cf33271b02054c45a222e7d722289",
    city_id: 3094802,
    units: "metric"
  };
const url = `https://api.openweathermap.org/data/2.5/weather?id=${options.city_id}&units=${options.units}&appid=${options.api_key}`;
const icons_url = `http://openweathermap.org/img/wn/`;

const updateWeather = function() {
  axios.get(url).then(response => {
    let weather = {
        location: `${response.data.name}, ${response.data.sys.country}`,
        icon: icons_url+response.data.weather[0].icon+'.png',
        description: response.data.weather[0].description,
        temperature: Math.round(response.data.main.temp),
        temperature_max: Math.round(response.data.main.temp_max),
        temperature_min: Math.round(response.data.main.temp_min),
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        wind_speed: response.data.wind.speed,
        updated_at: dateformat(new Date(), "dd-mm-yyyy HH:MM:ss")

    };
    updateWeatherFile(weather);
  });
};

const getWeather = function(){
    const weather = JSON.parse(fs.readFileSync(global.rootDir + "/readings/weather.json"));
    return weather;
};

updateWeather();
const weatherInterval = setInterval(updateWeather,300000)


module.exports = {
    getWeather
}