import express from "express";
import cors from "cors";

import actorRoutes from "./routes/actor.js";
import addressRoutes from "./routes/address.js";
import advisorRoutes from "./routes/advisor.js";
import categoryRoutes from "./routes/category.js";
import countryRoutes from "./routes/country.js";
import cityRoutes from "./routes/city.js";
import investorRoutes from "./routes/investor.js";
import languageRoutes from "./routes/language.js";
import staffRoutes from "./routes/staff.js";
import storeRoutes from "./routes/store.js";
import customerRoutes from "./routes/customer.js";
import filmRoutes from "./routes/film.js";
import filmCategoryRoutes from "./routes/filmCategory.js";
import filmActorRoutes from "./routes/filmActor.js";
import actorAwardRoutes from "./routes/actorAward.js";
import inventoryRoutes from "./routes/inventory.js";
import rentalRoutes from "./routes/rental.js";
import paymentRoutes from "./routes/payment.js";

import sequelize from "./utils/db.js";
import { associateModels } from "./models/associations.js";

const app = express();
const port = 8000;

const initializeApp = async () => {
  console.log("Sakila backend starting up...");
  try {
    // Sequelize Sync
    console.log("//// Initiating Sequelize Sync with MySQL DB ////");
    await sequelize.sync({ alter: false });
    console.log("//// Sequelize Sync Successful with MySQL DB ////");

    // Initialize associations
    await associateModels();
    console.log("//// Model Associations Initialized ////");
  } catch (err) {
    console.error("Error in Sequelize Sync: ", err);
  }

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Router Middleware
  app.use("/api/actor", actorRoutes);
  app.use("/api/address", addressRoutes);
  app.use("/api/advisor", advisorRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/country", countryRoutes);
  app.use("/api/city", cityRoutes);
  app.use("/api/investor", investorRoutes);
  app.use("/api/language", languageRoutes);
  app.use("/api/staff", staffRoutes);
  app.use("/api/store", storeRoutes);
  app.use("/api/customer", customerRoutes);
  app.use("/api/film", filmRoutes);
  app.use("/api/film-category", filmCategoryRoutes);
  app.use("/api/film-actor", filmActorRoutes);
  app.use("/api/actor-award", actorAwardRoutes);
  app.use("/api/inventory", inventoryRoutes);
  app.use("/api/rental", rentalRoutes);
  app.use("/api/payment", paymentRoutes);

  // Ping Test
  app.get("/ping", (req, res) => {
    res.send("Hi, Greetings from Sakila backend!");
  });

  // Initiating Server
  app.listen(port, () => {
    console.log(`Sakila backend listening on port: ${port}`);
  });
};

initializeApp();
