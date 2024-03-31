import { Op } from "sequelize";

import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";

// Get all stores with eager loading of related models
// export const getAllStores = async (req, res) => {
//   try {
//     const stores = await Store.findAll({
//       include: [
//         {
//           model: Staff,
//           include: [
//             {
//               model: Address,
//               include: [{ model: City, include: [{ model: Country }] }],
//             },
//           ],
//         },
//         {
//           model: Address,
//           include: [{ model: City, include: [{ model: Country }] }],
//         },
//       ],
//     });
//     res.json(stores);
//   } catch (error) {
//     console.error("Error fetching stores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all stores with pagination
export const getAllStores = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Store.findAndCountAll({
      offset,
      limit: Number(pageSize),
      include: [
        {
          model: Staff,
          attributes: { exclude: ["password", "picture"] },
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

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      stores: rows,
    });
  } catch (error) {
    console.error("Error fetching all stores:", error);
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
          attributes: { exclude: ["password", "picture"] },
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

// Search store
export const searchStore = async (req, res) => {
  const { query } = req.query;

  try {
    // Find the address that matches the search query
    const addresses = await Address.findAll({
      where: {
        // [Op.or]: [
        //   { street: { [Op.like]: `%${query}%` } },
        //   { city: { [Op.like]: `%${query}%` } },
        //   { state: { [Op.like]: `%${query}%` } },
        //   { country: { [Op.like]: `%${query}%` } },
        //   // Add more fields if needed for search
        // ],
        address: { [Op.like]: `%${query}%` },
      },
    });

    // Extract the address IDs from the search results
    const addressIds = addresses.map((address) => address.address_id);

    // Find stores linked to the matched addresses
    const stores = await Store.findAll({
      where: {
        address_id: {
          [Op.in]: addressIds,
        },
      },
      include: [{ model: Address }],
    });

    res.json(stores);
  } catch (error) {
    console.error("Error searching stores by address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
