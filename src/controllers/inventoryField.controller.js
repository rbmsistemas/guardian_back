import db from "../models/index.js";
const { InventoryField } = db;

export const createInventoryField = async (req, res) => {
  try {
    const inventoryField = await InventoryField.create(req.body);
    return res.status(201).json(inventoryField);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllInventoryFields = async (req, res) => {
  try {
    const inventoryFields = await InventoryField.findAll();
    return res.status(200).json({ inventoryFields });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInventoryFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryField = await InventoryField.findOne({
      where: { id: id },
    });
    if (inventoryField) {
      return res.status(200).json(inventoryField);
    }
    return res
      .status(404)
      .send("InventoryField with the specified ID does not exists");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateInventoryField = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await InventoryField.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedInventoryField = await InventoryField.findOne({
        where: { id: id },
      });
      return res.status(200).json(updatedInventoryField);
    }
    throw new Error("InventoryField not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteInventoryField = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await InventoryField.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send("InventoryField deleted");
    }
    throw new Error("InventoryField not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
