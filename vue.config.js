const configureAPI = require('./src/backend/configure');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    before: configureAPI,
    host: "192.168.1.45",
    public: "192.168.1.45:8080",
    disableHostCheck: true
},
}