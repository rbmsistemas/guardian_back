import db from "../models/index.js";

export const getInventoryTypes = async (req, res) => {
  try {
    // const inventoryTypes = await db.InventoryType.findAll(); sort by name
    const inventoryTypes = await db.InventoryType.findAll({
      order: [["name", "ASC"]],
    });
    res.json({
      inventoryTypes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los tipos de inventario",
      error,
    });
  }
};
