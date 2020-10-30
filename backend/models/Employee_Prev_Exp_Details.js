import { EmployeeBasicDetails } from "./Employee_Basic_Details";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class EmployeePrevExpDetails extends Model {}

export const initEmployeePrevExpDetails = async (sequelize) => {
  EmployeePrevExpDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payscale: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "emp_prev_exp_details",
      timestamps: true,
    }
  );
};
