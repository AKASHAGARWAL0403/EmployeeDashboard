import { EmployeeBasicDetails } from "../../models/Employee_Basic_Details";
import { EmployeeFamilyDetails } from "../../models/Employee_Family_Details";
import { Sequelize } from "sequelize";
import { EmployeeEducationDetails } from "../../models/Employee_Educational_Details";
import { EmployeePayDetails } from "../../models/Employee_Pay_Details";
import { EmployeePrevExpDetails } from "../../models/Employee_Prev_Exp_Details";
import { EmployeeLast5YrStayDetails } from "../../models/Employee_Last5YrStay_Details";
import colName from "../../data/staticData";
const Op = Sequelize.Op;
const excel = require("exceljs");

exports.findByEmplId = (req, res) => {
  const id = req.body.id;
  var condition = id ? { emp_no: { [Op.like]: `%${id}%` } } : null;
  var iclArr = [
    EmployeeEducationDetails,
    EmployeeFamilyDetails,
    EmployeeLast5YrStayDetails,
    EmployeePayDetails,
    EmployeePrevExpDetails,
  ];
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
  var condition = id ? { emp_no: { [Op.like]: `%${id}%` } } : null;
  var iclArr = [
    EmployeeEducationDetails,
    EmployeeFamilyDetails,
    EmployeeLast5YrStayDetails,
    EmployeePayDetails,
    EmployeePrevExpDetails,
  ];
  EmployeeBasicDetails.findAll({
    where: condition,
    include: iclArr,
  })
    .then((data) => {
      const workbook = excelMakerEx();
      let basicDetailsWorksheet = workbook.getWorksheet("Basic Details");
      let educationalDetailsWorksheet = workbook.getWorksheet("Educational Details");
      let familylDetailsWorksheet = workbook.getWorksheet("Family Details");
      let last5YrStayDetailWorksheet = workbook.getWorksheet("Last 5 Year Stay");
      let payDetailWorksheet = workbook.getWorksheet("Pay Detail");
      let prevExpDetailWorksheet = workbook.getWorksheet("Prev Experience Detail");
      
      basicDetailsWorksheet.addRows(data);
      educationalDetailsWorksheet.addRows(getDataFromResponse(data , 'emp_education_detail'));
      familylDetailsWorksheet.addRows(getDataFromResponse(data , 'emp_family_detail'));
      last5YrStayDetailWorksheet.addRows(getDataFromResponse(data , 'emp_last5yrstay_detail'));
      payDetailWorksheet.addRows(getDataFromResponse(data , 'emp_pay_detail'));
      prevExpDetailWorksheet.addRows(getDataFromResponse(data , 'emp_prev_exp_detail'));

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
  var condition = id ? { emp_no: id }  : null;
  var iclArr = [
    EmployeeEducationDetails,
    EmployeeFamilyDetails,
    EmployeeLast5YrStayDetails,
    EmployeePayDetails,
    EmployeePrevExpDetails,
  ];
  EmployeeBasicDetails.findAll({
    where: condition,
    include: iclArr,
  })
    .then((data) => {
      const workbook = excelMakerEx();
      let basicDetailsWorksheet = workbook.getWorksheet("Basic Details");
      let educationalDetailsWorksheet = workbook.getWorksheet("Educational Details");
      let familylDetailsWorksheet = workbook.getWorksheet("Family Details");
      let last5YrStayDetailWorksheet = workbook.getWorksheet("Last 5 Year Stay");
      let payDetailWorksheet = workbook.getWorksheet("Pay Detail");
      let prevExpDetailWorksheet = workbook.getWorksheet("Prev Experience Detail");
      
      basicDetailsWorksheet.addRows(data);
      educationalDetailsWorksheet.addRows(getDataFromResponse(data , 'emp_education_detail'));
      familylDetailsWorksheet.addRows(getDataFromResponse(data , 'emp_family_detail'));
      last5YrStayDetailWorksheet.addRows(getDataFromResponse(data , 'emp_last5yrstay_detail'));
      payDetailWorksheet.addRows(getDataFromResponse(data , 'emp_pay_detail'));
      prevExpDetailWorksheet.addRows(getDataFromResponse(data , 'emp_prev_exp_detail'));

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

const getDataFromResponse = (res , name) => {
  let data = [];
  res.forEach(row => {
    data.push(row[name].dataValues);
  })
  return data;
}

const excelMakerEx = () => {
  let workbook = new excel.Workbook();
  let basicDetailsWorksheet = workbook.addWorksheet("Basic Details");
  let educationalDetailsWorksheet = workbook.addWorksheet("Educational Details");
  let familylDetailsWorksheet = workbook.addWorksheet("Family Details");
  let last5YrStayDetailWorksheet = workbook.addWorksheet("Last 5 Year Stay");
  let payDetailWorksheet = workbook.addWorksheet("Pay Detail");
  let prevExpDetailWorksheet = workbook.addWorksheet("Prev Experience Detail");

  let basicDetailsWorksheetColumns = [];
  colName.basicDetailsColName.forEach(col => {
    var colStructure = { header: "" , key: "" , width: 20 };
    colStructure['header'] = col[0];
    colStructure['key'] = col[1];
    basicDetailsWorksheetColumns.push(colStructure);
  })
  basicDetailsWorksheet.columns = basicDetailsWorksheetColumns;

  let educationalDetailsWorksheetColumns = [];
  colName.educationalDetailsColName.forEach(col => {
    var colStructure = { header: "" , key: "" , width: 20 };
    colStructure['header'] = col[0];
    colStructure['key'] = col[1];
    educationalDetailsWorksheetColumns.push(colStructure);
  })
  educationalDetailsWorksheet.columns = educationalDetailsWorksheetColumns;

  let familyDetailsWorksheetColumns = [];
  colName.familyDetailsColName.forEach(col => {
    var colStructure = { header: "" , key: "" , width: 20 };
    colStructure['header'] = col[0];
    colStructure['key'] = col[1];
    familyDetailsWorksheetColumns.push(colStructure);
  })
  familylDetailsWorksheet.columns = familyDetailsWorksheetColumns;

  let last5YrStayDetailsWorksheetColumns = [];
  colName.last5YrStayDetailColName.forEach(col => {
    var colStructure = { header: "" , key: "" , width: 20 };
    colStructure['header'] = col[0];
    colStructure['key'] = col[1];
    last5YrStayDetailsWorksheetColumns.push(colStructure);
  })
  last5YrStayDetailWorksheet.columns = last5YrStayDetailsWorksheetColumns;

  let payDetailsWorksheetColumns = [];
  colName.payDetailsColName.forEach(col => {
    var colStructure = { header: "" , key: "" , width: 20 };
    colStructure['header'] = col[0];
    colStructure['key'] = col[1];
    payDetailsWorksheetColumns.push(colStructure);
  })
  payDetailWorksheet.columns = payDetailsWorksheetColumns;

  let prevExpDetailsWorksheetColumns = [];
  colName.prevExpDetailsColName.forEach(col => {
    var colStructure = { header: "" , key: "" , width: 20 };
    colStructure['header'] = col[0];
    colStructure['key'] = col[1];
    prevExpDetailsWorksheetColumns.push(colStructure);
  })
  prevExpDetailWorksheet.columns = prevExpDetailsWorksheetColumns;

  return workbook;
  // basicDetailsWorksheet.columns = [
  //   { header: "Emp No" , key: "id" , width: 5 },
  //   { header: "Title", key: "title", width: 25 },
  //   { header: "Description", key: "description", width: 25 },
  //   { header: "Published", key: "published", width: 10 },
  // ];

  // const idCol = worksheet.getColumn('id');
  // idCol.header = ['id1' , 'id2'];
  // let tutorials = [];
  // tutorials.push({
  //   id: 1,
  //   title: "Akash",
  //   description: "obj.descriptio",
  //   published: "obj.published",
  //   creation: "akas"
  // });

  // // // Add Array Rows
  // basicDetailsWorksheet.addRows(tutorials);

  // res is a Stream object
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
};
