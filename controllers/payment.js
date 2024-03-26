import Store from "../models/store.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";
import Staff from "../models/staff.js";
import Rental from "../models/rental.js";
import Customer from "../models/customer.js";
import Inventory from "../models/inventory.js";
import Film from "../models/film.js";
import Payment from "../models/payment.js";

// Create a new payment
export const createPayment = async (req, res) => {
  const { customer_id, staff_id, rental_id, amount, payment_date } = req.body;
  try {
    const payment = await Payment.create({
      customer_id,
      staff_id,
      rental_id,
      amount,
      payment_date,
    });
    res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get payment by payment ID
export const getPayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findByPk(paymentId, {
      include: [
        { model: Customer, as: "customer" },
        {
          model: Rental,
          as: "rental",
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
        },
        {
          model: Staff,
          as: "staff",
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
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update payment by payment ID
export const updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  const { customer_id, staff_id, rental_id, amount, payment_date } = req.body;
  try {
    const [updatedRows] = await Payment.update(
      { customer_id, staff_id, rental_id, amount, payment_date },
      { where: { payment_id: paymentId } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete payment by payment ID
export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const deletedRows = await Payment.destroy({
      where: { payment_id: paymentId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  // try {
  //   const payments = await Payment.findAll({
  //     //TODO: Implement after pagination
  //     include: [
  //       { model: Customer, as: "customer" },
  //       {
  //         model: Rental,
  //         as: "rental",
  //         include: [
  //           {
  //             model: Inventory,
  //             as: "inventory",
  //             include: [
  //               {
  //                 model: Film,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         model: Staff,
  //         as: "staff",
  //         include: [
  //           {
  //             model: Store,
  //             as: "store",
  //             include: [
  //               {
  //                 model: Address,
  //                 include: [{ model: City, include: [{ model: Country }] }],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   });
  //   res.json(payments);
  // } catch (error) {
  //   console.error("Error fetching all payments:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

  try {
    const { count, rows } = await Payment.findAndCountAll({
      offset,
      limit: Number(pageSize),
      include: [
        { model: Customer, as: "customer" },
        {
          model: Rental,
          as: "rental",
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
        },
        {
          model: Staff,
          as: "staff",
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
      payments: rows,
    });
  } catch (error) {
    console.error("Error fetching all payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
