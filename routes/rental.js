import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createRental,
  getRental,
  updateRental,
  deleteRental,
  getAllRentals,
} from "../controllers/rental.js";

const router = express.Router();

router.post("/", isAdmin, createRental);
router.get("/", getAllRentals);
router.get("/:rentalId", getRental);
router.put("/:rentalId", isAdmin, updateRental);
router.delete("/:rentalId", isAdmin, deleteRental);

export default router;
