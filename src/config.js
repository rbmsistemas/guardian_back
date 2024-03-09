import { config } from "dotenv";

config();

export const PORT = process.env.PORT ?? 4000;
export const DB_HOST = process.env.DB_HOST ?? "127.0.0.1";
export const DB_PORT = process.env.DB_PORT ?? 3306;
export const DB_NAME = process.env.DB_NAME ?? "guardian_db";
export const DB_USER = process.env.DB_USER ?? "guardian_user";
export const DB_PASS = process.env.DB_PASS ?? "guardian_pass";

export const SECRET = "guardian-user-auth-token";
