import { QueryTypes } from "sequelize";

import sequelize from "../utils/db.js";
import Inventory from "../models/inventory.js";
import Customer from "../models/customer.js";
import Category from "../models/category.js";
import Film from "../models/film.js";
//import ActorAward from "../models/actorAward.js";
import Payment from "../models/payment.js";
import Rental from "../models/rental.js";
import Store from "../models/store.js";
//import Staff from "../models/staff.js";
import Address from "../models/address.js";
import City from "../models/city.js";
import Country from "../models/country.js";

//Count of inventory from each store
export const inventoryCount = async (req, res) => {
  try {
    // Execute the SQL query using Sequelize
    const inventoryCounts = await Inventory.findAll({
      attributes: [
        "store_id",
        [
          sequelize.fn("COUNT", sequelize.col("inventory_id")),
          "inventory_items",
        ],
      ],
      include: [
        {
          model: Store,
          include: [{ model: Address, attributes: ["address"] }],
        },
      ],
      group: ["store_id"],
    });

    // Return the result as JSON
    res.json(inventoryCounts);
  } catch (error) {
    console.error("Error fetching inventory counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Count of active customers from each store
export const activeCustomerCount = async (req, res) => {
  try {
    // Execute the SQL query using Sequelize
    const activeCustomerCounts = await Customer.findAll({
      attributes: [
        "store_id",
        [
          sequelize.fn("COUNT", sequelize.col("customer_id")),
          "active_customers",
        ],
      ],
      include: [
        {
          model: Store,
          include: [{ model: Address, attributes: ["address"] }],
        },
      ],
      where: {
        active: true,
      },
      group: ["store_id"],
    });

    // Return the result as JSON
    res.json(activeCustomerCounts);
  } catch (error) {
    console.error("Error fetching active customer counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Count of active customers from each store
export const customerEmailCount = async (req, res) => {
  try {
    // Execute the SQL query using Sequelize
    const emailCount = await Customer.count("email");

    // Return the result as JSON
    res.json({ emails: emailCount });
  } catch (error) {
    console.error("Error fetching email count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Count of unique films and categories
export const uniqueFilmsCategoriesCount = async (req, res) => {
  try {
    // Execute the SQL queries using Sequelize
    const [uniqueFilmsPerStore, uniqueCategoryCount] = await Promise.all([
      Inventory.findAll({
        attributes: [
          "store_id",
          [
            sequelize.fn("COUNT", sequelize.literal("DISTINCT film_id")),
            "unique_films",
          ],
        ],
        include: [
          {
            model: Store,
            include: [{ model: Address, attributes: ["address"] }],
          },
        ],
        group: ["store_id"],
      }),
      Category.count("name", {
        distinct: true,
      }),
    ]);

    // Return the results as JSON
    res.json({
      unique_films_per_store: uniqueFilmsPerStore,
      unique_category_count: uniqueCategoryCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Replacement cost (min/max/avg)
export const replacementCost = async (req, res) => {
  try {
    // Execute the SQL query using Sequelize
    const replacementCostStats = await Film.findOne({
      attributes: [
        [
          sequelize.fn("MIN", sequelize.col("replacement_cost")),
          "least_expensive",
        ],
        [
          sequelize.fn("MAX", sequelize.col("replacement_cost")),
          "most_expensive",
        ],
        [
          sequelize.fn("AVG", sequelize.col("replacement_cost")),
          "average_replacement_cost",
        ],
      ],
    });

    // Return the result as JSON
    res.json(replacementCostStats);
  } catch (error) {
    console.error("Error fetching replacement cost stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Average Payment (max/avg)
export const averagePayment = async (req, res) => {
  try {
    // Execute the SQL query using Sequelize
    const paymentStats = await Payment.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("amount")), "max_payment"],
        [sequelize.fn("AVG", sequelize.col("amount")), "average_payment"],
      ],
    });

    // Return the result as JSON
    res.json(paymentStats);
  } catch (error) {
    console.error("Error fetching average payment stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Customer Rental Count
export const customerRentalCount = async (req, res) => {
  try {
    // Fetch rental counts per customer using Sequelize aggregation
    const rentalCounts = await Rental.findAll({
      attributes: [
        "customer_id",
        [
          sequelize.fn("COUNT", sequelize.col("rental_id")),
          "number_of_rentals",
        ],
      ],
      include: [
        { model: Customer, attributes: ["first_name", "last_name", "email"] },
      ],
      group: ["customer_id"],
      order: [[sequelize.literal("number_of_rentals"), "DESC"]],
    });

    //Alternate way:
    // const rentalCounts = await sequelize.query(
    //   `
    //   SELECT
    //     customer_id,
    //     COUNT(rental_id) AS number_of_rentals
    //   FROM
    //     rental
    //   GROUP BY
    //     customer_id
    //   ORDER BY
    //     COUNT(rental_id) DESC;
    // `,
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //   }
    // );

    // Return the result as JSON
    res.json(rentalCounts);
  } catch (error) {
    console.error("Error fetching rental counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Store Details
export const storesDetails = async (req, res) => {
  try {
    // Fetch store details along with associated staff and address information
    // const storeDetails = await Store.findAll({
    //   include: [
    //     {
    //       model: Staff,
    //       attributes: [
    //         ["first_name", "manager_first_name"], // Alias for first_name
    //         ["last_name", "manager_last_name"], // Alias for last_name
    //       ],
    //       where: { staff_id: sequelize.col('Store.manager_staff_id') },
    //       required: false,
    //     },
    //     {
    //       model: Address,
    //       attributes: ["address", "district"],
    //       required: false,
    //       include: [
    //         {
    //           model: City,
    //           attributes: ["city"],
    //           required: false,
    //           include: [
    //             {
    //               model: Country,
    //               attributes: ["country"],
    //               required: false,
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });

    //Alternate way:
    const storeDetails = await sequelize.query(
      `
        SELECT
        staff.first_name AS manager_first_name,
        staff.last_name AS manager_last_name,
        address.address,
        address.district,
        city.city,
        country.country
        FROM
            store
        LEFT JOIN staff ON store.manager_staff_id = staff.staff_id
        LEFT JOIN address ON store.address_id = address.address_id
        LEFT JOIN city ON address.city_id = city.city_id
        LEFT JOIN country ON city.country_id = country.country_id;
    `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Return the result as JSON
    res.json(storeDetails);
  } catch (error) {
    console.error("Error fetching store details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Inventory Details
export const inventoryDetails = async (req, res) => {
  try {
    const inventories = await Inventory.findAll({
      include: [
        {
          model: Film,
          attributes: ["title", "rating", "rental_rate", "replacement_cost"],
        },
        {
          model: Store,
          include: [{ model: Address, attributes: ["address"] }],
          attributes: ["address_id"], // Include store details if needed
        },
      ],
      attributes: ["store_id", "inventory_id"],
    });
    res.json(inventories);
  } catch (error) {
    console.error("Error fetching inventories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Inventory Rating Details
export const inventoryRating = async (req, res) => {
  try {
    //Does not work due to some "sql_mode=only_full_group_by"
    // const inventoryItems = await Inventory.findAll({
    //   include: [
    //     {
    //       model: Film,
    //       attributes: ["rating"],
    //     },
    //   ],
    //   attributes: [
    //     "store_id",
    //     "film.rating",
    //     [
    //       sequelize.fn("COUNT", sequelize.col("inventory_id")),
    //       "inventory_items",
    //     ],
    //   ],
    //   group: ["inventory.store_id", "film.rating"],
    // });

    const inventoryItems = await sequelize.query(`
        SELECT 
        inventory.store_id, 
        film.rating, 
        COUNT(inventory_id) AS inventory_items
        FROM inventory
            LEFT JOIN film
                ON inventory.film_id = film.film_id
        GROUP BY 
            inventory.store_id,
            film.rating;`);
    res.json(inventoryItems);
  } catch (error) {
    console.error("Error fetching inventories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//REplacement cost for all films of a store based on categort
export const filmReplacementCostByStoreAndCategory = async (req, res) => {
  try {
    const films = await sequelize.query(`
       SELECT 
	store_id, 
    category.name AS category, 
	COUNT(inventory.inventory_id) AS films, 
    AVG(film.replacement_cost) AS avg_replacement_cost, 
    SUM(film.replacement_cost) AS total_replacement_cost
    
    FROM inventory
        LEFT JOIN film
            ON inventory.film_id = film.film_id
        LEFT JOIN film_category
            ON film.film_id = film_category.film_id
        LEFT JOIN category
            ON category.category_id = film_category.category_id

    GROUP BY 
        store_id, 
        category.name
        
    ORDER BY 
        SUM(film.replacement_cost) DESC;`);
    res.json(films);
  } catch (error) {
    console.error("Error fetching inventories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCustomersWithDetails = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: ["first_name", "last_name", "store_id", "active"],
      include: [
        {
          model: Address,
          attributes: ["address"],
          include: [
            {
              model: City,
              attributes: ["city"],
              include: [
                {
                  model: Country,
                  attributes: ["country"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCustomerRentalDetails = async (req, res) => {
  try {
    //For some reason group by os joins is not working
    //Same error as above
    // const customers = await Customer.findAll({
    //   attributes: [
    //     "first_name",
    //     "last_name",
    //     [
    //       sequelize.fn("COUNT", sequelize.col("rentals.rental_id")),
    //       "total_rentals",
    //     ],
    //     [
    //       sequelize.fn("SUM", sequelize.col("payments.amount")),
    //       "total_payment_amount",
    //     ],
    //   ],
    //   include: [
    //     {
    //       model: Rental,
    //       as: "rentals",
    //       attributes: ["rental_id"],
    //     },
    //     {
    //       model: Payment,
    //       as: "payments",
    //       attributes: ["payment_id"],
    //     },
    //   ],
    //   group: ["customer.first_name", "customer.last_name"],
    //   order: [[sequelize.literal("SUM(payments.amount)"), "DESC"]],
    //   //order: [[sequelize.fn("SUM", Sequelize.col("payments.amount")), "DESC"]],
    // });

    const customers = await sequelize.query(`
       SELECT 
        customer.first_name, 
        customer.last_name, 
        COUNT(rental.rental_id) AS total_rentals, 
        SUM(payment.amount) AS total_payment_amount

        FROM customer
            LEFT JOIN rental ON customer.customer_id = rental.customer_id
            LEFT JOIN payment ON rental.rental_id = payment.rental_id

        GROUP BY 
            customer.first_name,
            customer.last_name

        ORDER BY 
            SUM(payment.amount) DESC
            ;`);

    res.json(customers);
  } catch (error) {
    console.error("Error fetching customer rental details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Investors and Advisors
export const getInvestorsAndAdvisors = async (req, res) => {
  try {
    const combinedData = await sequelize.query(
      `SELECT 'investor' AS type, first_name, last_name, company_name FROM investor
      UNION 
      SELECT 'advisor' AS type, first_name, last_name, NULL FROM advisor`,
      { type: QueryTypes.SELECT }
    );

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getActorAwardsStats = async (req, res) => {
  try {
    const actorAwardsStats = await sequelize.query(
      `
      SELECT
            CASE 
                WHEN actor_award.awards = 'Emmy, Oscar, Tony ' THEN '3 awards'
                WHEN actor_award.awards IN ('Emmy, Oscar','Emmy, Tony', 'Oscar, Tony') THEN '2 awards'
                ELSE '1 award'
            END AS number_of_awards, 
            AVG(CASE WHEN actor_award.actor_id IS NULL THEN 0 ELSE 1 END) AS pct_w_one_film
            
        FROM actor_award
            

        GROUP BY 
            CASE 
                WHEN actor_award.awards = 'Emmy, Oscar, Tony ' THEN '3 awards'
                WHEN actor_award.awards IN ('Emmy, Oscar','Emmy, Tony', 'Oscar, Tony') THEN '2 awards'
                ELSE '1 award'
            END
    `,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.json(actorAwardsStats);
  } catch (error) {
    console.error("Error fetching actor awards stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
