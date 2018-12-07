const state = {
  customers: [],
  customerProject: [],
  takimGrubu: [],
  selectedTakimGrubu: "",
  takimCinsi: [],
  kanatGrubu: [],
  kanatCinsi: [],
  kasaCinsi: [],
  yuzeyGrubu: [],
  yuzeyStokListesi: [],
  pervazType: [],
  customerSelected: false,
  projectSelected: false,
  productSelected: false,
  imageData: {
    productType: null,
    kanatType: null,
    kasaType: null,
    pervazType: null
  },
  newOrderData: {
    siparisTarihi: null,
    teslimTarihi: null,

    customer: {
      cari_Recno: 0,
      cari_kod: "",
      cari_unvan1: "",
      cari_vdaire_adi: "",
      cari_vdaire_no: "",
      cari_CepTel: "",
      cari_EMail: "",
      adr_tel_bolge_kodu: "",
      adr_tel_no1: "",
      adr_il: "",
      adr_ilce: "",
      adres: ""
    },
    project: {
      pro_kodu: "",
      pro_adi: "",
      pro_musterikodu: ""
    },
    orderLines: []
  }
}

const mutations = {
  setSiparisTarihi(state, tarih) {
    state.newOrderData.siparisTarihi = tarih
  },
  setTeslimTarihi(state, tarih) {
    state.newOrderData.teslimTarihi = tarih
  },
  setCustomer(state, customer) {
    state.customers = customer
  },
  setCustomerSelected(state, value) {
    state.customerSelected = value
  },
  setProjectSelected(state, value) {
    state.projectSelected = value
  },
  setProjectList(state, project) {
    state.customerProject = project
  },
  setProductSelected(state, value) {
    state.productSelected = value
  },
  setTakimGrubu(state, takimGrubu) {
    state.takimGrubu = takimGrubu
  },
  setKanatGrubu(state, kanatGrubu) {
    state.kanatGrubu = kanatGrubu
  },
  setKanatCinsi(state, kanatcinsi) {
    state.kanatCinsi = kanatcinsi
  },
  setKasaType(state, kasatype) {
    state.kasaType = kasatype
  },
  setPervazType(state, pervaztype) {
    state.pervazType = pervaztype
  },
  setNewOrderData(state, {
    data,
    editId
  }) {
    console.log("NewOrderData Gelen Veri => ", data, editId)
    if (data.customer) {
      state.newOrderData.customer = {}
      state.newOrderData.customer = data.customer
    } else if (data.project) {
      state.newOrderData.project = {}
      state.newOrderData.project = data.project
    } else if (data.orderLine) {
      if (editId != undefined || editId != null) {
        console.log("editId var")
        state.newOrderData.orderLines.forEach((element, index) => {
          if (element.id == data.orderLine.id) {
            console.log("editId Bulundu INDEX => ", index)
            state.newOrderData.orderLines[index] = data.orderLine
          }
        });
      } else {
        state.newOrderData.orderLines.push(data.orderLine)
      }
    }
  },
  setTakimCinsi(state, takimstok) {
    state.takimCinsi = takimstok
  },
  setYuzeyGrubu(state, yuzeyGrub) {
    state.yuzeyGrubu = yuzeyGrub
  },
  setYuzeyStokListesi(state, yuzeylistesi) {
    state.yuzeyStokListesi = yuzeylistesi
  },
  orderLineCopy(state, newline) {
    state.newOrderData.orderLines.push(newline)
  },
  orderLineRemove(state, id) {
    state.newOrderData.orderLines.forEach((element, index) => {
      if (element.id == id)
        state.newOrderData.orderLines.splice(index, 1)
    });
  },
}

//

//

