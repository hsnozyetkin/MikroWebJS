const express = require('express');
const router = express.Router();

const {
  customerList
} = require("../helpers/customerDB")

const {
  projectList
} = require("../helpers/projectDB")


// müşteriler Listesi
router.get('/customerList', (req, res) => {
  customerList().then((data) => {
    console.log("Müşteriler Get İsteği")
    res.status(200).json({
      customers: data
    })
  });
})

module.exports = router;
