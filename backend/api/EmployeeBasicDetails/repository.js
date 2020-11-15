import { EmployeeBasicDetails } from "../../models/Employee_Basic_Details";
import { EmployeeFamilyDetails } from "../../models/Employee_Family_Details";
import { Sequelize } from "sequelize";
import { EmployeeEducationDetails } from "../../models/Employee_Educational_Details";
import { EmployeePayDetails } from "../../models/Employee_Pay_Details";
import { EmployeePrevExpDetails } from "../../models/Employee_Prev_Exp_Details";
import { EmployeeLast5YrStayDetails } from "../../models/Employee_Last5YrStay_Details";
import colName from "../../data/staticData";
import { getAuthRight } from "../../data/employeeAuth";
const Op = Sequelize.Op;
const excel = require("exceljs");

exports.findByEmplId = (req, res) => {
  const id = req.body.id;
  const designation = req.body.designation;
  var authRightMapping = getAuthRight(designation);
  var condition = id ? { emp_no: { [Op.like]: `%${id}%` } } : null;
  if (authRightMapping[0] == false) res.send([]);
  var allPosibleDataCategory = [
    EmployeeEducationDetails,
    EmployeeFamilyDetails,
    EmployeeLast5YrStayDetails,
    EmployeePayDetails,
    EmployeePrevExpDetails,
  ];
  var iclArr = [];
  for (var i = 0; i < 5; i++) {
    if (authRightMapping[i + 1] == true) {
      iclArr.push(allPosibleDataCategory[i]);
    }
  }
  EmployeeBasicDetails.findAll({
    where: condition,
    include: iclArr,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

exports.downloadAllByEmpId = (req, res) => {
  const id = req.body.id;
  const designation = req.body.designation;
  var authRightMapping = getAuthRight(designation);
  var condition = id ? { emp_no: { [Op.like]: `%${id}%` } } : null;
  var allPosibleDataCategory = [
    EmployeeEducationDetails,
    EmployeeFamilyDetails,
    EmployeeLast5YrStayDetails,
    EmployeePayDetails,
    EmployeePrevExpDetails,
  ];
  var iclArr = [];
  for (var i = 0; i < 5; i++) {
    if (authRightMapping[i + 1] == true) {
      iclArr.push(allPosibleDataCategory[i]);
    }
  }
  console.log(iclArr);
  EmployeeBasicDetails.findAll({
    where: condition,
    include: iclArr,
  })
    .then((data) => {
      console.log(data);
      const workbook = excelMakerEx(data);
      if (data != undefined) {
        let basicDetailsWorksheet = workbook.getWorksheet("Basic Details");
        basicDetailsWorksheet.addRows(data);
      }
      if (data.length != 0 && data[0].emp_family_detail != undefined) {
        let familylDetailsWorksheet = workbook.getWorksheet("Family Details");
        familylDetailsWorksheet.addRows(
          getDataFromResponse(data, "emp_family_detail")
        );
      }
      if (data.length != 0 && data[0].emp_education_detail != undefined) {
        let educationalDetailsWorksheet = workbook.getWorksheet(
          "Educational Details"
        );
        educationalDetailsWorksheet.addRows(
          getDataFromResponse(data, "emp_education_detail")
        );
      }
      if (data.length != 0 && data[0].emp_last5yrstay_detail != undefined) {
        let last5YrStayDetailWorksheet = workbook.getWorksheet(
          "Last 5 Year Stay"
        );
        last5YrStayDetailWorksheet.addRows(
          getDataFromResponse(data, "emp_last5yrstay_detail")
        );
      }
      if (data.length == 0 || data[0].emp_pay_detail != undefined) {
        let payDetailWorksheet = workbook.getWorksheet("Pay Detail");
        payDetailWorksheet.addRows(getDataFromResponse(data, "emp_pay_detail"));
      }
      if (data.length == 0 || data[0].emp_prev_exp_detail != undefined) {
        let prevExpDetailWorksheet = workbook.getWorksheet(
          "Prev Experience Detail"
        );
        prevExpDetailWorksheet.addRows(
          getDataFromResponse(data, "emp_prev_exp_detail")
        );
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "tutorials.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

exports.downloadOneByEmpId = (req, res) => {
  const id = req.body.id;
  const designation = req.body.designation;
  var authRightMapping = getAuthRight(designation);
  var condition = id ? { emp_no: id } : null;
  var allPosibleDataCategory = [
    EmployeeEducationDetails,
    EmployeeFamilyDetails,
    EmployeeLast5YrStayDetails,
    EmployeePayDetails,
    EmployeePrevExpDetails,
  ];
  var iclArr = [];
  for (var i = 0; i < 5; i++) {
    if (authRightMapping[i + 1] == true) {
      iclArr.push(allPosibleDataCategory[i]);
    }
  }
  EmployeeBasicDetails.findAll({
    where: condition,
    include: iclArr,
  })
    .then((data) => {
      const workbook = excelMakerEx(data);
      if (data != undefined) {
        let basicDetailsWorksheet = workbook.getWorksheet("Basic Details");
        basicDetailsWorksheet.addRows(data);
      }
      if (data.length != 0 && data[0].emp_family_detail != undefined) {
        let familylDetailsWorksheet = workbook.getWorksheet("Family Details");
        familylDetailsWorksheet.addRows(
          getDataFromResponse(data, "emp_family_detail")
        );
      }
      if (data.length != 0 && data[0].emp_education_detail != undefined) {
        let educationalDetailsWorksheet = workbook.getWorksheet(
          "Educational Details"
        );
        educationalDetailsWorksheet.addRows(
          getDataFromResponse(data, "emp_education_detail")
        );
      }
      if (data.length == 0 || data[0].emp_last5yrstay_detail != undefined) {
        let last5YrStayDetailWorksheet = workbook.getWorksheet(
          "Last 5 Year Stay"
        );
        last5YrStayDetailWorksheet.addRows(
          getDataFromResponse(data, "emp_last5yrstay_detail")
        );
      }
      if (data.length == 0 || data[0].emp_pay_detail != undefined) {
        let payDetailWorksheet = workbook.getWorksheet("Pay Detail");
        payDetailWorksheet.addRows(getDataFromResponse(data, "emp_pay_detail"));
      }
      if (data.length == 0 || data[0].emp_prev_exp_detail != undefined) {
        let prevExpDetailWorksheet = workbook.getWorksheet(
          "Prev Experience Detail"
        );
        prevExpDetailWorksheet.addRows(
          getDataFromResponse(data, "emp_prev_exp_detail")
        );
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "tutorials.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

exports.findDesignationByEmpId = (req , res) => {
  const id = req.body.id;
  const password = req.body.password;
  EmployeeBasicDetails.findOne({
    where: {emp_no : id},
  })
    .then((data) => {
      console.log(data);
      var obj = {
        designation : '',
        exist : false,
        password : false
      };
      if(data != null && data.password == password){
        obj['designation'] = data.designation;
        obj['exist'] = true;
        obj['password'] = true;
      }
      else if(data != null){
        obj['exist'] = true;
        obj['password'] = false;
      }
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
}

const makeTableStructure = () => {
  var tableStructure = [];
  var heading = [];
  heading.push({
    text: "Basic Details",
    style: "tableHeader",
    colSpan: 9,
    alignment: "center",
  });
  for (var i = 0; i < 8; i++) {
    heading.push({});
  }
  heading.push({
    text: "Educational Details",
    style: "tableHeader",
    colSpan: 6,
    alignment: "center",
  });
  for (var i = 0; i < 5; i++) {
    heading.push({});
  }
  heading.push({
    text: "Family Details",
    style: "tableHeader",
    colSpan: 9,
    alignment: "center",
  });
  for (var i = 0; i < 8; i++) {
    heading.push({});
  }
  heading.push({
    text: "Last 5 Year Stay Details",
    style: "tableHeader",
    colSpan: 4,
    alignment: "center",
  });
  for (var i = 0; i < 3; i++) {
    heading.push({});
  }
  heading.push({
    text: "Pay Details",
    style: "tableHeader",
    colSpan: 2,
    alignment: "center",
  });
  for (var i = 0; i < 1; i++) {
    heading.push({});
  }
  heading.push({
    text: "Previous Experience Details",
    style: "tableHeader",
    colSpan: 6,
    alignment: "center",
  });
  for (var i = 0; i < 5; i++) {
    heading.push({});
  }

  var subHeading = [];
  colName.forEach((name) => {
    var subHeadingSample = {
      text: "",
      style: "tableHeader",
      alignment: "center",
    };
    subHeadingSample["text"] = name;
    subHeading.push(subHeadingSample);
  });

  tableStructure.push(heading);
  tableStructure.push(subHeading);
  return tableStructure;
};

const getDataFromResponse = (res, name) => {
  let data = [];
  res.forEach((row) => {
    data.push(row[name].dataValues);
  });
  return data;
};

const excelMakerEx = (data) => {
  let workbook = new excel.Workbook();

  if (data != undefined) {
    let basicDetailsWorksheet = workbook.addWorksheet("Basic Details");
    let basicDetailsWorksheetColumns = [];
    colName.basicDetailsColName.forEach((col) => {
      var colStructure = { header: "", key: "", width: 20 };
      colStructure["header"] = col[0];
      colStructure["key"] = col[1];
      basicDetailsWorksheetColumns.push(colStructure);
    });
    basicDetailsWorksheet.columns = basicDetailsWorksheetColumns;
  }

  if (data.length == 0 || data[0].emp_education_detail != undefined) {
    let educationalDetailsWorksheet = workbook.addWorksheet("Educational Details");
    let educationalDetailsWorksheetColumns = [];
    colName.educationalDetailsColName.forEach((col) => {
      var colStructure = { header: "", key: "", width: 20 };
      colStructure["header"] = col[0];
      colStructure["key"] = col[1];
      educationalDetailsWorksheetColumns.push(colStructure);
    });
    educationalDetailsWorksheet.columns = educationalDetailsWorksheetColumns;
  }
  
  if (data.length == 0 || data[0].emp_family_detail != undefined) {
    let familylDetailsWorksheet = workbook.addWorksheet("Family Details");
    let familyDetailsWorksheetColumns = [];
    colName.familyDetailsColName.forEach((col) => {
      var colStructure = { header: "", key: "", width: 20 };
      colStructure["header"] = col[0];
      colStructure["key"] = col[1];
      familyDetailsWorksheetColumns.push(colStructure);
    });
    familylDetailsWorksheet.columns = familyDetailsWorksheetColumns;
  }

  if (data.length == 0 || data[0].emp_last5yrstay_detail != undefined) {
    let last5YrStayDetailWorksheet = workbook.addWorksheet("Last 5 Year Stay");
    let last5YrStayDetailsWorksheetColumns = [];
    colName.last5YrStayDetailColName.forEach((col) => {
      var colStructure = { header: "", key: "", width: 20 };
      colStructure["header"] = col[0];
      colStructure["key"] = col[1];
      last5YrStayDetailsWorksheetColumns.push(colStructure);
    });
    last5YrStayDetailWorksheet.columns = last5YrStayDetailsWorksheetColumns;
  
  }

  if (data.length == 0 || data[0].emp_pay_detail != undefined) {
    let payDetailWorksheet = workbook.addWorksheet("Pay Detail");
    let payDetailsWorksheetColumns = [];
    colName.payDetailsColName.forEach((col) => {
      var colStructure = { header: "", key: "", width: 20 };
      colStructure["header"] = col[0];
      colStructure["key"] = col[1];
      payDetailsWorksheetColumns.push(colStructure);
    });
    payDetailWorksheet.columns = payDetailsWorksheetColumns;
  }
  
  if (data.length == 0 || data[0].emp_prev_exp_detail != undefined) {
    let prevExpDetailWorksheet = workbook.addWorksheet("Prev Experience Detail");
    let prevExpDetailsWorksheetColumns = [];
    colName.prevExpDetailsColName.forEach((col) => {
      var colStructure = { header: "", key: "", width: 20 };
      colStructure["header"] = col[0];
      colStructure["key"] = col[1];
      prevExpDetailsWorksheetColumns.push(colStructure);
    });
    prevExpDetailWorksheet.columns = prevExpDetailsWorksheetColumns;
  }

  return workbook;
};
