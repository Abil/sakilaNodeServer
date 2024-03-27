import Actor from "../models/actor.js";
import ActorAward from "../models/actorAward.js";

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
// const getAllActors = async (req, res) => {
//   try {
//     const actors = await Actor.findAll();
//     res.json(actors);
//   } catch (error) {
//     console.error("Error fetching actors:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all actors with pagination
const getAllActors = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Actor.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      actors: rows,
    });
  } catch (error) {
    console.error("Error fetching all actors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for retrieving a single actor by ID
const getActorById = async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByPk(id, {
      include: [{ model: ActorAward, attributes: ["awards"] }],
    });
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
