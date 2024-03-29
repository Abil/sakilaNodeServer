import { Op } from "sequelize";

import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";
import Rental from "../models/rental.js";
import Customer from "../models/customer.js";
import Inventory from "../models/inventory.js";
import Film from "../models/film.js";

// Create a new rental
export const createRental = async (req, res) => {
  const { rental_date, inventory_id, customer_id, return_date, staff_id } =
    req.body;
  try {
    const rental = await Rental.create({
      rental_date,
      inventory_id,
      customer_id,
      return_date,
      staff_id,
    });
    res.status(201).json(rental);
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get rental by rental ID
export const getRental = async (req, res) => {
  const { rentalId } = req.params;
  try {
    const rental = await Rental.findByPk(rentalId, {
      include: [
        { model: Customer, as: "customer" },
        {
          model: Inventory,
          as: "inventory",
          include: [
            {
              model: Film,
            },
          ],
        },
        {
          model: Staff,
          as: "staff",
          attributes: { exclude: ["password", "picture"] },
          include: [
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
        },
      ],
    });
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.json(rental);
  } catch (error) {
    console.error("Error fetching rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get rentals that have not been returned yet
export const getUnreturnedRentals = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = (page - 1) * limit;

    const rentals = await Rental.findAndCountAll({
      where: {
        return_date: {
          [Op.is]: null, // Rentals without a return date
        },
      },
      include: [
        {
          model: Inventory,
          as: "inventory",
          include: [
            {
              model: Film,
            },
          ],
        },
      ],
      offset,
      limit,
    });

    res.json({
      total: rentals.count,
      totalPages: Math.ceil(rentals.count / limit),
      currentPage: page,
      rentals: rentals.rows,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update rental by rental ID
export const updateRental = async (req, res) => {
  const { rentalId } = req.params;
  const { rental_date, inventory_id, customer_id, return_date, staff_id } =
    req.body; // Body parameters match table column names
  try {
    const [updatedRows] = await Rental.update(
      { rental_date, inventory_id, customer_id, return_date, staff_id },
      { where: { rental_id: rentalId } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.status(200).json({
      message: "Rental item updated successfully",
    });
  } catch (error) {
    console.error("Error updating rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete rental by rental ID
export const deleteRental = async (req, res) => {
  const { rentalId } = req.params;
  try {
    const deletedRows = await Rental.destroy({
      where: { rental_id: rentalId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.status(200).json({
      message: "Rental item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all rentals
// export const getAllRentals = async (req, res) => {
//   try {
//     const rentals =
//       await Rental.findAll(/*{    //TODO: Uncomment after implementing pagination as it is crashing at the moment
//       include: [
//         { model: Customer, as: "customer" },
//         {
//           model: Inventory,
//           as: "inventory",
//           include: [
//             {
//               model: Film,
//             },
//           ],
//         },
//         {
//           model: Staff,
//           as: "staff",
//           include: [
//             {
//               model: Store,
//               as: "store",
//               include: [
//                 {
//                   model: Address,
//                   include: [{ model: City, include: [{ model: Country }] }],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     }*/);
//     res.json(rentals);
//   } catch (error) {
//     console.error("Error fetching all rentals:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all rentals with pagination
export const getAllRentals = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Rental.findAndCountAll({
      offset,
      limit: Number(pageSize),
      include: [
        { model: Customer, as: "customer" },
        {
          model: Inventory,
          as: "inventory",
          include: [
            {
              model: Film,
            },
          ],
        },
        {
          model: Staff,
          as: "staff",
          attributes: { exclude: ["password", "picture"] },
          include: [
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
        },
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      pageSize,
      rentals: rows,
    });
  } catch (error) {
    console.error("Error fetching all rentals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
