import { Model, Sequelize, DataTypes } from "sequelize";
export default class Book extends Model {
  public bookUuid?: string;
  public database_size?: number;
  public rows?: number;
  public tables?: number;
  public data_points?: number;
}
export const initBookModel = (sequelize: Sequelize) => {
  Book.init(
    {
      bookUuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      database_size: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rows: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tables: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      data_points: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      
    },
    {
      sequelize,
      timestamps: true,
    }
  );
};
