import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
  getAllPayments,
} from "../controllers/payment.js";

const router = express.Router();

router.post("/", isAdmin, createPayment);
router.get("/", getAllPayments);
router.get("/:paymentId", getPayment);
router.put("/:paymentId", isAdmin, updatePayment);
router.delete("/:paymentId", isAdmin, deletePayment);

export default router;
