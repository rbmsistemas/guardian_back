import db from "../models/index.js";

const InventoryModel = db.InventoryModel;

export const getInventoryModels = async (req, res) => {
  try {
    const inventoryModels = await InventoryModel.findAll();
    res.json({
      inventoryModels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los modelos de inventario",
      error,
    });
  }
};

export const createInventoryModel = async (req, res) => {
  try {
    const inventoryModel = await InventoryModel.create({
      name: req.body.name,
    });
    res.json({
      inventoryModel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el modelo de inventario",
      error,
    });
  }
};

export const updateInventoryModel = async (req, res) => {
  try {
    const inventoryModel = await InventoryModel.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.json({
      inventoryModel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar el modelo de inventario",
      error,
    });
  }
};
