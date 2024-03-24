import express from "express";

import Customer from "../models/customer.js";
import { Address, City, Country } from "../models/address.js";
import { Store } from "../models/staffxstore.js";

const router = express.Router();

// Create Customer
router.post("/customer", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Customers
router.get("/customer", async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Address,
          include: [
            {
              model: City,
              include: [
                {
                  model: Country,
                },
              ],
            },
          ],
        },
        {
          model: Store,
          include: [
            {
              model: Address,
              include: [
                {
                  model: City,
                  include: [
                    {
                      model: Country,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Customer by ID
router.get("/customer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id, {
      include: [{ model: Address }, { model: Store }],
    });
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Customer by ID
router.put("/customer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    await customer.update(req.body);
    customer = await Customer.findByPk(id);
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Customer by ID
router.delete("/customer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    await customer.destroy();
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
