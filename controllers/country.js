import Country from "../models/country.js";

export const createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    console.error("Error creating country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllCountries = async (req, res) => {
//   try {
//     const countries = await Country.findAll();
//     res.json(countries);
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all countries with pagination
export const getAllCountries = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Country.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      countries: rows,
    });
  } catch (error) {
    console.error("Error fetching all countries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.json(country);
  } catch (error) {
    console.error("Error fetching country by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Country.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCountry = await Country.findByPk(id);
      return res.json({
        message: "Country updated successfully",
        country: updatedCountry,
      });
    }
    throw new Error("Country not found");
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Country.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.json({ message: "Country deleted successfully" });
    }
    throw new Error("Country not found");
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
