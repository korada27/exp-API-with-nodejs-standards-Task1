
const mariadb = require('mariasql'),
  config = require('config.json')('./config/dbconfig.json'),
  sequalize = require('sequelize');

//Database Initialization using Sequalize (ORM)
var sequelize = new sequalize(config.mariaDB.db, config.mariaDB.username, config.mariaDB.password, {
  host: config.mariaDB.host,
  port: config.mariaDB.port,
  dialect: config.mariaDB.dialect,
  timezone : "+05:30",
  pool: {
    max: 30,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(function () {
    console.log("Authentication Successful - MariaDB Connection Established");
  })
  .catch(function (err) {
    console.log.error("SOMETHING DONE GOOFED with Maria DB " + JSON.stringify(err));
  })
  .done();

module.exports = sequelize;
