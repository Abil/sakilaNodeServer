import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  getAllAdvisors,
  getAdvisorById,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
} from "../controllers/advisor.js";

const router = express.Router();

// Routes for CRUD operations on advisors
router.post("/", isAdmin, createAdvisor); // Create a new advisor
router.get("/", getAllAdvisors); // Get all advisor
router.get("/:id", getAdvisorById); // Get advisor by ID
router.put("/:id", isAdmin, updateAdvisor); // Update advisor by ID
router.delete("/:id", isAdmin, deleteAdvisor); // Delete advisor by ID

export default router;
