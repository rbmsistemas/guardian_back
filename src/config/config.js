import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "../config.js";
import { config } from "dotenv";
config();

const development = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  dialect: "mysql",
};
const production = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  dialect: "mysql",
};

export default { development, production };
