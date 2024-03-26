import Inventory from "../models/inventory.js";
import Film from "../models/film.js";
import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";

// Get all inventories
export const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.findAll({
      include: [
        { model: Film, as: "film" },
        {
          model: Store,
          as: "store",
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
          ],
        },
      ],
    });
    res.json(inventories);
  } catch (error) {
    console.error("Error fetching all inventories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new inventory item
export const createInventory = async (req, res) => {
  const { film_id, store_id } = req.body; // Body parameters match table column names
  try {
    const inventory = await Inventory.create({ film_id, store_id });
    res.status(201).json(inventory);
  } catch (error) {
    console.error("Error creating inventory item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get inventory item by inventory ID
export const getInventory = async (req, res) => {
  const { inventoryId } = req.params;
  try {
    const inventoryItem = await Inventory.findByPk(inventoryId, {
      include: [
        { model: Film, as: "film" },
        {
          model: Store,
          as: "store",
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
          ],
        },
      ],
    });
    if (!inventoryItem) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.json(inventoryItem);
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update inventory item by inventory ID
export const updateInventory = async (req, res) => {
  const { inventoryId } = req.params;
  const { film_id, store_id } = req.body; // Body parameters match table column names
  try {
    const [updatedRows] = await Inventory.update(
      { film_id, store_id },
      { where: { inventory_id: inventoryId } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete inventory item by inventory ID
export const deleteInventory = async (req, res) => {
  const { inventoryId } = req.params;
  try {
    const deletedRows = await Inventory.destroy({
      where: { inventory_id: inventoryId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Inventory item not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
