const express = require('express');
const router = express.Router();
const employee = require('./repository');

router.post("/pdf/downloadAll" , employee.downloadAllPdfByExternalId);
router.post("/pdf/downloadOne" , employee.downloadOneByExternalId);
router.post("/", employee.findByExternalId);
module.exports = router;