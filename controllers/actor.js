import Actor from "../models/actor.js";

// Controller for creating a new actor
const createActor = async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    res.status(201).json(actor);
  } catch (error) {
    console.error("Error creating actor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for retrieving all actors
const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for retrieving a single actor by ID
const getActorById = async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByPk(id);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json(actor);
  } catch (error) {
    console.error("Error fetching actor by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for updating an actor
const updateActor = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Actor.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedActor = await Actor.findByPk(id);
      return res.json({
        message: "Actor updated successfully",
        actor: updatedActor,
      });
    }
    throw new Error("Actor not found");
  } catch (error) {
    console.error("Error updating actor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for deleting an actor
const deleteActor = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Actor.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.json({ message: "Actor deleted successfully" });
    }
    throw new Error("Actor not found");
  } catch (error) {
    console.error("Error deleting actor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createActor, getAllActors, deleteActor, updateActor, getActorById };
