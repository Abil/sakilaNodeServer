import express from "express";

import Customer from "../models/customer.js";

const router = express.Router();

router.get("/customer", async (req, res) => {
  const customers = await Customer.findAll();
  res.json(customers);
});

export default router;
