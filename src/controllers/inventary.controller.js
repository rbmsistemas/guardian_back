import db from "../models/index.js";
import { Op } from "sequelize";

const Inventary = db.Inventary;
const InventaryType = db.InventaryTypes;
const InventaryBrand = db.InventaryBrands;
const InventaryModels = db.InventaryModels;

export const createInventary = async (req, res) => {
  try {
    if (
      req.body.inventaryTypeId === "0" &&
      (await InventaryType.findOne({
        where: { name: req.body.otherInventary },
      })) === null
    ) {
      const inventaryType = await InventaryType.create({
        name: req.body.otherInventary,
      });
      req.body.inventaryTypeId = inventaryType.id;
    }
    if (
      req.body.inventaryBrandId === "0" &&
      (await InventaryBrand.findOne({
        where: { name: req.body.otherBrand },
      })) === null
    ) {
      const inventaryBrand = await InventaryBrand.create({
        name: req.body.otherBrand,
        inventaryTypeId: req.body.inventaryTypeId,
      });
      req.body.inventaryBrandId = inventaryBrand.id;
    }
    if (
      req.body.inventaryModelId === "0" &&
      (await InventaryModels.findOne({
        where: { name: req.body.otherModel },
      })) === null
    ) {
      const inventaryModel = await InventaryModels.create({
        name: req.body.otherModel,
        inventaryTypeId: req.body.inventaryTypeId,
      });
      req.body.inventaryModelId = inventaryModel.id;
    }

    const inventary = await Inventary.create(req.body);
    res.json({
      message: "Inventario creado correctamente",
      inventary,
    });
  } catch (error) {
    // console.log(error.errors[0].message);
    console.log(error);
    res.status(500).json({
      message: "Error al crear el inventario",
      error: error.errors[0].message,
    });
  }
};

export const getValidateSerialNumber = async (req, res) => {
  const { serialNumber, currentId } = req.body;
  try {
    const inventary = await Inventary.findOne({
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

    if (inventary) {
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
      message: "Error al obtener el inventario",
      error,
    });
  }
};
export const getValidateActivo = async (req, res) => {
  const { activo, currentId } = req.body;
  try {
    const inventary = await Inventary.findOne({
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

    if (inventary) {
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

export const getInventarys = async (req, res) => {
  try {
    const inventarys = await Inventary.findAll({
      include: [
        {
          model: InventaryModels,
          as: "inventaryModel",
        },
      ],
      order: [["updatedAt", "ASC"]],
    });
    res.json({
      inventarys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los inventarios",
      error,
    });
  }
};

export const updateInventaryById = async (req, res) => {
  try {
    console.log(req.body);
    await Inventary.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Inventario actualizado correctamente",
      inventary: await Inventary.findOne({
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

export const deleteInventaryById = async (req, res) => {
  try {
    await Inventary.destroy({
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

export const getInventaryById = async (req, res) => {
  try {
    const inventary = await Inventary.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      inventary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};

export const getInventariesByParams = async (req, res) => {
  const { search, brandType, inventaryType, status, page, quantityResults } =
    req.body;
  const resultsPerPage = parseInt(quantityResults) || 5;

  try {
    let whereClause = {
      [Op.or]: [
        {
          "$inventaryModel.name$": {
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
      whereClause = { ...whereClause, inventaryBrandId: brandType };
    }

    if (inventaryType) {
      whereClause = { ...whereClause, inventaryTypeId: inventaryType };
    }

    const { count, rows } = await Inventary.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      offset: (page - 1) * resultsPerPage,
      order: [["updatedAt", "ASC"]],
      include: [
        {
          model: InventaryModels,
          as: "inventaryModel",
        },
      ],
    });

    const totalPages = Math.ceil(count / resultsPerPage);
    const totalEntries = count;

    res.json({
      inventaries: rows,
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

export const getInventaryByTypeId = async (req, res) => {
  try {
    const inventary = await Inventary.findAll({
      where: {
        inventaryTypeId: req.params.id,
      },
    });
    res.json({
      inventary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener el inventario",
      error,
    });
  }
};
