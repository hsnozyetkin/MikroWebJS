const {
  sql,
  config
} = require("./DbConfig")
// const config = {
//   user: 'mikro',
//   password: 'mik7854.',
//   server: '192.168.3.100',
//   database: 'MikroDB_V15_OZY',
//   options: {
//     abortTransactionOnError: true // <-- SET XACT_ABORT ON
//   }
// };

const DateNow = () => {
  var now = new Date();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var today = now.getFullYear() + "-" + month + "-" + day;
  return today;
}

let sipString = `INSERT INTO MikroDB_V15_OZY.dbo.SIPARISLER (sip_RECid_DBCno,sip_RECid_RECno,sip_SpecRECno,sip_iptal,sip_fileid,sip_hidden,sip_kilitli,sip_degisti,sip_checksum,sip_create_user,sip_create_date,sip_lastup_user,sip_lastup_date,sip_special1,sip_special2,sip_special3,sip_firmano,sip_subeno,sip_tarih,sip_teslim_tarih,sip_tip,sip_cins,sip_evrakno_seri,sip_evrakno_sira,sip_satirno,sip_belgeno,sip_belge_tarih,sip_satici_kod,sip_musteri_kod,sip_stok_kod,sip_b_fiyat,sip_miktar,sip_birim_pntr,sip_teslim_miktar,sip_tutar,sip_iskonto_1,sip_iskonto_2,sip_iskonto_3,sip_iskonto_4,sip_iskonto_5,sip_iskonto_6,sip_masraf_1,sip_masraf_2,sip_masraf_3,sip_masraf_4,sip_vergi_pntr,sip_vergi,sip_masvergi_pntr,sip_masvergi,sip_opno,sip_aciklama,sip_aciklama2,sip_depono,sip_OnaylayanKulNo,sip_vergisiz_fl,sip_kapat_fl,sip_promosyon_fl,sip_cari_sormerk,sip_stok_sormerk,sip_cari_grupno,sip_doviz_cinsi,sip_doviz_kuru,sip_alt_doviz_kuru,sip_adresno,sip_teslimturu,sip_cagrilabilir_fl,sip_prosiprecDbId,sip_prosiprecrecI,sip_iskonto1,sip_iskonto2,sip_iskonto3,sip_iskonto4,sip_iskonto5,sip_iskonto6,sip_masraf1,sip_masraf2,sip_masraf3,sip_masraf4,sip_isk1,sip_isk2,sip_isk3,sip_isk4,sip_isk5,sip_isk6,sip_mas1,sip_mas2,sip_mas3,sip_mas4,sip_Exp_Imp_Kodu,sip_kar_orani,sip_durumu,sip_stalRecId_DBCno,sip_stalRecId_RECno,sip_planlananmiktar,sip_teklifRecId_DBCno,sip_teklifRecId_RECno,sip_parti_kodu,sip_lot_no,sip_projekodu,sip_fiyat_liste_no,sip_Otv_Pntr,sip_Otv_Vergi,sip_otvtutari,sip_OtvVergisiz_Fl,sip_paket_kod,sip_RezRecId_DBCno,sip_RezRecId_RECno,sip_harekettipi,sip_yetkili_recid_dbcno,sip_yetkili_recid_recno,sip_kapatmanedenkod,sip_gecerlilik_tarihi,sip_onodeme_evrak_tip,sip_onodeme_evrak_seri,sip_onodeme_evrak_sira,sip_rezervasyon_miktari,sip_rezerveden_teslim_edilen) 
VALUES(0,0,0,0,21,0,0,0,0,24,'${DateNow()}',24,'${DateNow()}',N'',N'',N'',0,0,'@siparisTarihi','@teslimTarihi',0,0,N'@evrakseri',@evraksira,@satirno,N'','@siparisTarihi',N'',N'@carikod',N'@stokkod',@birimfiyat,@miktar,1,0,@tutar,0,0,0,0,0,0,0,0,0,0,4,@vergi,0,0,0,N'',N'',10,0,0,0,0,N'10',N'10',0,0,1.000000000000,5.157000000000,1,N'',1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,N'',0,0,0,0,0,0,0,N'',0,N'120.47.PRJ.100',0,0,0,0,0,N'',0,0,0,0,0,N'','18991230',0,N'',0,0,0);
select SCOPE_IDENTITY() lastRecNo
`
sipString.replace()
// sql.config = config
// insert into SIPARISLER (sip_RECid_DBCno,sip_RECid_RECno) values (0,99)
const siparisKaydet = data => {
  try {
    let satirNo = 0
    let newString = ""
    // console.log("orderSave GELEN DATA  =>", data)
    const connect = new sql.ConnectionPool(config, err => {
      const transaction = new sql.Transaction(connect)
      transaction.begin(err => {
        let rolledBack = false

        transaction.on("rollback", aborted => {
          console.log("Rolback İşlemi Gerçekleşti")
          rolledBack = true
        })


        new Promise((resolve, reject) => {
            new sql.Request(transaction)
              .query("select isnull(MAX(sip_evrakno_sira),0)+1 evrakno from SIPARISLER where sip_evrakno_seri = 'WWW'")
              .then(sonuc => {
                if (sonuc.recordset[0].evrakno == null || sonuc.recordset[0].evrakno == "0")
                  reject('Geçerli bir evrakno değil')
                else
                  resolve(sonuc.recordset[0].evrakno)
              })
          })
          .then(evrakno => {
            console.log("Alınan Evrak No =>", evrakno)
            newString = sipString
              .replace(/@siparisTarihi/g, "2018-12-07")
              .replace(/@teslimTarihi/g, "2018-12-07")
              .replace(/@evrakseri/g, "WWW")
              .replace(/@evraksira/g, 1)
              .replace(/@satirno/g, 0)
              .replace(/@carikod/g, "120.47")
              .replace(/@stokkod/g, "152.10.91.13.100")
              .replace(/@birimfiyat/g, 10)
              .replace(/@miktar/g, 10)
              .replace(/@tutar/g, 100)
              .replace(/@vergi/g, 18)

            new sql.Request(transaction)
              .query(newString)
              .then(sonuc => {
                console.log("Kayıt Ekleme Gelen Veri =>", sonuc)
                if (sonuc.recordset[0].lastRecNo == null || sonuc.recordset[0].lastRecNo == "0")
                  throw 'Kayıt işlemi başarısız'
                else
                  return sonuc.recordset[0].lastRecNo
              })

          })
          .then(sonIndex => {
            console.log("Kaydın İndex Nosu", sonIndex)
          })
          .catch(hata => {
            console.log(hata)
          })

      })
    })



    // let newString = sipString
    //   .replace(/@siparisTarihi/g, "2018-12-07")
    //   .replace(/@teslimTarihi/g, "2018-12-07")
    //   .replace(/@evrakseri/g, "WWW")
    //   .replace(/@evraksira/g, +evrakno)
    //   .replace(/@satirno/g, 0)
    //   .replace(/@carikod/g, "120.47")
    //   .replace(/@stokkod/g, "152.10.91.13.100")
    //   .replace(/@birimfiyat/g, 10)
    //   .replace(/@miktar/g, 10)
    //   .replace(/@tutar/g, 100)
    //   .replace(/@vergi/g, 18)

    // const transaction = new sql.Transaction(pool);
    // transaction.begin(err => {
    //   // ... error checks
    //   if (err) console.log("transaction.begin ERROR => ", err);
    //   let rolledBack = false;
    //   transaction.on('rollback', aborted => {
    //     // emited with aborted === true
    //     console.log("transaction.on rollback => ", aborted);
    //     rolledBack = true;
    //   });

    //   new sql.Request(transaction)
    //     .query(sipString, (err_1, result) => {
    //       // insert should fail because of invalid value
    //       console.log("Sipariş Kayıt Dönen Değer =>", result)
    //       if (err_1) {
    //         console.log("Insert Error => ", err_1)
    //         if (!rolledBack) {
    //           transaction.rollback(err_2 => {
    //             // ... error checks
    //             console.log("transaction.rollback => ", err_2);
    //           });
    //         }
    //       } else {
    //         transaction.commit(err_3 => {
    //           console.log("transaction.commit =>", err_3)
    //         });
    //       }
    //     });
    // });
  } catch (err_4) {
    console.log("Oluşan Hata => ", err_4);
  }
}

module.exports = {
  siparisKaydet
}
