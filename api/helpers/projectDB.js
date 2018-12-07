const {
  sql,
  config
} = require("./DbConfig")



const projectList = (customer) => {
  console.log("ProjectDB => ", typeof customer)
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request()
          .input('prokod', sql.VarChar(25), customer)
          .query('select pro_kodu,pro_adi,pro_musterikodu from PROJELER where pro_musterikodu = @prokod order by pro_adi ')
      })
      .then(data => {
        console.log("Oluşan Data => ", data, sql.query)
        resolve(data.recordset);
      })
      .catch(er => {
        console.log("Hata Oluştu", er)
      })
  });
};

const projectListAll = () => {
  console.log("ProjectDB => ")
  return new Promise((resolve, reject) => {
    new sql.ConnectionPool(config).connect()
      .then(pool => {
        return pool.request()
          .query `
                  select	pro_kodu,
                          pro_adi,
                          pro_musterikodu
                  from PROJELER
                  order by pro_adi
              `
      })
      .then(data => {
        console.log("Oluşan Data => ", data)
        resolve(data.recordset);
      })
  });
};

module.exports = {
  projectList,
  projectListAll
}
