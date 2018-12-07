const {
  sql,
  config
} = require("./DbConfig")

const ConvertToBase64String = veri => {
  if (veri) {
    for (const key in veri) {
      if (veri.hasOwnProperty(key)) {
        if (veri[key].imageData) {
          let data = JSON.parse(JSON.stringify(veri[key].imageData).replace("\", ")).data
          let base64String = new Buffer(data, 'binary').toString('base64')
          veri[key].imageData = "data:Image/bmp;base64," + base64String
        }
      }
    }
    return veri
  }
}

// Stok Listesi
const productList = () => {
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.query `select top 500 sto_kod, sto_isim from STOKLAR where /*sto_kod like '152%' and*/ sto_pasif_fl = 0 order by sto_kod`
      })
      .then(sonuc => {
        resolve(sonuc.recordset);
      });
  });
};

//  Takım Grubu
const TakimGrubu = () => {
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.query `select sto_RECno,sto_kod,sto_isim
                from STOKLAR
                
                where sto_kod like '152.10.91.__'`
      })
      .then(sonuc => {
        resolve(sonuc.recordset);
      });
  });
};
//  Takım Stok Listesi
const TakimStokListesi = (grubKod) => {
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        console.log("Gelen Parametre", grubKod)
        let sqlText = "select sto_RECno,sto_kod,sto_isim, Data imageData from STOKLAR left outer join mye_ImageData on sto_RECno = RecID_RECno and TableID = 13 where sto_kod like '" + grubKod + "%' and sto_pasif_fl = 0"
        return pool
          .request().query(sqlText)
      })
      .then(sonuc => {
        let data = ConvertToBase64String(sonuc.recordset)
        resolve(data);
      });
  });
};


// Kanat Grubu Getir
const KanatGrubu = (grup) => {
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        let sqlText = "select sto_RECno,sto_kod,sto_isim from STOKLAR where sto_kod like '152.10.91.__'"
        return pool
          .request().query(sqlText)
      })
      .then(sonuc => {
        resolve(sonuc.recordset);
      });
  });
};
// Kanat Listesi
const kanatType = (type) => {
  let parametre;
  console.log("Sayfadan Gelen Paramaetre", type)
  switch (type) {
    case '152.10.91.10':
    case '152.10.91.11':
    case '152.10.91.12':
      parametre = '152.10.10.10'
      break;
    case '152.10.91.13':
    case '152.10.91.14':
    case '152.10.91.15':
    case '152.10.91.16':
    case '152.10.91.17':
      parametre = '152.10.10.11'
      break;
    case '152.10.91.18':
      parametre = '152.10.10.12'
      break;
    case '152.10.91.19':
      parametre = '152.10.10.13'
      break;
    case '152.10.91.20':
      parametre = '152.10.10.14'
      break;
    case '152.10.91.21':
      parametre = '152.10.10.15'
      break;
    default:
      break;
  }
  let sqlText = parametre !== undefined && parametre !== null && parametre.length > 0 ? "select sto_kod,sto_isim from STOKLAR where sto_pasif_fl = 0 and sto_kod like '" + parametre + "%'" : "select sto_kod,sto_isim from STOKLAR where sto_pasif_fl = 0 and sto_kod like '152.10.10%'"
  console.log("SQL Cümlesi => ", sqlText)
  console.log("Oluşturulan Parametre", parametre)
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request().query(sqlText)
      })
      .then(kanat => {
        let data = ConvertToBase64String(kanat.recordset)
        resolve(data)
      })
  })
}

// Yüzey Grubu Listesi
const yuzeyGrubu = (type) => {
  let parametre;
  console.log("Sayfadan Gelen Paramaetre", type)
  switch (type) {
    case '152.10.91.10':
    case '152.10.91.11':
    case '152.10.91.12':
      parametre = '150.10.10.10'
      break;
    case '152.10.91.13':
    case '152.10.91.14':
    case '152.10.91.15':
      parametre = '150.10.10.11'
      break;
    case '152.10.91.18':
      parametre = '150.10.10.12'
      break;
    case '152.10.91.16':
    case '152.10.91.19':
      parametre = '150.10.10.14'
      break;
    case '152.10.91.21':
      parametre = '150.10.10.13'
      break;
    default:
      break;
  }
  let sqlText = parametre !== undefined && parametre !== null && parametre.length > 0 ? "select sto_RECno,sto_kod,sto_isim from STOKLAR where sto_kod like '" + parametre + ".__%' and sto_pasif_fl = 1" : "select sto_RECno,sto_kod,sto_isim from STOKLAR where sto_kod like '150.10.10.__.__%' and sto_pasif_fl = 1"
  console.log("SQL Cümlesi => ", sqlText)
  console.log("Oluşturulan Parametre", parametre)
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request().query(sqlText)
      })
      .then(yuzey => {
        resolve(yuzey.recordset)
      })
  })
}
// Yüzey Stok Listesi Listesi
const yuzeyStokListesi = (type) => {
  let parametre;
  console.log("Sayfadan Gelen Paramaetre", type)

  let sqlText = "select sto_RECno,sto_kod,sto_isim, Data imageData from STOKLAR left outer join mye_ImageData on sto_RECno = RecID_RECno and TableID = 13 where sto_kod like '" + type + ".___%' and sto_pasif_fl = 0"
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request().query(sqlText)
      })
      .then(yuzey => {
        let data = ConvertToBase64String(yuzey.recordset)
        resolve(data)
      })
  })
}


