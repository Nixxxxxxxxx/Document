const Sequelize = require('sequelize');
const sequelize = require('../connection');

const PlaceModel = sequelize.define(
    'place',
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

module.exports = PlaceModel;