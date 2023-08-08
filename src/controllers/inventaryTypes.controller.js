import db from "../models/index.js";

export const getInventaryTypes = async (req, res) => {
  try {
    const inventaryTypes = await db.InventaryTypes.findAll();
    res.json({
      inventaryTypes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los tipos de inventario",
      error,
    });
  }
};
