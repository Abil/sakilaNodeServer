import City from "./city.js";
import Country from "./country.js";
import Address from "./address.js";

export const associateModels = () => {
  return new Promise((resolve, reject) => {
    Address.belongsTo(City, { foreignKey: "city_id" });
    City.hasMany(Address, { foreignKey: "city_id" });
    City.belongsTo(Country, { foreignKey: "country_id" });
    Country.hasMany(City, { foreignKey: "country_id" });

    // Assuming the associations are successful, resolve the promise
    resolve();

    // If there's an error in setting up associations, reject the promise
    reject(new Error("Failed to set up associations"));
  });
};
