import Actor from "../models/actor.js";
import Film from "../models/film.js";
import Category from "../models/Category.js";
import FilmActor from "../models/filmActor.js";

// Create a new film-actor association
export const createFilmActor = async (req, res) => {
  const { film_id, actor_id } = req.body;
  try {
    // Check if the film-actor association already exists
    const existingAssociation = await FilmActor.findOne({
      where: { film_id, actor_id },
    });
    if (existingAssociation) {
      return res
        .status(400)
        .json({ error: "Film-actor association already exists" });
    }
    // Create a new film-actor association
    const filmActor = await FilmActor.create({ film_id, actor_id });
    res.status(201).json(filmActor);
  } catch (error) {
    console.error("Error creating film-actor association:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all actors for a film by film ID
// export const getAllActorsForFilm = async (req, res) => {
//   const { filmId } = req.params;
//   try {
//     const actors = await FilmActor.findAll({
//       where: { film_id: filmId },
//       include: [
//         {
//           model: Film,
//           as: "film",
//           attributes: ["film_id", "title"],
//           include: [
//             {
//               model: Category,
//               as: "category",
//               attributes: { include: ["name"], exclude: ["film_category"] },
//               through: { attributes: [] },
//             },
//           ],
//         },
//         {
//           model: Actor,
//           as: "actor",
//           attributes: ["first_name", "last_name"],
//         },
//       ],
//     });
//     res.json(actors);
//   } catch (error) {
//     console.error("Error fetching actors for film:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all actors for a film with pagination
export const getAllActorsForFilm = async (req, res) => {
  const filmId = req.params.filmId;
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await FilmActor.findAndCountAll({
      where: { film_id: filmId },
      offset,
      limit: Number(pageSize),
      include: [
        {
          model: Film,
          as: "film",
          attributes: ["film_id", "title"],
          include: [
            {
              model: Category,
              as: "category",
              attributes: { include: ["name"], exclude: ["film_category"] },
              through: { attributes: [] },
            },
          ],
        },
        {
          model: Actor,
          as: "actor",
          attributes: ["actor_id", "first_name", "last_name"],
        },
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      actors: rows.map((row) => row.actor),
    });
  } catch (error) {
    console.error("Error fetching actors for film:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a film-actor association by film ID and actor ID
export const deleteFilmActor = async (req, res) => {
  const { filmId, actorId } = req.params;
  try {
    const deletedCount = await FilmActor.destroy({
      where: { film_id: filmId, actor_id: actorId },
    });
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Film-actor association not found" });
    }
    res.json({ message: "Film-actor association deleted successfully" });
  } catch (error) {
    console.error("Error deleting film-actor association:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
