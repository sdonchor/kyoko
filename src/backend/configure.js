const bodyParser = require('body-parser')
const api = require('./api')
const session = require('express-session')
const cookieParser = require('cookie-parser')

global.rootDir=__dirname;

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser('test'));
  app.use(session({
    key: 'user_sid',
    secret: 'kyoko119controlsystemdeveloperversion',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
  app.use('/api', api)
}