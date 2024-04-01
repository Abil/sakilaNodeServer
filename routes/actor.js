import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createActor,
  getAllActors,
  getActorById,
  updateActor,
  deleteActor,
  searchActorsWithoutAwards,
  getAllActorsWithAwards,
} from "../controllers/actor.js";

const router = express.Router();

// Routes for CRUD operations on actors
router.post("/", isAdmin, createActor); // Create a new actor
router.get("/", getAllActors); // Get all actors
router.get("/withAwards", getAllActorsWithAwards); // Get all actors with awards
router.get("/search", searchActorsWithoutAwards); // Search actors without awards
router.get("/:id", getActorById); // Get actor by ID
router.put("/:id", isAdmin, updateActor); // Update actor by ID
router.delete("/:id", isAdmin, deleteActor); // Delete actor by ID

export default router;
