//const express = require("express");
import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customer.js";
import addressRoutes from "./routes/address.js";
import staffXstoreRoutes from "./routes/staffXstore.js";

import sequelize from "./utils/db.js";

const app = express();
const port = 8000;

//Sequelize Sync
sequelize
  .sync()
  .then((res) => {
    //console.info(res);
    console.log("<-- Sequelize Sync Successful with MySQL DB -->");
  })
  .catch((err) => console.log("Error in Sequelize Sync"));

//Middlewares
app.use(cors());
app.use(express.json());

//Router Middleware
app.use("/api", customerRoutes);
app.use("/api", addressRoutes);
app.use("/api", staffXstoreRoutes);

//Ping Test
app.get("/ping", (req, res) => {
  res.send("Hi, Greetings from Sakila backend!");
});

//Initiating Server
app.listen(port, () => {
  console.log(`Sakila backend listening on port: ${port}`);
});
