const Sequelize = require("sequelize");

const connection = new Sequelize("tekblog", "techdev", "ilfr741852", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-03:00",
});

module.exports = connection;
