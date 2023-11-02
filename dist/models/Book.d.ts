import { Model, Sequelize } from "sequelize";
export default class Book extends Model {
    bookUuid?: string;
    database_size?: number;
    rows?: number;
    tables?: number;
    data_points?: number;
}
export declare const initBookModel: (sequelize: Sequelize) => void;
