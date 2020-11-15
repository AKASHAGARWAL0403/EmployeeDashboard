import { EmployeeBasicDetails } from "./Employee_Basic_Details";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class EmployeeEducationDetails extends Model {}

export const initEmployeeEducationDetails = async (sequelize) => {
  EmployeeEducationDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      exam: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institute: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "emp_education_details",
      timestamps: true,
    }
  );
};
