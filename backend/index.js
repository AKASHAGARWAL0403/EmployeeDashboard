import { Connect, getSequelize, syncDatabase } from "./db/ConnectDatabase";
import { initEmployeeBasicDetails } from './models/Employee_Basic_Details';
import { initEmployeeEducationDetails } from './models/Employee_Educational_Details';
import { initEmployeeFamilyDetails } from './models/Employee_Family_Details';
import { initEmployeePayDetails } from './models/Employee_Pay_Details';
import { initEmployeeLast5YrStayDetails } from './models/Employee_Last5YrStay_Details';
import { initEmployeePrevExpDetails } from './models/Employee_Prev_Exp_Details';
import express from "express";
import bodyParser from "body-parser";
import EmployeeBasicRouter from './api/EmployeeBasicDetails/router';

import { Database } from "./db/Database";
const cors = require("cors");

import { addRelation } from "./models/Relation";
(async () => {
  await Connect(() => {
    console.log("Connection Has been establshed");
  });

  const sequelize = getSequelize();
  Database.setSequelize(sequelize);

  await initEmployeeBasicDetails(sequelize);
  await initEmployeeEducationDetails(sequelize);
  await initEmployeeFamilyDetails(sequelize);
  await initEmployeePayDetails(sequelize);
  await initEmployeePrevExpDetails(sequelize);
  await initEmployeeLast5YrStayDetails(sequelize);
  addRelation();

  await syncDatabase();

  const app = express();

  app.use(bodyParser.json({ extended: false }));

  var corsOptions = {
    origin: "http://localhost:3000",
  };
  
  app.use(cors(corsOptions));

  app.use("/employeeBasic" , EmployeeBasicRouter);


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });


  

})();
