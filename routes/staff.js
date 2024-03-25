import express from "express";

import {
  getAllStaff,
  getStaffById,
  createNewStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staff.js";

const router = express.Router();

// GET all staff
router.get("/", getAllStaff);

// GET staff by ID
router.get("/:staffId", getStaffById);

// POST create a new staff
router.post("/", createNewStaff);

// PUT update an existing staff
router.put("/:staffId", updateStaff);

// DELETE delete an existing staff
router.delete("/:staffId", deleteStaff);

export default router;
