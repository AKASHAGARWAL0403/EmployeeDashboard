const { Model, DataTypes } = require("sequelize");

export class Faculty extends Model {}

export const initFaculty = async (sequelize) => {
  Faculty.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      sequelize,
      modelName: "faculty",
      timestamps: true,
    }
  );
};
