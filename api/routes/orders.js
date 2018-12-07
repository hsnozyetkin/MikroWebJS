const express = require('express');
const stream = require("stream")
const fs = require("fs")
const router = express.Router();

const {
  siparisKaydet
} = require("../helpers/orderSave")

router.get('/Save/:orderData', (req, res) => {
  console.log("KAYDET GELEN DATA => ", req.params.orderData)
  siparisKaydet(JSON.parse(req.params.orderData))
    .then((result) => {
      res.status(200).json({
        status: "200",
        durum: 'Kayıt Başarılı',
        gelen: JSON.parse(req.params.orderData)
      })

    }).catch((err) => {

    });
})


module.exports = router;
