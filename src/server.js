const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./config/swagger");
require("dotenv").config();
const { sequelize } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware here
app.use(cors());
app.use(express.json());

// Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes here
const authRouter = require("./routes/auth");
const gadgetsRouter = require("./routes/gadgets");
const auth = require("./middleware/auth");

// Public routes
app.use("/auth", authRouter);

// Protected routes
app.use("/gadgets", auth, gadgetsRouter);

// Basic routing for the testing here
app.get("/", (req, res) => {
    res.json({ message: "Welcome to IMF Gadget API" });
});

// Sync all models
sequelize
    .sync({ force: true })
    .then(() => {
        console.log("Database synced");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

// Error handling middleware part here
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message,
    });
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.sync();
        console.log("Database synced successfully");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
});

module.exports = app;
