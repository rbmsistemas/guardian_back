import db from "../models/index.js";
import { Op, literal, fn, col } from "sequelize";
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

const defaultFiles = [
  {
    title: "",
    description: "",
    file: {
      fileName: "",
      fileSize: "",
      fileType: "",
      filePath: "",
    },
  },
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
      recepcionDate: req.body.recepcionDate
        ? new Date(req.body.recepcionDate)
        : null,
      details: req.body.details ?? defaultDetails,
      files: req.body.files ?? defaultFiles,
      createdBy: user.userName,
    };

    const inventory = await Inventory.create(body);

    res.json({
      message: "Inventario creado correctamente",
      inventory: await Inventory.findOne({
        where: {
          id: inventory.id,
        },
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
      }),
      inventoryFields,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el inventorio",
      error: error?.errors[0]?.message ?? error,
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
            name: detail?.key,
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
      recepcionDate: req.body.recepcionDate
        ? parseAndValidateDate(req.body.recepcionDate)
        : null,
      details: req.body.details ?? defaultDetails,
      files: req.body.files ?? defaultFiles,
    };

    function parseAndValidateDate(dateString) {
      const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!regex.test(dateString)) {
        if (dateString === "") {
          return null;
        } else {
          return dateString;
        }
      }

      return new Date(dateString);
    }

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
        status: true,
      });
    } else {
      res.json({
        message: "Serial Number no existe",
        status: false,
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
      order: [["updatedAt", "DESC"]],
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
  const resultsPerPage = parseInt(quantityResults) ?? 10;

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
        literal(
          `LOWER(JSON_EXTRACT(details, '$[*].value')) LIKE LOWER('%${search}%')`
        ),
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

    const validOrderByValues = ["inventoryBrandId", "inventoryTypeId"];
    const orderByValue = validOrderByValues.includes(orderBy) ? orderBy : null;

    // Construir la ordenación
    let order = [];
    if (orderByValue && sort) {
      order.push([
        { model: InventoryModel, as: "inventoryModel" },
        {
          model:
            orderByValue === "inventoryBrandId"
              ? InventoryBrand
              : InventoryType,
          as:
            orderByValue === "inventoryBrandId"
              ? "inventoryBrand"
              : "inventoryType",
        },
        "name",
        sort.toUpperCase(),
      ]);
    } else if (orderBy === "inventoryModelId" && sort) {
      order.push([
        { model: InventoryModel, as: "inventoryModel" },
        "name",
        sort.toUpperCase(),
      ]);
    } else if (orderBy && sort) {
      order.push([orderBy, sort.toUpperCase()]);
    } else {
      order.push(["updatedAt", "DESC"]);
    }

    const { count, rows } = await Inventory.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      offset: (page - 1) * resultsPerPage,
      order,
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

    const totalPages = Math.ceil(count / resultsPerPage);
    const totalEntries = count;

    let formatedInventories = [];
    for (let i = 0; i < rows.length; i++) {
      const inventory = rows[i];
      const inventoryModel = inventory.inventoryModel;
      const inventoryBrand = inventoryModel.inventoryBrand;
      const inventoryType = inventoryModel.inventoryType;
      const inventoryDetails = inventory.details;
      const inventoryFiles = inventory.files;
      const inventoryCreatedBy = inventory.createdBy;
      const inventoryCreatedAt = inventory.createdAt;
      const inventoryUpdatedAt = inventory.updatedAt;

      formatedInventories.push({
        id: inventory.id,
        tipo: inventoryType.name,
        marca: inventoryBrand.name,
        modelo: inventoryModel.name,
        sn: inventory.serialNumber,
        activo: inventory.activo,
        status: inventory.status,
        "fecha Alta": inventory.altaDate,
        "fecha Baja": inventory.bajaDate,
        "fecha Recepcion": inventory.recepcionDate,
        detalles: inventoryDetails,
        archivos: inventoryFiles ?? [defaultFiles],
        comentarios: inventory.comments,
        "creado cor": inventoryCreatedBy,
        "fecha creacion": inventoryCreatedAt,
        "fecha actualizacion": inventoryUpdatedAt,
        imagenes: inventory.images ?? [],
      });
    }

    res.json({
      inventories: formatedInventories,
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
  const { search, advancedSearch } = req.body;
  const resultsPerPage = 50;
  let order = [["updatedAt", "DESC"]];

  try {
    if (typeof search !== "string") {
      return res.status(400).json({
        message: "El parámetro de búsqueda no es válido. Debe ser una cadena.",
      });
    }

    // const normalizedSearch = encodeURIComponent(search.toLowerCase());
    const normalizedSearch = await normalize(search.toLowerCase());

    const keywords = normalizedSearch
      .split(/\s+/)
      .filter((keyword) => keyword.trim() !== "");

    let advancedResults = [];

    let whereClause = {
      [Op.or]: [
        {
          "$inventoryModel.name$": {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          serialNumber: {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          activo: {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          comments: {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          details: {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          createdBy: {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          "$inventoryModel.inventoryBrand.name$": {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          "$inventoryModel.inventoryType.name$": {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        {
          createdBy: {
            [Op.like]: `%${normalizedSearch}%`,
          },
        },
        literal(
          `LOWER(JSON_EXTRACT(details, '$[*].value')) LIKE LOWER('%${normalizedSearch}%')`
        ),
        literal(
          `DATE_FORMAT(altaDate, '%d/%m/%Y') LIKE '%${normalizedSearch}%'`
        ),
        literal(
          `DATE_FORMAT(bajaDate, '%d/%m/%Y') LIKE '%${normalizedSearch}%'`
        ),
        literal(
          `DATE_FORMAT(recepcionDate, '%d/%m/%Y') LIKE '%${normalizedSearch}%'`
        ),
      ],
    };

    const { rows } = await Inventory.findAndCountAll({
      where: whereClause,
      order: order,
      limit: resultsPerPage,
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

    if (advancedSearch) {
      const idsToExclude = new Set(rows?.map((result) => result.id));

      for (const keyword of keywords) {
        const orConditions = [
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
          {
            details: {
              [Op.like]: `%${keyword}%`,
            },
          },
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
          {
            createdBy: {
              [Op.like]: `%${keyword}%`,
            },
          },
          literal(
            `LOWER(JSON_EXTRACT(details, '$[*].value')) LIKE LOWER('%${keyword}%')`
          ),
          literal(`DATE_FORMAT(altaDate, '%d/%m/%Y') LIKE '%${keyword}%'`),
          literal(`DATE_FORMAT(bajaDate, '%d/%m/%Y') LIKE '%${keyword}%'`),
          literal(`DATE_FORMAT(recepcionDate, '%d/%m/%Y') LIKE '%${keyword}%'`),
        ];

        orConditions.push({
          id: {
            [Op.notIn]: idsToExclude,
          },
        });

        const whereClause = {
          [Op.or]: orConditions,
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

        advancedResults.push(...rows);
      }

      advancedResults = advancedResults.filter(
        (result) => !idsToExclude.has(result.id)
      );
    }

    const results = [...rows, ...advancedResults];

    res.json({
      inventories: advancedResults ? results : rows,
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

export const getInventoryGroups = async (req, res) => {
  const { name, type } = req.body;

  try {
    let whereClause = {};
    if (name) {
      if (typeof name !== "string") {
        return res.status(400).json({
          message:
            "El parámetro de búsqueda no es válido. Debe ser una cadena.",
        });
      }

      const lowerCaseName = name.toLowerCase();

      whereClause = {
        [Op.and]: [
          literal(
            `LOWER(JSON_EXTRACT(details, '$[*].value')) LIKE LOWER('%${lowerCaseName}%')`
          ),
        ],
        ...whereClause,
      };
    }
    if (type) {
      if (typeof type !== "string") {
        return res.status(400).json({
          message: "El parámetro de llave no es válido. Debe ser una cadena.",
        });
      }
      const lowerCaseType = type.toLowerCase();
      whereClause = {
        [Op.and]: [
          literal(
            `LOWER(JSON_EXTRACT(details, '$[*].key')) LIKE LOWER('%${lowerCaseType}%')`
          ),
        ],
        ...whereClause,
      };
    }

    const { rows } = await Inventory.findAndCountAll({
      where: whereClause,
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
      order: [["updatedAt", "DESC"]],
    });

    res.json({
      inventoryGroups: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los detalles del inventario",
      error,
    });
  }
};

// una peticion para conocer los modelos con mas stock por marca o tipo
export const getInventoryModelsWithMostStock = async (req, res) => {
  try {
    let whereClause = {};
    // add where clausule for status 0
    whereClause = {
      ...whereClause,
      status: "1",
    };

    const { rows } = await Inventory.findAndCountAll({
      where: whereClause,
      attributes: [
        "inventoryModelId",
        [fn("COUNT", col("inventoryModelId")), "count"],
      ],
      group: ["inventoryModelId"],
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
      order: [[literal("count"), "DESC"]],
      limit: 10,
    });
    res.json({
      inventories: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los detalles del inventario",
      error,
    });
  }
};
