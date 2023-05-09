const Sequelize = require('sequelize');
const sequelize = require('../connection');

const CargoModel = sequelize.define(
    'cargo',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = CargoModel;