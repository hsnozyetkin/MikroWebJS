<template>
  <div class="container-fluid h-100">
    <div class="row m-0">
      <div class="col-12">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="col-12">
              <button @click="customerSelect" class="btn btn-success btn-sm">Müşteri Seç</button>
              <div class="customerDetail col-12 mt-3">
                <table class="table table-sm">
                  <tbody>
                    <tr>
                      <td>{{ orderData["customer"].cari_unvan1 }}</td>
                    </tr>
                    <tr v-if="orderData['customer'].adres">
                      <td>{{ orderData["customer"].adres }}</td>
                    </tr>
                    <tr v-if="orderData['customer'].adr_il">
                      <td>{{ orderData["customer"].adr_il }} {{ orderData["customer"].adr_ilce }}</td>
                    </tr>
                    <tr v-if="orderData['customer'].cari_EMail">
                      <td>{{ orderData["customer"].cari_EMail }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="row mb-1">
              <div class="col-sm-12 col-md-3">
                <span>Sipariş Tarihi</span>
              </div>
              <div class="col-sm-12 col-md-9">
                <div class="input-group input-group-sm">
                  <input
                    v-model="siparisTarihi"
                    type="date"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  >
                </div>
              </div>
            </div>
            <div class="row mb-1">
              <div class="col-sm-12 col-md-3">
                <span>Teslim Tarihi</span>
              </div>
              <div class="col-sm-12 col-md-9">
                <div class="input-group input-group-sm">
                  <input
                    type="date"
                    v-model="teslimTarihi"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  >
                </div>
              </div>
            </div>
            <div class="row mb-1">
              <div class="col-sm-12 col-md-3">
                <span>Proje Kartı</span>
              </div>
              <div class="col-sm-12 col-md-9">
                <div class="input-group input-group-sm">
                  <div class="input-group">
                    <input
                      v-model="orderData.project.pro_adi"
                      type="text"
                      disabled
                      class="form-control"
                      placeholder="Proje Kartı Seç"
                      aria-label="Proje Kartı Seç"
                      aria-describedby="button-addon2"
                    >
                    <div class="input-group-append">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        type="button"
                        id="button-addon2"
                        @click="selectProject"
                      >...</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCustomerSelected", "getProjectSelected"]),
    DateNow() {
      var now = new Date();
      console.log(new Date());
      var month = now.getMonth() + 1;
      var day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = now.getFullYear() + "-" + month + "-" + day;
      return today;
    },
    orderData() {
      return this.$store.getters.getNewOrderData;
    },
    siparisTarihi: {
      get() {
        return this.$store.getters.getSiparisTarihi;
      },
      set(value) {
        console.log("Tarih ilk", value);
        this.$store.commit("setSiparisTarihi", value);
      }
    },
    teslimTarihi: {
      get() {
        return this.$store.getters.getSiparisTarihi;
      },
      set(value) {
        console.log("Tarih ilk", value);
        this.$store.commit("setSiparisTarihi", value);
      }
    }
  },
  methods: {
    ...mapMutations([
      "setDarknes",
      "setCustomerSelected",
      "setProjectSelected"
    ]),

    selectCustomer() {
      // alert();
    },
    selectProject() {
      if (this.$store.getters.getNewOrderData.customer.cari_Recno == 0) {
        this.$vs.notify({
          title: "Eksik Bilgi",
          text: "Lütfen Müşteri Seçiniz !!",
          color: "warning",
          position: "top-center",
          icon: "warning"
        });
        return;
      }
      this.$nuxt.$emit("popupSelect", 1);
    },
    customerSelect(value) {
      this.$nuxt.$emit("popupSelect", 0);
    }
  },
  mounted() {},
  created() {
    // this.$store.dispatch("setCustomerList");
    this.$store.commit("setSiparisTarihi", this.DateNow);
    this.$store.commit("setTeslimTarihi", this.DateNow);
  },
  watch: {
    getCustomerSelected(value) {
      if (value) {
        this.setDarknes(true);
      } else {
        this.setDarknes(false);
      }
    },
    getProjectSelected(value) {
      if (value) {
        this.setDarknes(true);
      } else {
        this.setDarknes(false);
      }
    },
    windowHeight() {}
  }
};
</script>

<style scoped>
</style>

