import { Op } from "sequelize";

import Inventory from "../models/inventory.js";
import Film from "../models/film.js";
import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Rental from "../models/rental.js";

// Get all inventories
// export const getAllInventories = async (req, res) => {
//   try {
//     const inventories = await Inventory.findAll({
//       include: [
//         { model: Film, as: "film" },
//         {
//           model: Store,
//           as: "store",
//           include: [
//             {
//               model: Address,
//               include: [{ model: City, include: [{ model: Country }] }],
//             },
//           ],
//         },
//       ],
//     });
//     res.json(inventories);
//   } catch (error) {
//     console.error("Error fetching all inventories:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all inventories with pagination
export const getAllInventories = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Inventory.findAndCountAll({
      offset,
      limit: Number(pageSize),
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

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      inventories: rows,
    });
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

// Get inventory item by inventory ID
export const getInventoryInStock = async (req, res) => {
  try {
    const { query = "A" } = req.query;

    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10

    const offset = (page - 1) * limit;

    const currentDate = new Date();

    // Query the database to find inventory that is not currently rented out
    const inventories = await Inventory.findAndCountAll({
      include: [
        {
          model: Rental,
          where: {
            // return_date: {
            //   [Op.eq]: null,
            // },
            return_date: {
              [Op.lt]: currentDate,
              //[Op.gt]: currentDate,
            },
          },
          //required: false, // Use left join to include rentals without matching inventory_id
        },

        {
          model: Film,
          where: {
            title: {
              [Op.like]: `%${query}%`, // Assuming filmName is the search query
            },
          },
        },
      ],
      limit: limit,
      offset: offset,
    });

    // Send the response with the found inventory
    //res.json(inventory);
    res.json({
      totalItems: inventories.count,
      totalPages: Math.ceil(inventories.count / limit),
      currentPage: page,
      inventories: inventories.rows,
    });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(200).json({
      message: "Inventory item updated successfully",
    });
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
    res.status(200).json({
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
