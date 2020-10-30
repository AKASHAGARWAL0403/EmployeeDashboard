import { Faculty } from "./Faculty";

const { Model, DataTypes, Deferrable } = require("sequelize");

export class Employee extends Model {}

export const initEmployee = async (sequelize) => {
  Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          external_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          gender: {
            type: DataTypes.ENUM({
                values: ['male' , 'female']
            }),
            allowNull: false,
            defaultValue: 'male'
          },
          age: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          category: {
            type: DataTypes.ENUM({
                values: ['GEN' , 'OBC' , 'SC' , 'ST']
            }),
            allowNull: false,
            defaultValue: 'GEN'
          },
          designation: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          blood_group: {
            type: DataTypes.ENUM({
                values: ['A+' , 'A-' , 'B+' , 'B-' , 'O+' , 'O-' , 'AB+' , 'AB-']
            }),
            allowNull: false,
          },
          joining_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          retire_date: {
            type: DataTypes.DATE,
            allowNull: false,
          }
    },
    {
        sequelize,
        modelName: "employee",
        timestamps: true,
      }
  );
};
