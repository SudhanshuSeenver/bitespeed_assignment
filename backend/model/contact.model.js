const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Contact = sequelize.define(
  "contact",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncreement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    linkedId: {
      type: Sequelize.INTEGER,
    },
    linkedPrecedence: {
      type: Sequelize.STRING,
      validate: {
        isIn: [["primary", "secondary"]],
      },
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Contact;
