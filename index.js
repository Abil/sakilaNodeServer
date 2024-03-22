//const express = require("express");
import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customer.js";

import sequelize from "./utils/db.js";

const app = express();
const port = 8000;

sequelize
  .sync()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log("Error in Sequelize"));

// middlewares
app.use(cors());

//Router Middleware
app.use("/api", customerRoutes);

app.get("/ping", (req, res) => {
  res.send("Hi, Greetings from Sakila backend!");
});

app.listen(port, () => {
  console.log(`Sakila backend listening on port: ${port}`);
});
