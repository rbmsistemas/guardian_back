import db from "../models/index.js";

const InventoryModel = db.InventoryModel;
const Inventory = db.Inventory;
const InventoryType = db.InventoryType;
const InventoryBrand = db.InventoryBrand;
import { Op, literal, fn, col } from "sequelize";

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
    inventoryType,
    inventoryBrand,
    search,
    page,
    quantityResults,
    orderBy,
    sort,
  } = req.body;

  try {
    const resultsPerPage = parseInt(quantityResults) ?? 10;
    let where = {};
    if (inventoryType) where.inventoryTypeId = inventoryType;
    if (inventoryBrand) where.inventoryBrandId = inventoryBrand;
    if (search) where.name = { [Op.like]: `%${search}%` };

    const validOrderByValues = [
      "inventoryBrandId",
      "inventoryTypeId",
      "inventoriesCount",
    ];
    const orderByValue = validOrderByValues.includes(orderBy) ? orderBy : null;

    let order = [];
    if (orderByValue && sort) {
      if (orderByValue === "inventoryBrandId") {
        order.push([
          { model: InventoryBrand, as: "inventoryBrand" },
          "name",
          sort,
        ]);
      } else if (orderByValue === "inventoryTypeId") {
        order.push([
          { model: InventoryType, as: "inventoryType" },
          "name",
          sort,
        ]);
      } else if (orderByValue === "inventoriesCount") {
        order.push([literal(`inventoriesCount`), sort]);
      }
    } else {
      order.push(["updatedAt", sort ?? "DESC"]);
    }

    const { count, rows } = await InventoryModel.findAndCountAll({
      where,
      order,
      offset: page * resultsPerPage,
      limit: resultsPerPage,
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
      attributes: {
        include: [
          [
            literal(
              `(SELECT COUNT(*) FROM Inventory WHERE Inventory.inventoryModelId = InventoryModel.id)`
            ),
            "inventoriesCount",
          ],
        ],
      },
    });

    const totalPages = Math.ceil(count / resultsPerPage);
    const totalEntries = count;
    res.json({
      inventoryModels: rows,
      totalPages,
      totalEntries,
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

export const getInventoryModelById = async (req, res) => {
  try {
    const id = req.params.id;
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
        {
          model: Inventory, // Incluir el modelo de inventario
          as: "inventoryModel", // Asignar un alias para referenciarlo
          include: [
            {
              model: InventoryModel,
              as: "inventoryModel",
              include: [
                {
                  model: InventoryBrand,
                  as: "inventoryBrand",
                },
                {
                  model: InventoryType,
                  as: "inventoryType",
                },
              ],
            },
          ],
        },
      ],
      attributes: {
        include: [
          [
            literal(
              `(SELECT COUNT(*) FROM Inventory WHERE Inventory.inventoryModelId = InventoryModel.id)`
            ),
            "inventoriesCount",
          ],
          [
            literal(
              `(SELECT COUNT(*) FROM Inventory WHERE Inventory.inventoryModelId = InventoryModel.id AND Inventory.status = '1')`
            ),
            "altaCount",
          ],
          [
            literal(
              `(SELECT COUNT(*) FROM Inventory WHERE Inventory.inventoryModelId = InventoryModel.id AND Inventory.status = '2')`
            ),
            "propuestaCount",
          ],
          [
            literal(
              `(SELECT COUNT(*) FROM Inventory WHERE Inventory.inventoryModelId = InventoryModel.id AND Inventory.status = '3')`
            ),
            "bajaCount",
          ],
        ],
      },
    });
    res.json({
      inventoryModel,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
