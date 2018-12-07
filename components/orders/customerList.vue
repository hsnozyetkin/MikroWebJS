<template>
  <li class="effect list-group-item p-0 my-1" :class=" { 'active' : visible } ">
    <div class="col-12">
      <div class="row">
        <div class="col-sm-12 col-md-4 p-2">{{ customer.cari_kod }}</div>
        <div class="col-sm-12 col-md-7 p-2">{{ customer.cari_unvan1 }}</div>
        <div class="col-sm-12 col-md-1 p-0">
          <button @click="selectCustomer" class="btn btn-primary btn-block">Seç</button>
        </div>
      </div>
    </div>
    <transition name="fade" type="transition">
      <app-customer-info v-if="visible" :customerinfo="customer"></app-customer-info>
    </transition>
  </li>
</template>b


<script>
import CustomerInfo from "./customerInfo";

import { mapMutations } from "vuex";
export default {
  components: {
    appCustomerInfo: CustomerInfo
  },
  data() {
    return {
      visible: false
    };
  },
  props: ["customer"],
  methods: {
    ...mapMutations(["setDarknes", "setCustomerSelected"]),
    selectCustomer() {
      console.log("Seç Butonu Cari => ", this.customer);
      let data = {
        customer: this.customer
      };
      this.$store.commit("setNewOrderData", {
        data,
        editId: null
      });
      this.$store.dispatch("addProjectList", this.customer.cari_kod);
      this.$nuxt.$emit("popupSelect", null);
    }
  },
  created() {
    // this.$nuxt.$on("customerInfoShow" + this.customer.cari_Recno, data => {
    //   console.log("Müşteri detay data", data);
    //   console.log("Müşteri detay customer", this.customer.cari_Recno);
    //   this.visible = !this.visible;
    // });
  }
};
</script>

<style scoped>
.customerList:hover {
  background-color: #436486;
}

/* Cari Seçim Animation */

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}
/****************************/
</style>
