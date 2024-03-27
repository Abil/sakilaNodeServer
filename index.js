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
import authRoutes from "./routes/auth.js";

import sequelize from "./utils/db.js";
import { associateModels } from "./models/associations.js";
import { requireSignin } from "./middlewares/auth.js";

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
  app.use("/api/actor", requireSignin, actorRoutes);
  app.use("/api/address", requireSignin, addressRoutes);
  app.use("/api/advisor", requireSignin, advisorRoutes);
  app.use("/api/category", requireSignin, categoryRoutes);
  app.use("/api/country", requireSignin, countryRoutes);
  app.use("/api/city", requireSignin, cityRoutes);
  app.use("/api/investor", requireSignin, investorRoutes);
  app.use("/api/language", requireSignin, languageRoutes);
  app.use("/api/staff", requireSignin, staffRoutes);
  app.use("/api/store", requireSignin, storeRoutes);
  app.use("/api/customer", requireSignin, customerRoutes);
  app.use("/api/film", requireSignin, filmRoutes);
  app.use("/api/film-category", requireSignin, filmCategoryRoutes);
  app.use("/api/film-actor", requireSignin, filmActorRoutes);
  app.use("/api/actor-award", requireSignin, actorAwardRoutes);
  app.use("/api/inventory", requireSignin, inventoryRoutes);
  app.use("/api/rental", requireSignin, rentalRoutes);
  app.use("/api/payment", requireSignin, paymentRoutes);
  app.use("/api/auth", authRoutes);

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
