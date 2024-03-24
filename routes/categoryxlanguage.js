import express from "express";

import { Category, Language } from "../models/categoryxlanguage.js";

const router = express.Router();

/* Category  Routes */

// Create a new category
router.post("/category", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all categories
router.get("/category", async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get category by ID
router.get("/category/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update category by ID
router.put("/category/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const { name } = req.body;
    const category = await Category.findByPk(categoryId);
    if (category) {
      await category.update({ name });
      res.json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete category by ID
router.delete("/category/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      await category.destroy();
      res.json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* Language Routes */

// Create a new language
router.post("/language", async (req, res) => {
  try {
    const { name } = req.body;
    const language = await Language.create({ name });
    res.status(201).json(language);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all languages
router.get("/language", async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get language by ID
router.get("/language/:id", async (req, res) => {
  const languageId = req.params.id;
  try {
    const language = await Language.findByPk(languageId);
    if (language) {
      res.json(language);
    } else {
      res.status(404).json({ error: "Language not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update language by ID
router.put("/language/:id", async (req, res) => {
  const languageId = req.params.id;
  try {
    const { name } = req.body;
    const language = await Language.findByPk(languageId);
    if (language) {
      await language.update({ name });
      res.json({ message: "Language updated successfully" });
    } else {
      res.status(404).json({ error: "Language not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete language by ID
router.delete("/language/:id", async (req, res) => {
  const languageId = req.params.id;
  try {
    const language = await Language.findByPk(languageId);
    if (language) {
      await language.destroy();
      res.json({ message: "Language deleted successfully" });
    } else {
      res.status(404).json({ error: "Language not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
