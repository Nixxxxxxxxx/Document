const Sequelize = require("sequelize");
const sequelize = require("../connection");

const PodrazdModel = sequelize.define(
  "podrazd",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nameOrg: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PodrazdModel;
