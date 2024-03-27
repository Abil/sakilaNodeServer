import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  getAllInventories,
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventory.js";

const router = express.Router();

router.post("/", isAdmin, createInventory);
router.get("/", getAllInventories);
router.get("/:inventoryId", getInventory);
router.put("/:inventoryId", isAdmin, updateInventory);
router.delete("/:inventoryId", isAdmin, deleteInventory);

export default router;
