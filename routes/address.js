import express from "express";

import {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/address.js";

const router = express.Router();

// Routes for CRUD operations on addresses
router.post("/", createAddress); // Create a new address
router.get("/", getAllAddresses); // Get all addresses
router.get("/:id", getAddressById); // Get address by ID
router.put("/:id", updateAddress); // Update address by ID
router.delete("/:id", deleteAddress); // Delete address by ID

export default router;
