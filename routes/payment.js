import express from "express";

import {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
  getAllPayments,
} from "../controllers/payment.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:paymentId", getPayment);
router.put("/:paymentId", updatePayment);
router.delete("/:paymentId", deletePayment);

export default router;
