const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Gadget = sequelize.define(
    "Gadget",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        codename: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM(
                "Available",
                "Deployed",
                "Destroyed",
                "Decommissioned"
            ),
            defaultValue: "Available",
        },
        successProbability: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        decommissionedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "gadgets",
        timestamps: true,
    }
);

module.exports = Gadget;
