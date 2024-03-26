import express from "express";
import {
  getAllCategoriesForFilm,
  createFilmCategory,
  deleteFilmCategory,
} from "../controllers/filmCategory.js";

const router = express.Router();

// GET all categories for a film by film ID
router.get("/:filmId", getAllCategoriesForFilm);

// POST create a new film-category association
router.post("/", createFilmCategory);

// DELETE delete a film-category association by film ID and category ID
router.delete("/:filmId/:categoryId", deleteFilmCategory);

export default router;
