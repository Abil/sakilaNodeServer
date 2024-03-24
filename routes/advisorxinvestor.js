import express from "express";

import { Advisor, Investor } from "../models/advisorxinvestor.js";

const router = express.Router();

/* Advisor Routes */

// Create a new advisor
router.post("/advisor", async (req, res) => {
  try {
    const { first_name, last_name, is_chairman } = req.body;
    const advisor = await Advisor.create({
      first_name,
      last_name,
      is_chairman,
    });
    res.status(201).json(advisor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all advisors
router.get("/advisor", async (req, res) => {
  try {
    const advisors = await Advisor.findAll();
    res.json(advisors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get advisor by ID
router.get("/advisor/:id", async (req, res) => {
  const advisorId = req.params.id;
  try {
    const advisor = await Advisor.findByPk(advisorId);
    if (advisor) {
      res.json(advisor);
    } else {
      res.status(404).json({ error: "Advisor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update advisor by ID
router.put("/advisor/:id", async (req, res) => {
  const advisorId = req.params.id;
  try {
    const advisor = await Advisor.findByPk(advisorId);
    if (advisor) {
      const { first_name, last_name, is_chairman } = req.body;
      await advisor.update({ first_name, last_name, is_chairman });
      res.json(advisor);
    } else {
      res.status(404).json({ error: "Advisor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete advisor by ID
router.delete("/advisor/:id", async (req, res) => {
  const advisorId = req.params.id;
  try {
    const advisor = await Advisor.findByPk(advisorId);
    if (advisor) {
      await advisor.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Advisor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* Investor Routes */

// Get all investors
router.get("/investor", async (req, res) => {
  try {
    const investors = await Investor.findAll();
    res.json(investors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get investor by ID
router.get("/investor/:id", async (req, res) => {
  const investorId = req.params.id;
  try {
    const investor = await Investor.findByPk(investorId);
    if (investor) {
      res.json(investor);
    } else {
      res.status(404).json({ error: "Investor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new investor
router.post("/investor", async (req, res) => {
  const { first_name, last_name, company_name } = req.body;
  try {
    const newInvestor = await Investor.create({
      first_name,
      last_name,
      company_name,
    });
    res.status(201).json(newInvestor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an existing investor
router.put("/investor/:id", async (req, res) => {
  const investorId = req.params.id;
  const { first_name, last_name, company_name } = req.body;
  try {
    const investor = await Investor.findByPk(investorId);
    if (investor) {
      await investor.update({ first_name, last_name, company_name });
      res.json({ message: "Investor updated successfully" });
    } else {
      res.status(404).json({ error: "Investor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an investor
router.delete("/investor/:id", async (req, res) => {
  const investorId = req.params.id;
  try {
    const investor = await Investor.findByPk(investorId);
    if (investor) {
      await investor.destroy();
      res.json({ message: "Investor deleted successfully" });
    } else {
      res.status(404).json({ error: "Investor not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
