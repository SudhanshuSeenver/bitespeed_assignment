// const Pool = require("pg").Pool;
const Sequelize = require("sequelize");

const PGUSERNAME = process.env.PGUSERNAME;
const PGHOST = process.env.PGHOST;
const PGDB = process.env.PGDB;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGPORT;
const PGURI = process.env.PGURI;

// const URI = `postgres://${PGUSERNAME}:${PGPASSWORD}@example.com:${PGPORT}/${PGDB}`;

const sequelize = new Sequelize(PGURI);

// const sequelize = new Sequelize(PGDB, PGUSERNAME, PGPASSWORD, {
//   host: PGHOST,
//   port: PGPORT,
//   dialect: "postgres",
// });

async function isConnetionEstablishedAndSynced() {
  try {
    await sequelize.authenticate();
    console.log("DB Connection has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// const pool = new Pool({
//   user: PGUSERNAME,
//   host: PGHOST,
//   database: PGDB,
//   password: PGPASSWORD,
//   port: PGPORT,
// });

module.exports = { sequelize, isConnetionEstablishedAndSynced };
