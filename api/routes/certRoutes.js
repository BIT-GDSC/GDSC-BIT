const express = require("express");
const { verifyCertificate } = require("../controllers/certController");
const router = express.Router();

router.get("/cert/verify/:certificateID", verifyCertificate);

module.exports = router;