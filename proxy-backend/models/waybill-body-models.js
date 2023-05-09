const Sequelize = require("sequelize");
const sequelize = require("../connection");

const WaybillBodyModel = sequelize.define(
  "waybillbody",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // order: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    productid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    waybillheaderid: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    individualid: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    expdate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    // classcargo: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // weight: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    // counttrips: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    // },
  },
  {
    timestamps: false,
  }
);

module.exports = WaybillBodyModel;
