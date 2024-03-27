import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

// Routes for CRUD operations on categories
router.post("/", isAdmin, createCategory); // Create a new category
router.get("/", getAllCategories); // Get all categories
router.get("/:id", getCategoryById); // Get category by ID
router.put("/:id", isAdmin, updateCategory); // Update category by ID
router.delete("/:id", isAdmin, deleteCategory); // Delete category by ID

export default router;
