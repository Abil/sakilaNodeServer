import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createFilmActor,
  getAllActorsForFilm,
  deleteFilmActor,
} from "../controllers/filmActor.js";

const router = express.Router();

// POST create a new film-actor association
router.post("/", isAdmin, createFilmActor);

// GET all actors for a film by film ID
router.get("/:filmId", getAllActorsForFilm);

// DELETE delete a film-actor association by film ID and actor ID
router.delete("/:filmId/:actorId", isAdmin, deleteFilmActor);

export default router;
