import express from "express";

import {
  createLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} from "../controllers/language.js";

const router = express.Router();

// Routes for CRUD operations on languages
router.post("/", createLanguage); // Create a new language
router.get("/", getAllLanguages); // Get all languages
router.get("/:id", getLanguageById); // Get language by ID
router.put("/:id", updateLanguage); // Update language by ID
router.delete("/:id", deleteLanguage); // Delete language by ID

export default router;
