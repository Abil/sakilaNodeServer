import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.findAll();
//     res.json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all categories with pagination
export const getAllCategories = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Category.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      categories: rows,
    });
  } catch (error) {
    console.error("Error fetching all categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Category.update(req.body, {
      where: { category_id: id },
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(id);
      return res.json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    }
    throw new Error("Category not found");
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Category.destroy({
      where: { category_id: id },
    });
    if (deleted) {
      return res.json({ message: "Category deleted successfully" });
    }
    throw new Error("Category not found");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
