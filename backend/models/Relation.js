import { Employee } from './Employee';
import { Faculty } from './Faculty';
import { EmployeeEducationDetails } from  './Employee_Educational_Details';
import { EmployeeBasicDetails } from  './Employee_Basic_Details';
import { EmployeeFamilyDetails } from './Employee_Family_Details';
import { EmployeePayDetails } from './Employee_Pay_Details';
import { EmployeeLast5YrStayDetails } from './Employee_Last5YrStay_Details';
import { EmployeePrevExpDetails } from './Employee_Prev_Exp_Details';

export const addRelation = () => {
    Employee.belongsTo(Faculty , {
        foreignKey: {
            name : 'faculty_id',
            allowNull: false
        }
    });
    Faculty.hasMany(Employee , {
        foreignKey: {
            name : 'faculty_id',
            allowNull: false
        }
    });
    EmployeeEducationDetails.belongsTo(EmployeeBasicDetails, {
        foreignKey:{
            name: 'emp_no',
            allowNull: false
        }
    });
    EmployeeBasicDetails.hasOne(EmployeeEducationDetails, {
        foreignKey: {
            name: 'emp_no',
            allowNull: false
        }
    });

    EmployeeFamilyDetails.belongsTo(EmployeeBasicDetails, {
        foreignKey:{
            name: 'emp_no',
            allowNull: false
        }
    });
    EmployeeBasicDetails.hasOne(EmployeeFamilyDetails, {
        foreignKey: {
            name: 'emp_no',
            allowNull: false
        }
    });

    EmployeePayDetails.belongsTo(EmployeeBasicDetails, {
        foreignKey:{
            name: 'emp_no',
            allowNull: false
        }
    });
    EmployeeBasicDetails.hasOne(EmployeePayDetails, {
        foreignKey: {
            name: 'emp_no',
            allowNull: false
        }
    });

    EmployeeLast5YrStayDetails.belongsTo(EmployeeBasicDetails, {
        foreignKey:{
            name: 'emp_no',
            allowNull: false
        }
    });
    EmployeeBasicDetails.hasOne(EmployeeLast5YrStayDetails, {
        foreignKey: {
            name: 'emp_no',
            allowNull: false
        }
    });

    EmployeePrevExpDetails.belongsTo(EmployeeBasicDetails, {
        foreignKey:{
            name: 'emp_no',
            allowNull: false
        }
    });
    EmployeeBasicDetails.hasOne(EmployeePrevExpDetails, {
        foreignKey: {
            name: 'emp_no',
            allowNull: false
        }
    });
};
