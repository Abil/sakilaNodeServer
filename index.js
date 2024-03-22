//const express = require("express");
import express from "express";
import flimRoutes from "./routes/flim.js";

import sequelize from "./utils/db.js";

const app = express();
const port = 3000;

sequelize
  .sync()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log("Error in Sequelize"));

//Router Middleware
app.use("/api", flimRoutes);

app.get("/ping", (req, res) => {
  res.send("Hi, Greetings from Sakila backend!");
});

app.listen(port, () => {
  console.log(`Sakila backend listening on port: ${port}`);
});
