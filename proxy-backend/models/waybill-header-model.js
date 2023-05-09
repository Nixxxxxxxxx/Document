const Sequelize = require("sequelize");
const sequelize = require("../connection");

const WaybillHeaderModel = sequelize.define(
  "waybillheader",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dischargeDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    organizationId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    podrazdid: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    // mechanicsid: {
    //     type: Sequelize.INTEGER,
    //     foreignKey: true,
    //     allowNull: false,
    // },
    // technicsid: {
    //     type: Sequelize.INTEGER,
    //     foreignKey: true,
    //     allowNull: false,
    // },
  },
  {
    timestamps: false,
  }
);

module.exports = WaybillHeaderModel;
