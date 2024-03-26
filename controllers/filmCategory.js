import FilmCategory from "../models/filmCategory.js";
import Film from "../models/film.js";
import Category from "../models/category.js";

// Get all categories for a film by film ID
// export const getAllCategoriesForFilm = async (req, res) => {
//   const { filmId } = req.params;
//   try {
//     const categories = await FilmCategory.findAll({
//       where: { film_id: filmId },
//       include: [
//         { model: Film, as: "film", attributes: ["title", "description"] },
//         {
//           model: Category,
//           as: "category",
//           attributes: ["name"],
//         },
//       ],
//     });
//     res.json(categories);
//   } catch (error) {
//     console.error("Error fetching categories for film:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all categories for a film with pagination
export const getAllCategoriesForFilm = async (req, res) => {
  const filmId = req.params.filmId;
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await FilmCategory.findAndCountAll({
      where: { film_id: filmId },
      offset,
      limit: Number(pageSize),
      include: [
        { model: Film, as: "film", attributes: ["title", "description"] },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      categories: rows.map((row) => row.category),
    });
  } catch (error) {
    console.error("Error fetching categories for film:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new film-category association
export const createFilmCategory = async (req, res) => {
  const { film_id, category_id } = req.body;
  try {
    // Check if the film-category association already exists
    const existingAssociation = await FilmCategory.findOne({
      where: { film_id, category_id },
    });
    if (existingAssociation) {
      return res
        .status(400)
        .json({ error: "Film-category association already exists" });
    }

    // Create a new film-category association
    const filmCategory = await FilmCategory.create({ film_id, category_id });
    res.status(201).json(filmCategory);
  } catch (error) {
    console.error("Error creating film-category association:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a film-category association by film ID and category ID
export const deleteFilmCategory = async (req, res) => {
  const { filmId, categoryId } = req.params;
  try {
    const deletedCount = await FilmCategory.destroy({
      where: { film_id: filmId, category_id: categoryId },
    });
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Film-category association not found" });
    }
    res.json({ message: "Film-category association deleted successfully" });
  } catch (error) {
    console.error("Error deleting film-category association:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
