"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const sequelize_1 = require("sequelize");
const DATABASE_URL = `postgresql://${config_1.DB_USER}:${config_1.DB_PASSWORD}@${config_1.DB_HOST}:${config_1.PORT}/${config_1.DB_NAME}`;
console.log(DATABASE_URL);
const objectSequelize = {
    logging: false,
    native: false,
};
//*both ways works the connection
// export default new Sequelize({
//   dialect: "postgres",
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_NAME,
//   username: DB_USER,
//   password: DB_PASSWORD,
// });
exports.default = new sequelize_1.Sequelize(DATABASE_URL, objectSequelize);
//# sourceMappingURL=database.js.map