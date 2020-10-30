import { EmployeeBasicDetails } from "./Employee_Basic_Details";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class EmployeeLast5YrStayDetails extends Model {}

export const initEmployeeLast5YrStayDetails = async (sequelize) => {
    EmployeeLast5YrStayDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      res_addr: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dist_hq_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "emp_last5yrstay_details",
      timestamps: true,
    }
  );
};
