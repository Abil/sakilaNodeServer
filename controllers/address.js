import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";

export const createAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [
        {
          model: City,
          include: Country,
        },
      ],
    });
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id, {
      include: [
        {
          model: City,
          include: Country,
        },
      ],
    });
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    console.error("Error fetching address by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Address.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedAddress = await Address.findByPk(id);
      return res.json({
        message: "Address updated successfully",
        address: updatedAddress,
      });
    }
    throw new Error("Address not found");
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Address.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.json({ message: "Address deleted successfully" });
    }
    throw new Error("Address not found");
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
