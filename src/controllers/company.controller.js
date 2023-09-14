import db from "../models/index.js";
import { Op } from "sequelize";

const Company = db.Company;

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.json({
      message: "Compañia creado correctamente",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear la Compañia",
      error,
    });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json({
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las Compañias",
      error,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener la Compañia",
      error,
    });
  }
};

export const updateCompanyById = async (req, res) => {
  try {
    await Company.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Compañia actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar la Compañia",
      error,
    });
  }
};

export const deleteCompanyById = async (req, res) => {
  try {
    await Company.destroy({
      where: {
        id: req.params.id,
      },
    });

    const companies = await Company.findAll();
    res.json({
      message: "Compañia eliminada correctamente",
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al eliminar la Compañia",
      error,
    });
  }
};

export const getCompaniesByParams = async (req, res) => {
  const { search, status, page, quantityResults } = req.body;
  const resultsPerPage = parseInt(quantityResults) || 5;

  try {
    let whereClause = {
      [Op.or]: [
        {
          company: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          encargado: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    };

    if (status) {
      whereClause = { ...whereClause, status: status };
    }

    const { count, rows } = await Company.findAndCountAll({
      where: whereClause,
      limit: resultsPerPage,
      offset: (page - 1) * resultsPerPage,
    });

    const totalPages = Math.ceil(count / resultsPerPage);
    const totalEntries = count;

    res.json({
      companies: rows,
      totalPages,
      totalEntries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener las Compañias",
      error,
    });
  }
};
