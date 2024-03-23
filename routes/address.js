import express from "express";

import { Address, City, Country } from "../models/address.js";

const router = express.Router();

/* Address Routes */

// Create Address
router.post("/address", async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Addresses
router.get("/address", async (req, res) => {
  try {
    const addresses = await Address.findAll({
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
    });
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Address by ID
router.get("/address/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id, {
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
    });
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    res.json(address);
  } catch (error) {
    console.log("Bad");
    res.status(400).json({ message: error.message });
  }
});

// Update Address by ID
router.put("/address/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let address = await Address.findByPk(id);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    await address.update(req.body);
    address = await Address.findByPk(id);
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Address by ID
router.delete("/addresses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    await address.destroy();
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* City Routes */

// Create City
router.post("/address/city", async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Cities
router.get("/address/city", async (req, res) => {
  try {
    const cities = await City.findAll({
      include: [
        {
          model: Country,
        },
      ],
    });
    res.json(cities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read City by ID
router.get("/address/city/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id, {
      include: [
        {
          model: Country,
        },
      ],
    });
    if (!city) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update City by ID
router.put("/address/city/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    await city.update(req.body);
    city = await City.findByPk(id);
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete City by ID
router.delete("/address/city/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    await city.destroy();
    res.json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* Country Routes */

// Create Country
router.post("/address/country", async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all Countries
router.get("/address/country", async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Country by ID
router.get("/address/country/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Country by ID
router.put("/address/country/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let country = await Country.findByPk(id);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }
    await country.update(req.body);
    country = await Country.findByPk(id);
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Country by ID
router.delete("/address/country/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }
    await country.destroy();
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
