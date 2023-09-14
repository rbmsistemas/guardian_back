import db from "../models/index.js";
import { Op } from "sequelize";

const Inventory = db.Inventory;
const InventoryType = db.InventoryType;
const InventoryBrand = db.InventoryBrand;
const InventoryModel = db.InventoryModel;

export const createInventory = async (req, res) => {
  try {
    if (
      req.body.inventoryModelId === "0" &&
      (await InventoryModel.findOne({
        where: { name: req.body.otherModel },
      })) === null
    ) {
      if (
        req.body.inventoryBrandId === "0" &&
        (await InventoryBrand.findOne({
          where: { name: req.body.otherBrand },
        })) === null
      ) {
        const inventoryBrand = await InventoryBrand.create({
          name: req.body.otherBrand,
          inventoryTypeId: req.body.inventoryTypeId,
        });
        req.body.inventoryBrandId = inventoryBrand.id;
      }

      if (
        req.body.inventoryTypeId === "0" &&
        (await InventoryType.findOne({
          where: { name: req.body.otherInventory },
        })) === null
      ) {
        const inventoryType = await InventoryType.create({
          name: req.body.otherInventory,
        });
        req.body.inventoryTypeId = inventoryType.id;
      }

      const inventoryModel = await InventoryModel.create({
        name: req.body.otherModel,
        inventoryTypeId: req.body.inventoryTypeId,
        inventoryBrandId: req.body.inventoryBrandId,
      });

      req.body.inventoryModelId = inventoryModel.id;
    }

    let body = {
      userId: req.body.userId,
      inventoryModelId: req.body.inventoryModelId,
      serialNumber: req.body.serialNumber,
      activo: req.body.activo,
      comments: req.body.comments,
      status: req.body.status,
      images: req.body.images,
      altaDate: req.body.altaDate,
      bajaDate: req.body.bajaDate,
      recepcionDate: req.body.recepcionDate,
      createdBy: req.body.createdBy,
    };

    const inventory = await Inventory.create(body);
    res.json({
      message: "Inventorio creado correctamente",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el inventorio",
      error: error.errors[0].message,
    });
  }
};

export const getValidateSerialNumber = async (req, res) => {
  const { serialNumber, currentId } = req.body;
  try {
    const inventory = await Inventory.findOne({
      where: {
        [Op.and]: [
          {
            serialNumber: serialNumber,
          },
          {
            id: {
              [Op.not]: currentId,
            },
          },
        ],
      },
    });

    if (inventory) {
      res.json({
        message: "Serial Number ya existe",
        status: false,
      });
    } else {
      res.json({
        message: "Serial Number no existe",
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventorio",
      error,
    });
  }
};
export const getValidateActivo = async (req, res) => {
  const { activo, currentId } = req.body;
  try {
    const inventory = await Inventory.findOne({
      where: {
        [Op.and]: [
          {
            activo: activo,
          },
          {
            id: {
              [Op.not]: currentId,
            },
          },
        ],
      },
    });

    if (inventory) {
      res.json({
        message: "Número Activo ya existe",
        status: false,
      });
    } else {
      res.json({
        message: "Número de Activo no existe",
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};

export const getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.findAll({
      include: [
        {
          model: InventoryModel,
          as: "inventoryModel",
        },
      ],
      order: [["updatedAt", "ASC"]],
    });
    res.json({
      inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los inventarios",
      error,
    });
  }
};

export const updateInventoryById = async (req, res) => {
  try {
    if (
      req.body.inventoryModelId === "0" &&
      (await InventoryModels.findOne({
        where: { name: req.body.otherModel },
      })) === null
    ) {
      if (
        req.body.inventoryBrandId === "0" &&
        (await InventoryBrand.findOne({
          where: { name: req.body.otherBrand },
        })) === null
      ) {
        const inventoryBrand = await InventoryBrand.create({
          name: req.body.otherBrand,
          inventoryTypeId: req.body.inventoryTypeId,
        });
        req.body.inventoryBrandId = inventoryBrand.id;
      }

      if (
        req.body.inventoryTypeId === "0" &&
        (await InventoryType.findOne({
          where: { name: req.body.otherInventory },
        })) === null
      ) {
        const inventoryType = await InventoryType.create({
          name: req.body.otherInventory,
        });
        req.body.inventoryTypeId = inventoryType.id;
      }

      const inventoryModel = await InventoryModels.create({
        name: req.body.otherModel,
        inventoryTypeId: req.body.inventoryTypeId,
        inventoryBrandId: req.body.inventoryBrandId,
      });

      req.body.inventoryModelId = inventoryModel.id;
    }

    let body = {
      userId: req.body.userId,
      inventoryModelId: req.body.inventoryModelId,
      serialNumber: req.body.serialNumber,
      activo: req.body.activo,
      comments: req.body.comments,
      status: req.body.status,
      images: req.body.images,
      altaDate: req.body.altaDate,
      bajaDate: req.body.bajaDate,
      recepcionDate: req.body.recepcionDate,
      createdBy: req.body.createdBy,
    };
    await Inventory.update(body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Inventario actualizado correctamente",
      inventory: await Inventory.findOne({
        where: {
          id: req.params.id,
        },
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar el inventario",
      error,
    });
  }
};

export const deleteInventoryById = async (req, res) => {
  try {
    await Inventory.destroy({
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

export const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};

export const getInventoriesByParams = async (req, res) => {
  const { search, brandType, inventoryType, status, page, quantityResults } =
    req.body;
  const resultsPerPage = parseInt(quantityResults) || 5;

  try {
    let whereClause = {
      [Op.or]: [
        {
          "$inventoryModel.name$": {
            [Op.like]: `%${search}%`,
          },
        },
        {
          serialNumber: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          activo: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    if (status) {
      whereClause = { ...whereClause, status: status };
    }

    if (brandType) {
      whereClause = { ...whereClause, inventoryBrandId: brandType };
    }

    if (inventoryType) {
      whereClause = { ...whereClause, inventoryTypeId: inventoryType };
    }

    const { count, rows } = await Inventory.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      offset: (page - 1) * resultsPerPage,
      order: [["updatedAt", "ASC"]],
      include: [
        {
          model: InventoryModels,
          as: "inventoryModel",
        },
      ],
    });

    const totalPages = Math.ceil(count / resultsPerPage);
    const totalEntries = count;

    res.json({
      inventories: rows,
      totalPages,
      totalEntries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los inventarios",
      error,
    });
  }
};

export const getInventoryByTypeId = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      where: {
        inventoryTypeId: req.params.id,
      },
    });
    res.json({
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};