import express from "express";

import { Address, City, Country } from "../models/address.js";
import { Staff, Store } from "../models/staffxstore.js";

const router = express.Router();

/* Staff Routes */

// Create Staff
router.post("/staff", async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Staff
router.get("/staff", async (req, res) => {
  try {
    const staff = await Staff.findAll(
      {
        attributes: { exclude: ["password"] },
      },
      {
        include: [
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
      }
    );
    res.json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Staff by ID
router.get("/staff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findByPk(
      id,
      {
        attributes: { exclude: ["password"] },
      },
      {
        include: [
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
      }
    );
    if (!staff) {
      res.status(404).json({ message: "Staff not found" });
      return;
    }
    res.json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Staff by ID
router.put("/staff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let staff = await Staff.findByPk(id);
    if (!staff) {
      res.status(404).json({ message: "Staff not found" });
      return;
    }
    await staff.update(req.body);
    staff = await Staff.findByPk(id);
    res.json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Staff by ID
router.delete("/staff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findByPk(id);
    if (!staff) {
      res.status(404).json({ message: "Staff not found" });
      return;
    }
    await staff.destroy();
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* Store Routes */

// Create Store
router.post("/store", async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Stores
router.get("/store", async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Staff,
          attributes: { exclude: ["password"] },
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
    });
    res.json(stores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Store by ID
router.get("/store/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id, {
      include: [
        {
          model: Staff,
          attributes: { exclude: ["password"] },
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
    });
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      return;
    }
    res.json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Store by ID
router.put("/store/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let store = await Store.findByPk(id);
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      return;
    }
    await store.update(req.body);
    store = await Store.findByPk(id, {
      include: [
        {
          model: Staff,
          include: [
            {
              model: Address,
            },
          ],
        },
        {
          model: Address,
        },
      ],
    });
    res.json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Store by ID
router.delete("/store/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id);
    if (!store) {
      res.status(404).json({ message: "Store not found" });
      return;
    }
    await store.destroy();
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
