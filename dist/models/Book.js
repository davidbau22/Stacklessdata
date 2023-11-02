"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBookModel = void 0;
const sequelize_1 = require("sequelize");
class Book extends sequelize_1.Model {
}
exports.default = Book;
const initBookModel = (sequelize) => {
    Book.init({
        bookUuid: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.Sequelize.literal("gen_random_uuid()"),
        },
        database_size: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        rows: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        tables: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        data_points: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: true,
    });
};
exports.initBookModel = initBookModel;
//# sourceMappingURL=Book.js.map