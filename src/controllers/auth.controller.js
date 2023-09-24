import db from "../models/index.js";
import { Op } from "sequelize";

const User = db.User;
const Company = db.Company;
const Inventory = db.Inventory;

export const signIn = async (req, res) => {
  try {
    const email = await User.findOne({
      where: {
        email: req.body.user,
      },
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    const userName = await User.findOne({
      where: {
        userName: req.body.user,
      },
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    if (!email && !userName) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const user = email || userName;

    const validPassword = await User.validatePassword(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }
    const token = await User.generateToken(user, req.params.remember);

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userName: user.userName,
        rol: user.rol,
        photo: user.photos || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
        company: user.company,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al iniciar sesión",
      error: error,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener el usuario",
      error: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({
      message: "Sesión cerrada",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al cerrar sesión",
      error: error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const frequency = req.params.time || 7;
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (user.rol != 1 && user.rol != 2) {
      return res.status(401).json({
        message: "No tienes permisos para realizar esta acción",
      });
    }

    const allUsers = await User.findAll({
      where: {
        id: {
          [Op.ne]: "00000000-0000-0000-0000-000000000000",
        },
      },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    const inventories = await Inventory.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date() - frequency * 24 * 60 * 60 * 1000),
        },
      },
    });

    const users = allUsers.map((user) => {
      const inventory = inventories.filter(
        (inventory) => inventory.userId === user.id
      );

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userName: user.userName,
        rol: user.rol,
        photo: user.photos || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        status: user.status,
        company: user.company,
        inventory: inventory.length,
      };
    });

    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error,
    });
  }
};
