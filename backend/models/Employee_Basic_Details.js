const { Model, DataTypes, Deferrable } = require("sequelize");

export class EmployeeBasicDetails extends Model {}

export const initEmployeeBasicDetails = async (sequelize) => {
  EmployeeBasicDetails.init(
    {
      emp_no: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      auth_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      office_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      retirement_ext: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      retirement_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      employment_nature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "emp_basic_details",
      timestamps: true,
    }
  );
};
