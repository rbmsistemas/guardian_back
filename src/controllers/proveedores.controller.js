import db from "../models/index.js";

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
    res.json({
      message: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al eliminar el proveedor",
      error,
    });
  }
};

export const getProveedoresByStatus = async (req, res) => {
  try {
    const proveedores = await Proveedores.findAll({
      where: {
        status: req.params.status,
      },
    });
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
