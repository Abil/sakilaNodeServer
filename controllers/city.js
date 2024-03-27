import Country from "../models/country.js";
import City from "../models/city.js";

export const createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllCities = async (req, res) => {
//   try {
//     const cities = await City.findAll({ include: Country });
//     res.json(cities);
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Get all cities with pagination
export const getAllCities = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await City.findAndCountAll({
      offset,
      limit: Number(pageSize),
      include: [{ model: Country, as: "country" }],
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      cities: rows,
    });
  } catch (error) {
    console.error("Error fetching all cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id, { include: Country });
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }
    res.json(city);
  } catch (error) {
    console.error("Error fetching city by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCity = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await City.update(req.body, {
      where: { city_id: id },
    });
    if (updated) {
      const updatedCity = await City.findByPk(id);
      return res.json({
        message: "City updated successfully",
        city: updatedCity,
      });
    }
    throw new Error("City not found");
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await City.destroy({
      where: { city_id: id },
    });
    if (deleted) {
      return res.json({ message: "City deleted successfully" });
    }
    throw new Error("City not found");
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
