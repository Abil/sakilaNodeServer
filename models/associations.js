import City from "./city.js";
import Country from "./country.js";
import Address from "./address.js";
import Store from "./store.js";
import Staff from "./staff.js";
import Customer from "./customer.js";
import Film from "./film.js";
import Actor from "./actor.js";
import Language from "./language.js";
import Category from "./category.js";
import FilmCategory from "./filmCategory.js";
import FilmActor from "./filmActor.js";
import ActorAward from "./actorAward.js";
import Inventory from "./inventory.js";
import Rental from "./rental.js";
import Payment from "./payment.js";

export const associateModels = () => {
  return new Promise((resolve, reject) => {
    //Association between address, city and country
    //Every address entry has only one city entry associated (one to one)
    Address.belongsTo(City, { foreignKey: "city_id" });
    //A city entry can be associated with multiple address entries (one to many)
    City.hasMany(Address, { foreignKey: "city_id" });
    City.belongsTo(Country, { foreignKey: "country_id" });
    Country.hasMany(City, { foreignKey: "country_id" });

    //Association between address, store and staff
    Store.belongsTo(Staff, { foreignKey: "manager_staff_id" });
    //Every staff entry has only one store entry associated (one to one)
    Staff.hasOne(Store, { foreignKey: "manager_staff_id" });
    Store.belongsTo(Address, { foreignKey: "address_id" });
    //Every address entry has only one store entry associated (one to one)
    Address.hasOne(Store, { foreignKey: "address_id" });
    Staff.belongsTo(Address, { foreignKey: "address_id" });
    Address.hasOne(Staff, { foreignKey: "address_id" });

    //Association between address, store and customer
    Customer.belongsTo(Address, { foreignKey: "address_id" });
    Address.hasOne(Customer, { foreignKey: "address_id" });
    Customer.belongsTo(Store, { foreignKey: "store_id" });
    Store.hasOne(Customer, { foreignKey: "store_id" });

    //Association between film, language
    Film.belongsTo(Language, { foreignKey: "language_id", as: "language" });
    Language.hasOne(Film, { foreignKey: "language_id", as: "language" });
    Film.belongsTo(Language, {
      foreignKey: "original_language_id",
      as: "original_language",
    });
    Language.hasOne(Film, {
      foreignKey: "original_language_id",
      as: "original_language",
    });

    //Many to many relationship betwwen flim and category using a flimCategory junction table
    Film.belongsToMany(Category, {
      through: FilmCategory,
      foreignKey: "film_id",
      //This is done to avoid pluralisation of models associated through join ables (check getFilmById and getAllActorsForFilm controller)
      as: "category",
    });
    Category.belongsToMany(Film, {
      through: FilmCategory,

      foreignKey: "category_id",
    });
    //Needed for lazy loading
    FilmCategory.belongsTo(Film, { foreignKey: "film_id" });
    FilmCategory.belongsTo(Category, { foreignKey: "category_id" });

    //Many to many relationship betwwen flim and actor using a flimActor junction table
    Actor.belongsToMany(Film, {
      through: FilmActor,
      foreignKey: "actor_id",
    });
    Film.belongsToMany(Actor, {
      through: FilmActor,
      foreignKey: "film_id",
    });
    //Needed for lazy loading
    FilmActor.belongsTo(Actor, { foreignKey: "actor_id" });
    FilmActor.belongsTo(Film, { foreignKey: "film_id" });

    //Done to fetch award data from actor award into Actor
    Actor.belongsTo(ActorAward, { foreignKey: "actor_id" });

    Inventory.belongsTo(Film, { foreignKey: "film_id" });
    Film.hasMany(Inventory, { foreignKey: "film_id" });

    Inventory.belongsTo(Store, { foreignKey: "store_id" });
    Store.hasMany(Inventory, { foreignKey: "store_id" });

    //Associations between rental, inventory, customer and staff
    Rental.belongsTo(Staff, { foreignKey: "staff_id" });
    Staff.hasMany(Rental, { foreignKey: "staff_id" });

    Rental.belongsTo(Customer, { foreignKey: "customer_id" });
    Customer.hasMany(Rental, { foreignKey: "customer_id" });

    Rental.belongsTo(Inventory, { foreignKey: "inventory_id" });
    Inventory.hasMany(Rental, { foreignKey: "inventory_id" });

    //Associations between payment, customer and staff
    Payment.belongsTo(Customer, { foreignKey: "customer_id" });
    Customer.hasMany(Payment, { foreignKey: "customer_id" });

    Payment.belongsTo(Staff, { foreignKey: "staff_id" });
    Staff.hasMany(Payment, { foreignKey: "staff_id" });

    Payment.belongsTo(Rental, { foreignKey: "rental_id" });
    Rental.hasMany(Payment, { foreignKey: "rental_id" });

    //Disregarding this for now as there is no use of flimText table
    // Film.hasOne(FilmText, { foreignKey: "film_id" });
    // FilmText.belongsTo(Film, { foreignKey: "film_id" });

    // Assuming the associations are successful, resolve the promise
    resolve();

    // If there's an error in setting up associations, reject the promise
    reject(new Error("Failed to set up associations"));
  });
};
