const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("medicalappointmentbooking", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set this to true for detailed logging
});

let connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDb;
