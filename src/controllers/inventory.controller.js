import db from "../models/index.js";
import { Op, literal } from "sequelize";
import { normalize } from "normalize-diacritics";

const Inventory = db.Inventory;
const InventoryType = db.InventoryType;
const InventoryBrand = db.InventoryBrand;
const InventoryModel = db.InventoryModel;

const defaultDetails = [
  { key: "orden de compra", value: "" },
  { key: "factura", value: "" },
  { key: "ubicacion", value: "" },
  { key: "usuario", value: "" },
];

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
        });
        req.body.inventoryBrandId = inventoryBrand.id;
      }

      if (
        req.body.inventoryTypeId === "0" &&
        (await InventoryType.findOne({
          where: { name: req.body.otherType },
        })) === null
      ) {
        const inventoryType = await InventoryType.create({
          name: req.body.otherType,
        });
        req.body.inventoryTypeId = inventoryType.id;
      }

      const inventoryModel = await InventoryModel.create({
        name: req.body.otherModel,
        images: [],
        inventoryBrandId: req.body.inventoryBrandId,
        inventoryTypeId: req.body.inventoryTypeId,
      });

      req.body.inventoryModelId = inventoryModel.id;
    }

    await Promise.all(
      req.body.details.map(async (detail) => {
        const inventoryField = await db.InventoryField.findOne({
          where: {
            name: detail.key,
          },
        });

        if (inventoryField === null) {
          return await db.InventoryField.create({
            name: detail.key,
          });
        } else {
          return inventoryField;
        }
      })
    );

    const inventoryFields = await db.InventoryField.findAll();

    const user = await db.User.findOne({
      where: {
        id: req.userId,
      },
    });

    let body = {
      userId: req.userId,
      inventoryModelId: req.body.inventoryModelId,
      serialNumber: req.body.serialNumber,
      activo: req.body.activo,
      comments: req.body.comments,
      status: req.body.status,
      images: req.body.images,
      altaDate: req.body.altaDate,
      bajaDate: req.body.bajaDate,
      recepcionDate: req.body.recepcionDate,
      details: req.body.details || defaultDetails,
      createdBy: user.userName,
    };

    const inventory = await Inventory.create(body);
    res.json({
      message: "Inventorio creado correctamente",
      inventory,
      inventoryFields,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el inventorio",
      error: error?.errors[0]?.message || error,
    });
  }
};

export const updateInventoryById = async (req, res) => {
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
        });
        req.body.inventoryBrandId = inventoryBrand.id;
      }

      if (
        req.body.inventoryTypeId === "0" &&
        (await InventoryType.findOne({
          where: { name: req.body.otherType },
        })) === null
      ) {
        const inventoryType = await InventoryType.create({
          name: req.body.otherType,
        });
        req.body.inventoryTypeId = inventoryType.id;
      }

      const inventoryModel = await InventoryModel.create({
        name: req.body.otherModel,
        images: req.body.images,
        inventoryTypeId: req.body.inventoryTypeId,
        inventoryBrandId: req.body.inventoryBrandId,
      });

      req.body.inventoryModelId = inventoryModel.id;
    }

    await Promise.all(
      req.body?.details?.map(async (detail) => {
        const inventoryField = await db.InventoryField.findOne({
          where: {
            name: detail.key,
          },
        });

        if (inventoryField === null) {
          return await db.InventoryField.create({
            name: detail.key,
          });
        } else {
          return inventoryField;
        }
      })
    );

    const inventoryFields = await db.InventoryField.findAll();

    let body = {
      inventoryModelId: req.body.inventoryModelId,
      serialNumber: req.body.serialNumber,
      activo: req.body.activo,
      comments: req.body.comments,
      status: req.body.status,
      images: req.body.images,
      altaDate: req.body.altaDate,
      bajaDate: req.body.bajaDate,
      recepcionDate: req.body.recepcionDate || null,
      details: req.body.details || defaultDetails,
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
      inventoryFields,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar el inventario",
      error,
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
  const {
    search,
    brandType,
    inventoryType,
    status,
    page,
    quantityResults,
    orderBy,
    sort,
  } = req.body;
  const resultsPerPage = parseInt(quantityResults) || 10;
  let order = [["updatedAt", "DESC"]];

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
        {
          comments: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          details: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          createdBy: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    if (status) {
      whereClause = { ...whereClause, status: status };
    }

    if (brandType) {
      whereClause = {
        ...whereClause,
        "$inventoryModel.inventoryBrandId$": brandType,
      };
    }

    if (inventoryType) {
      whereClause = {
        ...whereClause,
        "$inventoryModel.inventoryTypeId$": inventoryType,
      };
    }

    if (sort && orderBy) {
      if (orderBy === "inventoryBrandId" || orderBy === "inventoryTypeId") {
        order = [
          [
            {
              model: InventoryModel,
              as: "inventoryModel",
            },
            orderBy,
            sort,
          ],
        ];
      } else {
        order = [[orderBy, sort]];
      }
    }

    const { count, rows } = await Inventory.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      offset: (page - 1) * resultsPerPage,
      order: order,
      include: [
        {
          model: InventoryModel,
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

export const getInventoriesBySearch = async (req, res) => {
  const { search } = req.body;
  const resultsPerPage = 20;
  let order = [["updatedAt", "DESC"]];

  try {
    if (typeof search !== "string") {
      return res.status(400).json({
        message: "El parámetro de búsqueda no es válido. Debe ser una cadena.",
      });
    }

    const normalizedSearch = await normalize(search.toLowerCase());

    const keywords = normalizedSearch
      .split(/\s+/)
      .filter((keyword) => keyword.trim() !== "");

    const orConditions = keywords.map((keyword) => ({
      [Op.or]: [
        {
          "$inventoryModel.name$": {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          serialNumber: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          activo: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          comments: {
            [Op.like]: `%${keyword}%`,
          },
        },
        // literal(`JSON_EXTRACT(details, '$[*].key') LIKE '%${keyword}%'`),
        literal(`JSON_EXTRACT(details, '$[*].value') LIKE '%${keyword}%'`),
        {
          "$inventoryModel.inventoryBrand.name$": {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          "$inventoryModel.inventoryType.name$": {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    }));

    let whereClause = {
      [Op.and]: [
        // Otras condiciones AND que puedas tener
        {
          [Op.or]: orConditions,
        },
      ],
    };

    const { rows } = await Inventory.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      order: order,
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
    });

    res.json({
      inventories: rows,
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
