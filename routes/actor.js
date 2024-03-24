import express from "express";

import { Actor } from "../models/actor.js";

const router = express.Router();

// Create a new actor
router.post("/actor", async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const actor = await Actor.create({ first_name, last_name });
    res.status(201).json(actor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all actors
router.get("/actor", async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get actor by ID
router.get("/actor/:id", async (req, res) => {
  const actorId = req.params.id;
  try {
    const actor = await Actor.findByPk(actorId);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update actor by ID
router.put("/actor/:id", async (req, res) => {
  const actorId = req.params.id;
  try {
    const { first_name, last_name } = req.body;
    const actor = await Actor.findByPk(actorId);
    if (actor) {
      await actor.update({ first_name, last_name });
      res.json({ message: "Actor updated successfully" });
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete actor by ID
router.delete("/actor/:id", async (req, res) => {
  const actorId = req.params.id;
  try {
    const actor = await Actor.findByPk(actorId);
    if (actor) {
      await actor.destroy();
      res.json({ message: "Actor deleted successfully" });
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