//////////////////////////////////////////////////////////////////////////////////////////


// Kasa Listesi
const kasaType = (type) => { // type Object
  let parametre;
  console.dir("Sayfadan Gelen Paramaetre", type)
  switch (type.productType) {
    case '152.10.91.10':
    case '152.10.91.11':
    case '152.10.91.12':
      parametre = '152.10.20.10'
      break;
    case '152.10.91.13':
    case '152.10.91.14':
    case '152.10.91.16':
      parametre = '152.10.20.11'
      break;
    case '152.10.91.15':
    case '152.10.91.17':
    case '152.10.91.21':
      parametre = '152.10.20.15'
      break;
    case '152.10.91.18':
      parametre = '152.10.20.12'
      break;
    case '152.10.91.19':
      parametre = '152.10.20.13'
      break;
    case '152.10.91.20':
      parametre = '152.10.20.14'
      break;
    default:
      break;
  }
  let sqlText = parametre !== undefined && parametre !== null && parametre.length > 0 ? "select sto_kod,sto_isim from STOKLAR where sto_pasif_fl = 0 and sto_kod like '" + parametre + "%' and sto_isim like '%" + type.kasaMost + "%'" : "select sto_kod,sto_isim from STOKLAR where sto_pasif_fl = 0 and sto_kod like '152.10.20%' and sto_isim like '%" + type.kasaMost + "%'"
  console.log("SQL Cümlesi => ", sqlText)
  console.log("Oluşturulan Parametre", parametre)
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request().query(sqlText)
      })
      .then(kasa => {
        resolve(kasa.recordset)
      })
  })
}

// Pervaz Listesi
const pervazType = (type) => {
  let parametre;
  console.log("Sayfadan Gelen Paramaetre", type)
  switch (type) {
    case '152.10.91.10':
    case '152.10.91.11':
    case '152.10.91.12':
      parametre = "sto_kod like '152.10.30.10%'"
      break;
    case '152.10.91.13':
    case '152.10.91.14':
      parametre = "sto_kod like '152.10.30.15%'"
      break;
    case '152.10.91.15':
    case '152.10.91.17':
    case '152.10.91.21':
      parametre = "(sto_kod like '152.10.30.15%' or sto_kod like '152.10.30.22%' or sto_kod like '152.10.30.29%')"
      break;
    case '152.10.91.16':
      parametre = "sto_kod like '152.10.30.11%'"
      break;
    case '152.10.91.18':
      parametre = "(sto_kod like '152.10.30.12%' or sto_kod like '152.10.30.19%' or sto_kod like '152.10.30.26%')"
      break;
    case '152.10.91.19':
      parametre = "(sto_kod like '152.10.30.13%' or sto_kod like '152.10.30.20%' or sto_kod like '152.10.30.27%')"
      break;
    case '152.10.91.20':
      parametre = "(sto_kod like '152.10.30.14%' or sto_kod like '152.10.30.21%' or sto_kod like '152.10.30.28%')"
      break;
    default:
      break;
  }
  let sqlText = parametre !== undefined && parametre !== null && parametre.length > 0 ? "select sto_kod,sto_isim from STOKLAR where sto_pasif_fl = 0 and " + parametre : "select sto_kod,sto_isim from STOKLAR where sto_pasif_fl = 0 and sto_kod like '152.10.30%'"
  console.log("SQL Cümlesi => ", sqlText)
  console.log("Oluşturulan Parametre", parametre)
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request().query(sqlText)
      })
      .then(pervaz => {
        resolve(pervaz.recordset)
      })
  })
}



module.exports = {
  productList,
  TakimGrubu,
  kanatType,
  kasaType,
  pervazType,
  TakimStokListesi,
  yuzeyGrubu,
  yuzeyStokListesi
}
// module.exports.isLoginControl = isLoginControl;
// module.exports.productList = productList;
