import db from "../models/index.js";

const InventoryModel = db.InventoryModel;
const Inventory = db.Inventory;
const InventoryType = db.InventoryType;
const InventoryBrand = db.InventoryBrand;

export const getInventoryModels = async (req, res) => {
  try {
    const inventoryModels = await InventoryModel.findAll({
      order: [["name", "ASC"]],
      include: [
        {
          model: InventoryType,
          as: "inventoryType",
        },
        {
          model: InventoryBrand,
          as: "inventoryBrand",
        },
      ],
    });
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

export const getInventoryModelsByParams = async (req, res) => {
  const {
    inventoryTypeId,
    inventoryBrandId,
    search,
    page,
    quantityResults,
    orderBy,
    sort,
  } = req.body;

  let order = [["name", "DESC"]];

  try {
    let where = {};
    if (inventoryTypeId) where.inventoryTypeId = inventoryTypeId;
    if (inventoryBrandId) where.inventoryBrandId = inventoryBrandId;
    if (search) where.name = search;

    if (orderBy && sort) {
      if (orderBy === "name") {
        order = [[orderBy, sort]];
      } else if (orderBy === "inventoryType") {
        order = [[InventoryType, "name", sort]];
      } else if (orderBy === "inventoryBrand") {
        order = [[InventoryBrand, "name", sort]];
      } else {
        order = [[orderBy, sort]];
      }
    }

    const inventoryModels = await InventoryModel.findAll({
      where,
      order,
      offset: page * quantityResults,
      limit: quantityResults,
      include: [
        {
          model: InventoryType,
          as: "inventoryType",
        },
        {
          model: InventoryBrand,
          as: "inventoryBrand",
        },
      ],
    });

    const totalResults = await InventoryModel.count({ where });
    const totalPages = Math.ceil(totalResults / quantityResults);
    res.json({
      inventoryModels,
      totalResults,
      totalPages,
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

export const getInventoryModelById = async (id) => {
  try {
    const inventoryModel = await InventoryModel.findByPk(id, {
      include: [
        {
          model: InventoryType,
          as: "inventoryType",
        },
        {
          model: InventoryBrand,
          as: "inventoryBrand",
        },
      ],
    });

    const inventories = await Inventory.findAll({
      where: {
        inventoryModelId: id,
      },
    });
    return { inventoryModel, inventories };
  } catch (error) {
    console.log(error);
    return error;
  }
};