const actions = {
  nuxtServerInit(vuexContext, context) {
    console.log("Siparişler nuxtServerInit Çalışıtı")
    return context.$axios.get("/customer/customerList")
      .then((result) => {
        vuexContext.commit("setCustomer", result.data.customers)
      }).catch((err) => {

      });
  },
  addProjectList(vuexContext, customer) {
    this.$axios("/project/" + customer)
      .then(prj => {
        vuexContext.commit("setProjectList", prj.data.projects)
      })
  },
  setProductSelected(vuexContext, value) {
    vuexContext.commit("setProductSelected", value)
  },
  addTakimGrubu(vuexContext) {
    vuexContext.commit("setIsLoding", true)
    this.$axios("/product/TakimGrubu")
      .then(res => {
        vuexContext.commit("setIsLoding", false)
        vuexContext.commit("setTakimGrubu", res.data.takimGrubu)
      })
  },
  addKanatCinsi(vuexContext, type) {
    this.$axios("/product/kanatCinsi/" + type)
      .then(res => {
        vuexContext.commit("setKanatCinsi", res.data.kanat)
      })
  },
  addKasaCinsi(vuexContext, type) {
    this.$axios("/product/kasaCinsi/" + type)
      .then(res => {
        vuexContext.commit("setKasaCinsi", res.data.kasa)
      })
  },
  addPervazCinsi(vuexContext, type) {
    this.$axios("/product/pervazCinsi/" + type)
      .then(res => {
        vuexContext.commit("setPervazCinsi", res.data.pervaz)
      })
  },
  addTakimCinsi(vuexContext, cinsi) {
    this.$axios("/product/TakimStokListesi/" + cinsi)
      .then(takimListesi => {
        console.log(takimListesi)
        vuexContext.commit("setTakimCinsi", takimListesi.data.takimStokListesi)
      })
  },
  addKanatGrubu(vuexContext, cinsi) {
    this.$axios("/product/TakimStokListesi/" + cinsi)
      .then(takimListesi => {
        console.log(takimListesi)
        vuexContext.commit("setKanatGrubu", takimListesi.data.takimStokListesi)
      })
  },
  addYuzeyGrubu(vuexContext, cinsi) {
    this.$axios("/product/YuzeyGrubu/" + cinsi)
      .then(yuzeyGrubu => {
        console.log(yuzeyGrubu)
        vuexContext.commit("setYuzeyGrubu", yuzeyGrubu.data.yuzeyGrubuListesi)
      })
  },
  addYuzeyStokListesi(vuexContext, cinsi) {
    console.log("Yüzey Stok Listesi Paramaetre => ", cinsi)
    this.$axios("/product/YuzeyStokListesi/" + cinsi)
      .then(yuzeyStokListesi => {
        vuexContext.commit("setYuzeyStokListesi", yuzeyStokListesi.data.yuzeyStokListesi)
      })
  }
}

const getters = {
  getCustomer(state) {
    return state.customers
  },
  getCustomerSelected(state) {
    return state.customerSelected
  },
  getProjectSelected(state) {
    return state.projectSelected
  },
  getCustomerList(state) {
    return state.customers
  },
  getProjectList(state) {
    return state.customerProject
  },
  getProductSelected(state) {
    return state.productSelected
  },
  getTakimGrubu(state) {
    return state.takimGrubu
  },
  getKanatCinsi(state) {
    return state.kanatCinsi
  },
  getKasaCinsi(state) {
    return state.kasaCinsi
  },
  getPervazCinsi(state) {
    return state.pervazCinsi
  },
  getNewOrderData(state) {
    return state.newOrderData
  },
  getOrderLines(state) {
    return state.newOrderData.orderLines
  },
  getTakimListesi(state) {
    return state.takimCinsi
  },
  getYuzeyGrubu(state) {
    return state.yuzeyGrubu
  },
  getYuzeyStokListesi(state) {
    return state.yuzeyStokListesi
  },
  getSiparisTarihi(state) {
    return state.newOrderData.siparisTarihi
  },
  getTeslimTarihi(state) {
    return state.newOrderData.teslimTarihi
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
