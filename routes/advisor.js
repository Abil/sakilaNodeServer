import express from "express";

import {
  getAllAdvisors,
  getAdvisorById,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
} from "../controllers/advisor.js";

const router = express.Router();

// Routes for CRUD operations on advisors
router.post("/", createAdvisor); // Create a new advisor
router.get("/", getAllAdvisors); // Get all advisor
router.get("/:id", getAdvisorById); // Get advisor by ID
router.put("/:id", updateAdvisor); // Update advisor by ID
router.delete("/:id", deleteAdvisor); // Delete advisor by ID

export default router;
