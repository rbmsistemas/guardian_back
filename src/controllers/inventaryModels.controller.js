import db from "../models/index.js";

const InventaryModels = db.InventaryModels;

export const getInventaryModels = async (req, res) => {
  try {
    const inventaryModels = await InventaryModels.findAll();
    res.json({
      inventaryModels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los modelos de inventario",
      error,
    });
  }
};
