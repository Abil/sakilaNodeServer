import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  searchAddress,
} from "../controllers/address.js";

const router = express.Router();

// Routes for CRUD operations on addresses
router.post("/", isAdmin, createAddress); // Create a new address
router.get("/", getAllAddresses); // Get all addresses
router.get("/search", searchAddress); // Search address
router.get("/:id", getAddressById); // Get address by ID
router.put("/:id", isAdmin, updateAddress); // Update address by ID
router.delete("/:id", isAdmin, deleteAddress); // Delete address by ID

export default router;
