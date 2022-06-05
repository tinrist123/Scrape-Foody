const mongoose = require("mongoose");
require("dotenv/config");
const migrateProvince = require("./src/migrate/province");
const migrateDistrict = require("./src/migrate/district");
const mirgateRestaurant = require("./src/migrate/restaurant");
const migrateDish = require("./src/migrate/migrateDish");
const migrateComment = require("./src/migrate/migrateComment");

try {
  mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("connect to DB");
    // migrateProvince();
    // migrateDistrict();
    // mirgateRestaurant();
    // migrateDish();
    // migrateComment();
  });
} catch (error) {
  console.log(error);
}
