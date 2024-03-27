import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  getAllStores,
  getStoreById,
  createNewStore,
  updateStore,
  deleteStore,
} from "../controllers/store.js";

const router = express.Router();

// GET all stores
router.get("/", getAllStores);

// GET store by ID
router.get("/:storeId", getStoreById);

// POST create a new store
router.post("/", isAdmin, createNewStore);

// PUT update an existing store
router.put("/:storeId", isAdmin, updateStore);

// DELETE delete an existing store
router.delete("/:storeId", isAdmin, deleteStore);

export default router;
