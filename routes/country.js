import express from "express";

import {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
} from "../controllers/country.js";

const router = express.Router();

// Routes for CRUD operations on countries
router.post("/", createCountry); // Create a new country
router.get("/", getAllCountries); // Get all countries
router.get("/:id", getCountryById); // Get country by ID
router.put("/:id", updateCountry); // Update country by ID
router.delete("/:id", deleteCountry); // Delete country by ID

export default router;
