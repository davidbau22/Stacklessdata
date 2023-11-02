"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const snowflake_sdk_1 = __importDefault(require("snowflake-sdk"));
const connection = snowflake_sdk_1.default.createConnection({
    account: `${process.env.account}`,
    username: `${process.env.userName}`,
    password: `${process.env.password}`,
    database: `${process.env.database}`,
    warehouse: `${process.env.warehouse}`,
    schema: `${process.env.schema}`,
});
connection.connect((err, conn) => {
    if (err) {
        console.error(`No se puede conectar: ${err.message}`);
    }
    else {
        console.log('Conexión exitosa a Snowflake.');
        const connection_ID = conn.getId();
        // Ejecuta una consulta simple
        conn.execute({
            sqlText: 'SELECT CURRENT_VERSION()',
            complete: (err, stmt, rows) => {
                if (err) {
                    console.error(`Error al ejecutar la consulta: ${err.message}`);
                }
                else {
                    if (rows && rows.length > 0) {
                        console.log('La versión actual de Snowflake es: ', rows[0]);
                    }
                    else {
                        console.log('No se devolvieron filas.');
                    }
                }
            }
        });
    }
});
//# sourceMappingURL=snowflakeConnection.js.map