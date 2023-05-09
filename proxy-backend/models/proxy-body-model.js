const Sequelize = require('sequelize');
const sequelize = require('../connection');

const ProxyBodyModel = sequelize.define(
    'proxybodies',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        unit: {
            type: Sequelize.STRING(8),
            allowNull: false,
        },
        proxyheaderid: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        }, 
        productid: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = ProxyBodyModel;