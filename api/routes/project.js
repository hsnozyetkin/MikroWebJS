const express = require('express');
const router = express.Router();

const {
  projectList,
  projectListAll
} = require("../helpers/projectDB")

// Proje Kartları Listesi Parametreli
router.get('/:customer', (req, res) => {
  projectList(req.params.customer).then((data) => {
    console.log("Proje Kartları İsteği", data)
    res.status(200).json({
      projects: data
    })
  });
})

// Proje Kartları Tam Liste
router.get('/', (req, res) => {
  projectListAll().then((data) => {
    console.log("Proje Kartları Tam Liste İsteği")
    res.status(200).json({
      projects: data
    })
  });
})

module.exports = router;
