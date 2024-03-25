import City from "./city.js";
import Country from "./country.js";
import Address from "./address.js";
import Store from "./store.js";
import Staff from "./staff.js";

export const associateModels = () => {
  return new Promise((resolve, reject) => {
    //Every address entry has only one city entry associated (one to one)
    Address.belongsTo(City, { foreignKey: "city_id" });
    //A city entry can be associated with multiple address entries (one to many)
    City.hasMany(Address, { foreignKey: "city_id" });
    City.belongsTo(Country, { foreignKey: "country_id" });
    Country.hasMany(City, { foreignKey: "country_id" });

    Store.belongsTo(Staff, { foreignKey: "manager_staff_id" });
    //Every staff entry has only one store entry associated (one to one)
    Staff.hasOne(Store, { foreignKey: "manager_staff_id" });
    Store.belongsTo(Address, { foreignKey: "address_id" });
    //Every address entry has only one store entry associated (one to one)
    Address.hasOne(Store, { foreignKey: "address_id" });

    Staff.belongsTo(Address, { foreignKey: "address_id" });
    Address.hasOne(Staff, { foreignKey: "address_id" });

    ///

    // Payment.belongsTo(Customer, { foreignKey: "customer_id" });
    // Customer.hasMany(Payment, { foreignKey: "customer_id" });

    // Payment.belongsTo(Staff, { foreignKey: "staff_id" });
    // Staff.hasMany(Payment, { foreignKey: "staff_id" });

    // Rental.belongsTo(Staff, { foreignKey: "staff_id" });
    // Staff.hasMany(Rental, { foreignKey: "staff_id" });

    // Rental.belongsTo(Customer, { foreignKey: "customer_id" });
    // Customer.hasMany(Rental, { foreignKey: "customer_id" });

    // Rental.belongsTo(Inventory, { foreignKey: "inventory_id" });
    // Inventory.hasMany(Rental, { foreignKey: "inventory_id" });

    // Actor.belongsToMany(Film, { through: "FilmActor", foreignKey: "actor_id" });
    // Film.belongsToMany(Actor, { through: "FilmActor", foreignKey: "film_id" });

    // Film.belongsToMany(Category, {
    //   through: "FilmCategory",
    //   foreignKey: "film_id",
    // });
    // Category.belongsToMany(Film, {
    //   through: "FilmCategory",
    //   foreignKey: "category_id",
    // });

    // Film.hasOne(FilmText, { foreignKey: "film_id" });
    // FilmText.belongsTo(Film, { foreignKey: "film_id" });

    ///

    // Assuming the associations are successful, resolve the promise
    resolve();

    // If there's an error in setting up associations, reject the promise
    reject(new Error("Failed to set up associations"));
  });
};
