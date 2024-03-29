"use strict";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: "company",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rol: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      companyId: {
        type: DataTypes.UUID,
        references: {
          model: "Company",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    }
  );
  User.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  User.validatePassword = async function (password, currentPassword) {
    return await bcrypt.compare(password, currentPassword);
  };

  User.generateToken = async function (user, remember) {
    if (remember) {
      return jwt.sign({ id: user.id }, SECRET);
    } else {
      return jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400,
      });
    }
  };
  return User;
};
