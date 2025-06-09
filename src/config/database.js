const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "imf_agent",
    password: process.env.DB_PASSWORD || "TopSecret@123",
    database: process.env.DB_NAME || "imf_gadgets",
    logging: false, // Set to true if you want to see SQL queries in console
});

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testConnection();

module.exports = {
    Sequelize,
    sequelize,
};
