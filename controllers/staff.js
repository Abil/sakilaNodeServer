import { Op } from "sequelize";

import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";

// Get all staff with eager loading of related models
// export const getAllStaff = async (req, res) => {
//   try {
//     const staff = await Staff.findAll({
//       include: [
//         {
//           model: Store,
//           include: [
//             {
//               model: Address,
//               include: [{ model: City, include: [{ model: Country }] }],
//             },
//           ],
//         },
//         {
//           model: Address,
//           include: [
//             {
//               model: City,
//               include: [{ model: Country }],
//             },
//           ],
//         },
//       ],
//     });
//     res.json(staff);
//   } catch (error) {
//     console.error("Error fetching staff:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all staff with pagination
export const getAllStaff = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Staff.findAndCountAll({
      offset,
      limit: Number(pageSize),
      attributes: { exclude: ["password", "picture"] },
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
          model: Store,
          //as: "normal_staff",
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

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      staff: rows,
    });
  } catch (error) {
    console.error("Error fetching all staff:", error);
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
              //include: [{ model: City, include: [{ model: Country }] }],
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

// Get all staff
export const searchStaff = async (req, res) => {
  const { first_name, last_name } = req.query;
  try {
    let searchCriteria = {};

    // Include optional search criteria based on provided query parameters
    if (first_name) {
      searchCriteria.first_name = { [Op.like]: `%${first_name}%` };
    }
    if (last_name) {
      searchCriteria.last_name = { [Op.like]: `%${last_name}%` };
    }

    // const actors = await ActorAward.findAll({
    //   where: { actor_id: { [Op.not]: null } },
    // });

    // // Extract the actor IDs from the search results
    // const actorIds = actors.map((actor) => actor.actor_id);

    // searchCriteria.actor_id = {
    //   [Op.notIn]: actorIds,
    // };

    console.log("search criteria:", searchCriteria);

    // Find actors not linked to the actor awards
    const staff = await Staff.findAll({
      where: searchCriteria,
      //include: [{ model: ActorAward, attributes: ["awards"] }],
    });

    res.json(staff);
  } catch (error) {
    console.error("Error searching staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new staff
export const createNewStaff = async (req, res) => {
  const { first_name, last_name, address_id, store_id, username, email } =
    req.body;
  try {
    const newStaff = await Staff.create({
      first_name,
      last_name,
      address_id,
      store_id,
      username,
      email,
    });
    res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing staff
export const updateStaff = async (req, res) => {
  const { staffId } = req.params;
  const { first_name, last_name, address_id, store_id, username, email } =
    req.body;
  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    first_name
      ? (staff.first_name = first_name)
      : (staff.first_name = staff.first_name);
    last_name
      ? (staff.last_name = last_name)
      : (staff.last_name = staff.last_name);
    address_id
      ? (staff.address_id = address_id)
      : (staff.address_id = staff.address_id);
    store_id ? (staff.store_id = store_id) : (staff.store_id = staff.store_id);
    username ? (staff.username = username) : (staff.username = staff.username);
    email ? (staff.email = email) : (staff.email = staff.email);

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

// Get all actors with pagination
export const nonManagerStaff = async (req, res) => {
  const { first_name, last_name } = req.query;
  try {
    let searchCriteria = {};

    //Include optional search criteria based on provided query parameters
    if (first_name) {
      searchCriteria.first_name = { [Op.like]: `%${first_name}%` };
    }
    if (last_name) {
      searchCriteria.last_name = { [Op.like]: `%${last_name}%` };
    }

    const stores = await Store.findAll();

    // Extract the actor IDs from the search results
    const managers = stores.map((store) => store.manager_staff_id);

    searchCriteria.staff_id = {
      [Op.notIn]: managers,
    };

    console.log("search criteria:", searchCriteria);

    // Find actors not linked to the actor awards
    const nonManagerStaff = await Staff.findAll({
      where: searchCriteria,
      //include: [{ model: ActorAward, attributes: ["awards"] }],
    });

    res.json(nonManagerStaff);
  } catch (error) {
    console.error("Error fetching actors without awards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
