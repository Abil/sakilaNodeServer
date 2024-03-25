import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";

// Get all stores with eager loading of related models
export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Staff,
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
          ],
        },
        {
          model: Address,
          include: [{ model: City, include: [{ model: Country }] }],
        },
      ],
    });
    res.json(stores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new store
export const createNewStore = async (req, res) => {
  const { manager_staff_id, address_id } = req.body;
  try {
    const newStore = await Store.create({ manager_staff_id, address_id });
    res.status(201).json(newStore);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing store
export const updateStore = async (req, res) => {
  const { storeId } = req.params;
  const { manager_staff_id, address_id } = req.body;
  try {
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    store.manager_staff_id = manager_staff_id;
    store.address_id = address_id;
    await store.save();
    res.json(store);
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an existing store
export const deleteStore = async (req, res) => {
  const { storeId } = req.params;
  try {
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    await store.destroy();
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a store by ID with eager loading of related models
export const getStoreById = async (req, res) => {
  const { storeId } = req.params;
  try {
    const store = await Store.findByPk(storeId, {
      include: [
        {
          model: Staff,
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
          ],
        },
        {
          model: Address,
          include: [{ model: City, include: [{ model: Country }] }],
        },
      ],
    });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.json(store);
  } catch (error) {
    console.error("Error fetching store by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};