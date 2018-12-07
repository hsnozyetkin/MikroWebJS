<template>
  <div class="container h-100 p-0">
    <div class="row h-100">
      <transition name="fade" type="transition">
        <SelectBox/>
      </transition>
      <div class="col-sm-12 m-0 p-0 py-2">
        <div class="card h-100">
          <div class="card-header">Sipariş Formu</div>
          <div class="card-body h-100">
            <keep-alive>
              <component :is="selectedComponent"></component>
            </keep-alive>
          </div>
          <div class="card-footer p-0 d-flex flex-row">
            <div class="mr-auto">
              <button
                v-show="selectedComponent != 'appOrderInformation'"
                @click="stepOrderPre"
                class="btn btn-primary"
              >« {{ stepPreName }}</button>
            </div>
            <div>
              <button
                v-show="selectedComponent != 'appOrderPreview'"
                @click="stepOrderNext"
                class="btn btn-primary"
              >{{ stepNextName }} »</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row mt-3">
    <div class="col-sm-12 col-md-10 mx-md-auto position-static">
      <div class="card position-static">
        <div class="card-header">Sipariş Formu</div>
        <div class="card-body h-100">
          <keep-alive>
            <component :is="selectedComponent"></component>
          </keep-alive>
        </div>
        <div class="card-footer p-0 d-flex flex-row">
          <div class="mr-auto">
            <button
              v-show="selectedComponent != 'appOrderInformation'"
              @click="stepOrderPre"
              class="btn btn-primary"
            >« {{ stepPreName }}</button>
          </div>
          <div>
            <button
              v-show="selectedComponent != 'appOrderPreview'"
              @click="stepOrderNext"
              class="btn btn-primary"
            >{{ stepNextName }} »</button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" type="transition">
      <SelectBox/>
    </transition>
  </div>-->
</template>

<script>
import SelectBox from "@/components/shared/SelectBox";

import OrderInformation from "@/components/orders/orderInformation";
import OrderLines from "@/components/orders/orderLines";
import OrderPreview from "@/components/orders/orderPreview";
export default {
  components: {
    appOrderInformation: OrderInformation,
    appOrderLines: OrderLines,
    appOrderPreview: OrderPreview,
    SelectBox
  },
  data() {
    return {
      selectedComponent: "appOrderInformation"
    };
  },
  computed: {
    stepPreName() {
      if (this.selectedComponent == "appOrderLines") return "Sip. Üst Bil.";
      if (this.selectedComponent == "appOrderPreview") return "Sip. Detay";
    },
    stepNextName() {
      if (this.selectedComponent == "appOrderInformation") return "Sip. Detay";
      if (this.selectedComponent == "appOrderLines") return "Önizleme";
    },
    selectedPropsData() {}
  },
  methods: {
    stepOrderPre() {
      if (this.selectedComponent != "appOrderInformation") {
        if (this.selectedComponent == "appOrderPreview")
          this.selectedComponent = "appOrderLines";
        else if (this.selectedComponent == "appOrderLines")
          this.selectedComponent = "appOrderInformation";
      }
    },
    stepOrderNext() {
      if (this.selectedComponent != "appOrderPreview") {
        if (this.selectedComponent == "appOrderInformation") {
          // if (this.$store.getters.getNewOrderData.customer.cari_Recno == 0) {
          //   this.$vs.notify({
          //     title: "Eksik Bilgi",
          //     text: "Lütfen Müşteri Seçiniz !!",
          //     color: "warning",
          //     position: "top-center",
          //     icon:"warning"
          //   });
          //   return;
          // }
          // if (this.$store.getters.getNewOrderData.project.pro_kodu == "") {
          //   this.$vs.notify({
          //     title: "Eksik Bilgi",
          //     text: "Lütfen Proje Seçiniz !!",
          //     color: "warning",
          //     position: "top-center",
          //     icon:"warning"
          //   });
          //   return;
          // }
          this.selectedComponent = "appOrderLines";
        } else if (this.selectedComponent == "appOrderLines")
          this.selectedComponent = "appOrderPreview";
      }
    },
    random() {
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0, 255)},${getRandomInt(
        0,
        255
      )},${getRandomInt(0, 255)})`;

      this.$vs.notify({
        title: "Color",
        text: "Lorem ipsum dolor sit amet, consectetur",
        color: color
      });
    }
  },

  created() {},
  mounted() {
    // this.$nuxt.$emit("sendProjectDataCustomer", "MERHABA :DDD");
    // this.$nuxt.$on("selectCustomerData", data => {
    //   this.orderData["customer"] = data;
    // });
    // this.$nuxt.$on("sendProjectData", data => {
    //   this.orderData.project = data;
    // });
  }
};
</script>

<style scoped>
.card-footer * {
  font-size: 15px;
}

.card-footer button {
  background-color: #563d7c !important;
  outline-style: none !important;
}
.card-footer button:active {
  outline: none !important;
  border: none !important;
}
.card-footer button:focus {
  outline: 0 !important;
}

.card-body {
  overflow-y: scroll;
  overflow-x: hidden;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}
/****************************/
</style>
