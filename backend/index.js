require("dotenv").config();
// const pg = require("pg");
// const pool = require("./util/database.js");
const {
  sequelize,
  isConnetionEstablishedAndSynced,
} = require("./util/database.js");
const app = require("./app.js");

const PORT = process.env.PORT;

// it checks connection to Db and respective model are synced with tables in DB
isConnetionEstablishedAndSynced();

app.listen(PORT, () => {
  console.log("Server listening at PORT:", PORT);
});
