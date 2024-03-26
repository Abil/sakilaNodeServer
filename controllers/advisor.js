import Advisor from "../models/advisor.js"; // Import your Sequelize Advisor model

// Get all advisors
// const getAllAdvisors = async (req, res) => {
//   try {
//     const advisors = await Advisor.findAll();
//     res.json(advisors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get all advisors with pagination
export const getAllAdvisors = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Advisor.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      advisors: rows,
    });
  } catch (error) {
    console.error("Error fetching all advisors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get advisor by ID
const getAdvisorById = async (req, res) => {
  try {
    const { id } = req.params;
    const advisor = await Advisor.findByPk(id);
    if (!advisor) {
      res.status(404).json({ error: "Advisor not found" });
      return;
    }
    res.json(advisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new advisor
const createAdvisor = async (req, res) => {
  try {
    const { firstName, lastName, isChairmain } = req.body;
    const advisor = await Advisor.create({ firstName, lastName, isChairmain });
    res.status(201).json(advisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing advisor
const updateAdvisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, isChairmain } = req.body;
    const advisor = await Advisor.findByPk(id);
    if (!advisor) {
      res.status(404).json({ error: "Advisor not found" });
      return;
    }
    advisor.firstName = firstName;
    advisor.lastName = lastName;
    advisor.isChairmain = isChairmain;
    await advisor.save();
    res.json(advisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an advisor
const deleteAdvisor = async (req, res) => {
  try {
    const { id } = req.params;
    const advisor = await Advisor.findByPk(id);
    if (!advisor) {
      res.status(404).json({ error: "Advisor not found" });
      return;
    }
    await advisor.destroy();
    res.json({ message: "Advisor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllAdvisors,
  getAdvisorById,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
};
