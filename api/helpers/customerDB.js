const {
    sql,
    config
} = require("./DbConfig")



const customerList = () => {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect()
            .then(pool => {
                return pool.query `
                select 	cari_Recno,
                        cari_kod,
                        cari_unvan1,
                        cari_vdaire_adi,
                        cari_vdaire_no,
                        cari_CepTel,
                        cari_EMail,
                        adr_tel_bolge_kodu,
                        adr_tel_no1,
                        adr_il,
                        adr_ilce,
                        adr_cadde + ' ' + adr_mahalle adres
                from CARI_HESAPLAR
                left outer join CARI_HESAP_ADRESLERI on cari_kod = adr_cari_kod and adr_adres_no = 1
            `
            })
            .then(data => {
                resolve(data.recordset);
            })
    });
};


module.exports = {
    customerList
}