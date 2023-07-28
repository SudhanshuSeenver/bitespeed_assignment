const express = require("express");
const identifyRoutes = require("./routes/identify.route");
const app = express();

app.use(express.json());

app.use("/", identifyRoutes);

module.exports = app;
