import { EmployeeBasicDetails } from "./Employee_Basic_Details";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class EmployeeFamilyDetails extends Model {}

export const initEmployeeFamilyDetails = async (sequelize) => {
  EmployeeFamilyDetails.init(
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
      relationship: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      present_post_addr: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photopath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      active_inactive: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emp_dep_allergy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emp_dep_disease: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "emp_family_details",
      timestamps: true,
    }
  );
};
