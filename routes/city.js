import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} from "../controllers/city.js";

const router = express.Router();

// Routes for CRUD operations on cities
router.post("/", isAdmin, createCity); // Create a new city
router.get("/", getAllCities); // Get all cities with eager loading of countries
router.get("/:id", getCityById); // Get city by ID with eager loading of country
router.put("/:id", isAdmin, updateCity); // Update city by ID
router.delete("/:id", isAdmin, deleteCity); // Delete city by ID

export default router;
