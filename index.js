//const express = require("express");
import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customer.js";
import addressRoutes from "./routes/address.js";
import staffxstoreRoutes from "./routes/staffxstore.js";
import advisorxinvestorRoutes from "./routes/advisorxinvestor.js";
import categoryxlanguageRoutes from "./routes/categoryxlanguage.js";
import actorRoutes from "./routes/actor.js";
import filmRoutes from "./routes/film.js";

import sequelize from "./utils/db.js";

const app = express();
const port = 8000;

//Sequelize Sync
sequelize
  .sync()
  .then((res) => {
    //console.info(res);
    console.log("//// Sequelize Sync Successful with MySQL DB ////");
  })
  .catch((err) => console.log("Error in Sequelize Sync: ", err));

//Middlewares
app.use(cors());
app.use(express.json());

//Router Middleware
app.use("/api", customerRoutes);
app.use("/api", addressRoutes);
app.use("/api", staffxstoreRoutes);
app.use("/api", advisorxinvestorRoutes);
app.use("/api", categoryxlanguageRoutes);
app.use("/api", actorRoutes);
app.use("/api", filmRoutes);

//Ping Test
app.get("/ping", (req, res) => {
  res.send("Hi, Greetings from Sakila backend!");
});

//Initiating Server
app.listen(port, () => {
  console.log(`Sakila backend listening on port: ${port}`);
});
