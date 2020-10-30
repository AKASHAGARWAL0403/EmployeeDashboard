const express = require('express');
const router = express.Router();
const employee = require('./repository');

router.post("/pdf/downloadAll" , employee.downloadAllByEmpId);
router.post("/pdf/downloadOne" , employee.downloadOneByEmpId);
router.post("/", employee.findByEmplId);

module.exports = router;