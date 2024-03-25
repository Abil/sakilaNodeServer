import express from "express";

import {
  createActor,
  getAllActors,
  getActorById,
  updateActor,
  deleteActor,
} from "../controllers/actor.js";

const router = express.Router();

// Routes for CRUD operations on actors
router.post("/", createActor); // Create a new actor
router.get("/", getAllActors); // Get all actors
router.get("/:id", getActorById); // Get actor by ID
router.put("/:id", updateActor); // Update actor by ID
router.delete("/:id", deleteActor); // Delete actor by ID

export default router;
