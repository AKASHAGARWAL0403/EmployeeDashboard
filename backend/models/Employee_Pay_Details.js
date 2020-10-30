import { EmployeeBasicDetails } from "./Employee_Basic_Details";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class EmployeePayDetails extends Model {}

export const initEmployeePayDetails = async (sequelize) => {
  EmployeePayDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pay_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      basic_pay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "emp_pay_details",
      timestamps: true,
    }
  );
};
