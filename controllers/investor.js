import Investor from "../models/investor.js";

export const createInvestor = async (req, res) => {
  try {
    const investor = await Investor.create(req.body);
    res.status(201).json(investor);
  } catch (error) {
    console.error("Error creating investor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllInvestors = async (req, res) => {
//   try {
//     const investors = await Investor.findAll();
//     res.json(investors);
//   } catch (error) {
//     console.error("Error fetching investors:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all investors with pagination
export const getAllInvestors = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Investor.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      investors: rows,
    });
  } catch (error) {
    console.error("Error fetching all investors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInvestorById = async (req, res) => {
  const { id } = req.params;
  try {
    const investor = await Investor.findByPk(id);
    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }
    res.json(investor);
  } catch (error) {
    console.error("Error fetching investor by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateInvestor = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Investor.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedInvestor = await Investor.findByPk(id);
      return res.json({
        message: "Investor updated successfully",
        investor: updatedInvestor,
      });
    }
    throw new Error("Investor not found");
  } catch (error) {
    console.error("Error updating investor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteInvestor = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Investor.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.json({ message: "Investor deleted successfully" });
    }
    throw new Error("Investor not found");
  } catch (error) {
    console.error("Error deleting investor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
