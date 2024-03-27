import Customer from "../models/customer.js";
import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";

// Get all customers
// export const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.findAll({
//       include: [
//         {
//           model: Store,
//           include: [
//             {
//               model: Address,
//               include: [{ model: City, include: [{ model: Country }] }],
//             },
//             {
//               model: Staff,
//               include: [
//                 {
//                   model: Address,
//                   include: [{ model: City, include: [{ model: Country }] }],
//                 },
//               ],
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
//     res.json(customers);
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Get all customers with pagination
export const getAllCustomers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const { count, rows } = await Customer.findAndCountAll({
      offset,
      limit: Number(pageSize),
      include: [
        {
          model: Store,
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
            // {
            //   model: Staff,
            //   attributes: { exclude: ["password", "picture"] },
            //   include: [
            //     {
            //       model: Address,
            //       include: [{ model: City, include: [{ model: Country }] }],
            //     },
            //   ],
            // },
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
      customers: rows,
    });
  } catch (error) {
    console.error("Error fetching all customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a customer by ID
export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findByPk(customerId, {
      include: [
        {
          model: Store,
          include: [
            {
              model: Address,
              include: [{ model: City, include: [{ model: Country }] }],
            },
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
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new customer
export const createNewCustomer = async (req, res) => {
  const { store_id, first_name, last_name, email, address_id, active } =
    req.body;
  try {
    const newCustomer = await Customer.create({
      store_id,
      first_name,
      last_name,
      email,
      address_id,
      active,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing customer
export const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { store_id, first_name, last_name, email, address_id, active } =
    req.body;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    customer.store_id = store_id;
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.email = email;
    customer.address_id = address_id;
    customer.active = active;
    await customer.save();
    res.json(customer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an existing customer
export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    await customer.destroy();
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
