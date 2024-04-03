import express from "express";

import {
  inventoryCount,
  activeCustomerCount,
  customerEmailCount,
  uniqueFilmsCategoriesCount,
  replacementCost,
  averagePayment,
  customerRentalCount,
  storesDetails,
  inventoryDetails,
  inventoryRating,
  filmReplacementCostByStoreAndCategory,
  getCustomersWithDetails,
  getCustomerRentalDetails,
  getInvestorsAndAdvisors,
  getActorAwardsStats,
} from "../controllers/report.js";

const router = express.Router();

//Actor and Awards
router.get("/actor-award-stats", getActorAwardsStats);

//Investors and Advisors
router.get("/investor-advisor", getInvestorsAndAdvisors);

//Inventory
router.get("/inventory-count", inventoryCount);
router.get("/inventory/unique-count", uniqueFilmsCategoriesCount); //Also category
router.get("/inventory", inventoryDetails);
router.get("/inventory-rating", inventoryRating);

//Customer
router.get("/customer", getCustomersWithDetails);
router.get("/customer/rentals", getCustomerRentalDetails);

router.get("/customer/active-count", activeCustomerCount);
router.get("/customer/email-count", customerEmailCount);
router.get("/customer/rental-count", customerRentalCount);

//Replacement Cost
router.get("/replacement-cost", replacementCost);
router.get(
  "/replacement-cost/store-category",
  filmReplacementCostByStoreAndCategory
);

//Payment
router.get("/payment-average", averagePayment);

//Store
router.get("/store", storesDetails);

export default router;
