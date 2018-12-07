const express = require('express');
const stream = require("stream")
const fs = require("fs")
const router = express.Router();

const {
  yuzeyGrubu,
  TakimGrubu,
  kanatType,
  kasaType,
  pervazType,
  TakimStokListesi,
  yuzeyStokListesi
} = require("../helpers/productsDB")

router.get('/ProductsList', (req, res) => {
  TakimGrubu().then((data) => {
    console.log("Stoklar Get İsteği")
    res.status(200).json({
      products: data
    })
  });
})

router.get('/TakimGrubu', (req, res) => {
  TakimGrubu().then((data) => {
    console.log("Stoklar Get İsteği")
    res.status(200).json({
      takimGrubu: data
    })
  });
})

// Takim Stok Listesi
router.get('/TakimStokListesi/:takimGrub', (req, res) => {
  TakimStokListesi(req.params.takimGrub).then((data) => {
    console.log("Stoklar Get İsteği")
    res.status(200).json({
      takimStokListesi: data
    })
  });
})

router.get('/ProductsListTypeImage', (req, res) => {
  TEST().then(data => {

    // var CHUNK_SZ = 0x8000;
    // var c = [];
    // for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
    //   c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    // }
    // const gelen = c.join("");
    res.status(200).json({
      Veri: data //JSON.parse(data.replace("\", ")).data
    })
  })

  // res.write(200, {
  //   'Content-Type': 'Image/Jpeg',
  //   'Content-Length': 8000
  // })
  // res.send(data.imageData)

})

router.get('/kanatType', (req, res) => {
  kanatType(null)
    .then(kanat => {
      console.log("Kanat Cinsi İsteği", kanat)
      res.status(200).json({
        kanat: kanat
      })
    })
})

// Kanat Cinsi Listesi
router.get('/kanatCinsi/:kanatid', (req, res) => {
  kanatType(req.params.kanatid)
    .then(kanat => {
      console.log("Kanat Cinsi İsteği", kanat)
      res.status(200).json({
        kanat: kanat
      })
    })
})

// Yüzey Grubu Filtreli
router.get('/YuzeyGrubu/:grubId', (req, res) => {
  yuzeyGrubu(req.params.grubId)
    .then(yuzeyGrubuListesi => {
      console.log("Yüzey Grubu İsteği", yuzeyGrubuListesi)
      res.status(200).json({
        yuzeyGrubuListesi
      })
    })
})

// Yüzey Grubu Tüm Liste
router.get('/YuzeyGrubu/', (req, res) => {
  yuzeyGrubu(null)
    .then(yuzeyGrubu => {
      console.log("Yüzey Grubu İsteği", yuzeyGrubu)
      res.status(200).json({
        yuzeyGrubu
      })
    })
})

// Yüzey Stok Listesi
router.get('/YuzeyStokListesi/:grubId', (req, res) => {
  yuzeyStokListesi(req.params.grubId)
    .then(yuzeyStokListesi => {
      res.status(200).json({
        yuzeyStokListesi
      })
    })
})

// Kasa Cinsi Listesi
router.get('/kasaType/:kasaid', (req, res) => {
  kasaType(JSON.parse(req.params.kasaid.replace("\", ")))
    .then(kasa => {
      console.log("Kasa Cinsi İsteği", kasa)
      console.log("Kasa Gelen Parametre => ", JSON.parse(req.params.kasaid.replace("\", ")))
      res.status(200).json({
        kasa: kasa
      })
    })
})


// Pervaz Cinsi Listesi
router.get('/pervazType/:pervazid', (req, res) => {
  pervazType(req.params.pervazid)
    .then(pervaz => {
      console.log("Pervaz Cinsi İsteği", pervaz)
      res.status(200).json({
        pervaz
      })
    })
})

router.get('/', (req, res) => {
  res.status(200).json({
    title: "Genel istek"
  })
})

module.exports = router;
