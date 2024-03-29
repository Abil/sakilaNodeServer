import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  searchCountries,
} from "../controllers/country.js";

const router = express.Router();

// Routes for CRUD operations on countries
router.post("/", isAdmin, createCountry); // Create a new country
router.get("/", getAllCountries); // Get all countries
router.get("/search", searchCountries); //Search countries
router.get("/:id", getCountryById); // Get country by ID
router.put("/:id", isAdmin, updateCountry); // Update country by ID
router.delete("/:id", isAdmin, deleteCountry); // Delete country by ID

export default router;
