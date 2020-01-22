const fs = require("fs");

let configs = {
    sensors : {config : null, path:__dirname+"/sensors.json"},
    weather : {config : null, path:__dirname+"/weather.json"},
    led : {config : null, path:__dirname+"/led.json"},
    mailer: {config: null, path:__dirname+"/mailer.json"}
}

const reloadConfig = function(moduleName){
    if(moduleName=='all')
    {
        for(let key in configs){
            if(!configs.hasOwnProperty(key)) continue;
            configs[key].config = JSON.parse(fs.readFileSync(configs[key].path));
        }
       
    }
    else
    {
        configs[moduleName].config = JSON.parse(fs.readFileSync(configs[moduleName].path));
    }
}

const getConfig = function(moduleName){
    if(moduleName=='all')
    {
        return configs;
    }
    else
    {
        return configs[moduleName].config;
    }
}

const saveConfig = function(moduleName){
    if(moduleName=='all')
    {
        for(let key in configs){
            if(!configs.hasOwnProperty(key)) continue;
            fs.writeFileSync(configs[key].path,configs[key].config);
        }
    }
    else{
        fs.writeFileSync(configs[moduleName].path,configs[moduleName].config);
    }
}
const editConfig = function(moduleName,config){
    if(moduleName='all')
    {
        configs = config;
    }
    else
    {
        configs[moduleName].config = config;
    }
}

reloadConfig('all');

module.exports = {
    reloadConfig,
    getConfig,
    saveConfig,
    editConfig
};
