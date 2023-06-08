import db from "../models/index.js";
import { Op } from "sequelize";

const Proveedores = db.Proveedores;

export const createProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedores.create(req.body);
    res.json({
      message: "Proveedor creado correctamente",
      proveedor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el proveedor",
      error,
    });
  }
};

export const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedores.findAll();
    res.json({
      proveedores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los proveedores",
      error,
    });
  }
};

export const getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedores.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      proveedor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el proveedor",
      error,
    });
  }
};

export const updateProveedorById = async (req, res) => {
  try {
    console.log(req.body);
    await Proveedores.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Proveedor actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar el proveedor",
      error,
    });
  }
};

export const deleteProveedorById = async (req, res) => {
  try {
    await Proveedores.destroy({
      where: {
        id: req.params.id,
      },
    });

    const proveedores = await Proveedores.findAll();
    res.json({
      message: "Proveedor eliminado correctamente",
      proveedores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al eliminar el proveedor",
      error,
    });
  }
};

export const getProveedoresByParams = async (req, res) => {
  const { search, status, page, quantityResults } = req.body;
  const resultsPerPage = parseInt(quantityResults) || 5;

  try {
    let whereClause = {
      [Op.or]: [
        {
          proveedor: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          encargado: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    if (status) {
      whereClause = { ...whereClause, status: status };
    }

    const { count, rows } = await Proveedores.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      offset: (page - 1) * resultsPerPage,
    });

    const totalPages = Math.ceil(count / resultsPerPage);
    const totalEntries = count;

    res.json({
      proveedores: rows,
      totalPages,
      totalEntries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los proveedores",
      error,
    });
  }
};
