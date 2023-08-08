import db from "../models/index.js";

const Inventary = db.Inventary;

export const createInventary = async (req, res) => {
  try {
    const inventary = await Inventary.create(req.body);
    res.json({
      message: "Inventario creado correctamente",
      inventary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el inventario",
      error,
    });
  }
};

export const getInventarys = async (req, res) => {
  try {
    const inventarys = await Inventary.findAll();
    res.json({
      inventarys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los inventarios",
      error,
    });
  }
};

export const updateInventaryById = async (req, res) => {
  try {
    console.log(req.body);
    await Inventary.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Inventario actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar el inventario",
      error,
    });
  }
};

export const deleteInventaryById = async (req, res) => {
  try {
    await Inventary.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Inventario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al eliminar el inventario",
      error,
    });
  }
};

export const getInventaryById = async (req, res) => {
  try {
    const inventary = await Inventary.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      inventary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};

export const getInventaryByModelId = async (req, res) => {
  try {
    const inventary = await Inventary.findAll({
      where: {
        inventaryModelId: req.params.id,
      },
    });
    res.json({
      inventary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};

export const getInventaryByTypeId = async (req, res) => {
  try {
    const inventary = await Inventary.findAll({
      where: {
        inventaryTypeId: req.params.id,
      },
    });
    res.json({
      inventary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};
