import db from "../models/index.js";

const InventoryBrand = db.InventoryBrand;

export const getInventoryBrands = async (req, res) => {
  try {
    const inventoryBrands = await InventoryBrand.findAll();
    res.json({
      inventoryBrands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las marcas de inventario",
      error,
    });
  }
};
