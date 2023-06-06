import db from "../models/index.js";

const User = db.User;

export const signIn = async (req, res) => {
  console.log(req.body);
  try {
    const email = await User.findOne({
      where: {
        email: req.body.user,
      },
    });

    const userName = await User.findOne({
      where: {
        userName: req.body.user,
      },
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
