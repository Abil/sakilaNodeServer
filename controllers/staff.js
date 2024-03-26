import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";

// Get all staff with eager loading of related models
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      include: [
        {
          model: Store,
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
          ],
        },
        {
          model: Address,
          include: [
            {
              model: City,
              include: [{ model: Country }],
            },
          ],
        },
      ],
    });
    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a staff by ID with eager loading of related models
export const getStaffById = async (req, res) => {
  const { staffId } = req.params;
  try {
    const staff = await Staff.findByPk(staffId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Store,
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
          ],
        },
        {
          model: Address,
          include: [
            {
              model: City,
              include: [{ model: Country }],
            },
          ],
        },
      ],
    });
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new staff
export const createNewStaff = async (req, res) => {
  const { first_name, last_name, address_id } = req.body;
  try {
    const newStaff = await Staff.create({ first_name, last_name, address_id });
    res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing staff
export const updateStaff = async (req, res) => {
  const { staffId } = req.params;
  const { first_name, last_name, address_id } = req.body;
  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    staff.first_name = first_name;
    staff.last_name = last_name;
    staff.address_id = address_id;
    await staff.save();
    res.json(staff);
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an existing staff
export const deleteStaff = async (req, res) => {
  const { staffId } = req.params;
  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    await staff.destroy();
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
