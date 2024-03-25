import express from "express";

import {
  createInvestor,
  getAllInvestors,
  getInvestorById,
  updateInvestor,
  deleteInvestor,
} from "../controllers/investor.js";

const router = express.Router();

// Routes for CRUD operations on investors
router.post("/", createInvestor); // Create a new investor
router.get("/", getAllInvestors); // Get all investors
router.get("/:id", getInvestorById); // Get investor by ID
router.put("/:id", updateInvestor); // Update investor by ID
router.delete("/:id", deleteInvestor); // Delete investor by ID

export default router;
