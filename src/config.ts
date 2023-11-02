require("dotenv").config();

export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_NAME = String(process.env.DB_NAME);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
export const DB_HOST = String(process.env.DB_HOST);
export const PORT = Number(process.env.PORT);
export const API_PORT = Number(process.env.API_PORT);
// export const CORS_URL = String(process.env.CORS_URL);

