import express from "express";

import {
  getAllInventories,
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventory.js";

const router = express.Router();

router.post("/", createInventory);
router.get("/", getAllInventories);
router.get("/:inventoryId", getInventory);
router.put("/:inventoryId", updateInventory);
router.delete("/:inventoryId", deleteInventory);

export default router;
