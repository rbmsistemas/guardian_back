import Sequelize from "sequelize";
import { config } from "dotenv";
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "../config.js";

config();

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});
