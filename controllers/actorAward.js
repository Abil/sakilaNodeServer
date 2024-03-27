import ActorAward from "../models/actorAward.js";

// Create a new actor award
export const createActorAward = async (req, res) => {
  const { actor_id, first_name, last_name, awards } = req.body;
  try {
    const actorAward = await ActorAward.create({
      actor_id,
      first_name,
      last_name,
      awards,
    });
    res.status(201).json(actorAward);
  } catch (error) {
    console.error("Error creating actor award:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get actor awards by actor ID
// export const getActorAward = async (req, res) => {
//   const { actorId: actor_id } = req.params;
//   try {
//     const actorAwards = await ActorAward.findAll({ where: { actor_id } });
//     res.json(actorAwards);
//   } catch (error) {
//     console.error("Error fetching actor awards:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all actor awards for a specific actor with pagination
export const getActorAward = async (req, res) => {
  const { actorId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await ActorAward.findAndCountAll({
      where: { actor_id: actorId },
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      actorAwards: rows,
    });
  } catch (error) {
    console.error("Error fetching actor awards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update actor awards by actor ID
export const updateActorAward = async (req, res) => {
  const { actorId: actor_id } = req.params;
  const { first_name, last_name, awards } = req.body;
  try {
    await ActorAward.update(
      { first_name, last_name, awards },
      { where: { actor_id } }
    );
    return res.json({ message: "Actor award updated successfully" });
  } catch (error) {
    console.error("Error updating actor awards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete actor awards by actor ID
export const deleteActorAward = async (req, res) => {
  const { actorId: actor_id } = req.params;
  try {
    await ActorAward.destroy({ where: { actor_id } });
    return res.json({ message: "Actor award deleted successfully" });
  } catch (error) {
    console.error("Error deleting actor awards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
