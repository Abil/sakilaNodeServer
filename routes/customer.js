import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  getAllCustomers,
  getCustomerById,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomer,
} from "../controllers/customer.js";

const router = express.Router();

// GET all customers
router.get("/", getAllCustomers);

// Search customer
router.get("/search", searchCustomer);

// GET customer by ID
router.get("/:customerId", getCustomerById);

// POST create a new customer
router.post("/", isAdmin, createNewCustomer);

// PUT update an existing customer
router.put("/:customerId", isAdmin, updateCustomer);

// DELETE delete an existing customer
router.delete("/:customerId", isAdmin, deleteCustomer);

export default router;
