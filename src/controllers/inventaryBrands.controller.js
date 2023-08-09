import db from "../models/index.js";

const InventaryBrands = db.InventaryBrands;

export const getInventaryBrands = async (req, res) => {
  try {
    const inventaryBrands = await InventaryBrands.findAll();
    res.json({
      inventaryBrands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las marcas de inventario",
      error,
    });
  }
};
