import express from "express";

import {
  getAllCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.js";

const router = express.Router();

// GET all customers
router.get("/", getAllCustomers);

// GET customer by ID
router.get("/:customerId", getCustomerById);

// POST create a new customer
router.post("/", createNewCustomer);

// PUT update an existing customer
router.put("/:customerId", updateCustomer);

// DELETE delete an existing customer
router.delete("/:customerId", deleteCustomer);

export default router;
