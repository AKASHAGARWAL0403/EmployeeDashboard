import { Employee } from "../../models/Employee";
import { Faculty } from "../../models/Faculty";
import { Sequelize } from "sequelize";

const pdfMake = require("../../node_modules/pdfmake/build/pdfmake");
const vfsFonts = require("../../node_modules/pdfmake/build/vfs_fonts");
const Op = Sequelize.Op;

pdfMake.vfs = vfsFonts.pdfMake.vfs;

exports.findByExternalId = (req, res) => {
  const id = req.body.id;

  var condition = id ? { external_id: { [Op.like]: `%${id}%` } } : null;
  Employee.findAll({
    where: condition,
    include: Faculty,
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

exports.downloadAllPdfByExternalId = (req, res) => {
  // playground requires you to assign document definition to a variable called dd

  const id = req.body.id;

  var condition = id ? { external_id: { [Op.like]: `%${id}%` } } : null;
  Employee.findAll({
    where: condition,
    include: Faculty,
  })
    .then((data) => {
      var ans = [];
      var t = [];
      t.push("Id");
      t.push("External Id");
      t.push("Employee Name");
      t.push("Gender");
      t.push("Age");
      t.push("Category");
      t.push("Designation");
      t.push("Faculty");
      t.push("Joining Date");
      t.push("Retire Date");
      ans.push(t);
      data.forEach((employee) => {
        var temp = [];
        temp.push(employee.id);
        temp.push(employee.external_id);
        temp.push(employee.name);
        temp.push(employee.gender);
        temp.push(employee.age);
        temp.push(employee.category);
        temp.push(employee.designation);
        temp.push(employee.faculty.name);
        temp.push(employee.joining_date.toString());
        temp.push(employee.retire_date.toString());
        ans.push(temp);
      });

      var dd = {
        content: [
          { text: "Tables", style: "header" },
          {
            style: "tableExample",
            table: {
              body: ans,
            },
          },
        ],
      };

      const pdfDoc = pdfMake.createPdf(dd);
      pdfDoc.getBase64((data) => {
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment;filename="filename.pdf"',
        });

        const download = Buffer.from(data.toString("utf-8"), "base64");
        res.end(download);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};

exports.downloadOneByExternalId = (req, res) => {
  // playground requires you to assign document definition to a variable called dd

  const id = req.body.id;

  var condition = id ? { external_id: id } : null;
  Employee.findAll({
    where: condition,
    include: Faculty,
  })
    .then((data) => {
      var ans = [];
      var t = [];
      t.push("Id");
      t.push("External Id");
      t.push("Employee Name");
      t.push("Gender");
      t.push("Age");
      t.push("Category");
      t.push("Designation");
      t.push("Faculty");
      t.push("Joining Date");
      t.push("Retire Date");
      ans.push(t);
      data.forEach((employee) => {
        var temp = [];
        temp.push(employee.id);
        temp.push(employee.external_id);
        temp.push(employee.name);
        temp.push(employee.gender);
        temp.push(employee.age);
        temp.push(employee.category);
        temp.push(employee.designation);
        temp.push(employee.faculty.name);
        temp.push(employee.joining_date.toString());
        temp.push(employee.retire_date.toString());
        ans.push(temp);
      });

      var dd = {
        content: [
          { text: "Tables", style: "header" },
          {
            style: "tableExample",
            table: {
              body: ans,
            },
          },
        ],
      };

      const pdfDoc = pdfMake.createPdf(dd);
      pdfDoc.getBase64((data) => {
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment;filename="filename.pdf"',
        });

        const download = Buffer.from(data.toString("utf-8"), "base64");
        res.end(download);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id,
      });
    });
};
