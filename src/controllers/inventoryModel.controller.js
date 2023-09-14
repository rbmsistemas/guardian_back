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
