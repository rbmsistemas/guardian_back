// connection with mysql2

import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { DB_HOST } from "./config";

dotenv.config();

const connection = mysql.createPool({
  host: DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default connection;
