import express from "express";

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
router.post("/", createNewStore);

// PUT update an existing store
router.put("/:storeId", updateStore);

// DELETE delete an existing store
router.delete("/:storeId", deleteStore);

export default router;
