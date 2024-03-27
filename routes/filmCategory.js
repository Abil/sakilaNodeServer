import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  getAllCategoriesForFilm,
  createFilmCategory,
  deleteFilmCategory,
} from "../controllers/filmCategory.js";

const router = express.Router();

// GET all categories for a film by film ID
router.get("/:filmId", getAllCategoriesForFilm);

// POST create a new film-category association
router.post("/", isAdmin, createFilmCategory);

// DELETE delete a film-category association by film ID and category ID
router.delete("/:filmId/:categoryId", isAdmin, deleteFilmCategory);

export default router;
