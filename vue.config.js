const configureAPI = require('./src/backend/configure');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    before: configureAPI,
    host: "0.0.0.0",
    public: "0.0.0.0:8080",
    disableHostCheck: true
},
}