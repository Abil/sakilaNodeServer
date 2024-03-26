import express from "express";

import {
  createRental,
  getRental,
  updateRental,
  deleteRental,
  getAllRentals,
} from "../controllers/rental.js";

const router = express.Router();

router.post("/", createRental);
router.get("/", getAllRentals);
router.get("/:rentalId", getRental);
router.put("/:rentalId", updateRental);
router.delete("/:rentalId", deleteRental);

export default router;
