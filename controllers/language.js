import Language from "../models/language.js";

export const createLanguage = async (req, res) => {
  try {
    const language = await Language.create(req.body);
    res.status(201).json(language);
  } catch (error) {
    console.error("Error creating language:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllLanguages = async (req, res) => {
//   try {
//     const languages = await Language.findAll();
//     res.json(languages);
//   } catch (error) {
//     console.error("Error fetching languages:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all languages with pagination
export const getAllLanguages = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Language.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      languages: rows,
    });
  } catch (error) {
    console.error("Error fetching all languages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLanguageById = async (req, res) => {
  const { id } = req.params;
  try {
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: "Language not found" });
    }
    res.json(language);
  } catch (error) {
    console.error("Error fetching language by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateLanguage = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Language.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedLanguage = await Language.findByPk(id);
      return res.json({
        message: "Language updated successfully",
        language: updatedLanguage,
      });
    }
    throw new Error("Language not found");
  } catch (error) {
    console.error("Error updating language:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteLanguage = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Language.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.json({ message: "Language deleted successfully" });
    }
    throw new Error("Language not found");
  } catch (error) {
    console.error("Error deleting language:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
