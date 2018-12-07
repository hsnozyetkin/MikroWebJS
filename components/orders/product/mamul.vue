<template>
  <div>
    <div class="row mx-md-0">
      <div class="col-12">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Takım Grubu</label>
          </div>
          <select id="takim" name="takimsecim" v-model="selectTakimGrubu" class="custom-select">
            <option value="pasif" disabled selected>Takım Cinsini Seçiniz</option>
            <option
              v-for="product in productType"
              :value="product.sto_kod"
              :key="product.sto_RECno"
            >{{ product.sto_isim }}</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Takım Seçimi</label>
          </div>
          <input
            v-model="orderLine.sipStok.sto_isim"
            type="text"
            class="form-control bg-white"
            disabled
            aria-label="Takım Cinsi"
          >
          <div class="input-group-append">
            <button @click="takimSelect" class="btn btn-outline-primary" type="button">...</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-md-0 px-1">
      <div class="col-12">
        <hr>
      </div>
    </div>
    <transition-group
      enter-class
      enter-active-class="animated faster fadeInRight"
      leave-class
      leave-active-class="animated faster fadeOutLeft"
      mode="out-in"
    >
      <kanat
        v-if="selectTakimGrubu != 'pasif'"
        key="kanat"
        :kanat="orderLine.detail.kanat"
        :cagiran="0"
      />
      <!-- <kasa 
        :productType="selectTakimGrubu"
        v-if="selectTakimGrubu != 'pasif'" 
        key="kasa"
      />
      <pervaz 
        v-if="selectTakimGrubu != 'pasif'" 
        key="pervaz"
      />-->
    </transition-group>
  </div>
</template>

<script>
import Kanat from "./kanat";
import Kasa from "./kasa";
import Pervaz from "./pervaz";

export default {
  props: {
    orderLine: {
      type: Object,
      required: true
    }
  },
  components: {
    Kanat,
    Kasa,
    Pervaz
  },
  data() {
    return {
      selectTakimGrubu: "pasif"
    };
  },
  computed: {
    productType() {
      return this.$store.getters.getTakimGrubu;
    }
  },
  methods: {
    backProduct() {
      this.$nuxt.$emit("backProductAdd");
    },
    takimSelect() {
      this.$nuxt.$emit("popupSelect", 2);
    }
  },
  created() {
    this.$store.dispatch("addTakimGrubu");
    this.selectTakimGrubu = this.orderLine.takimGrubu;
  },
  watch: {
    selectTakimGrubu(newValue, oldValue) {
      if (oldValue != "pasif") {
        this.$nuxt.$emit("TakimGrubuDegisti", this.selectTakimGrubu);
        this.$store.dispatch("addTakimCinsi", this.selectTakimGrubu);
        this.$store.dispatch("addKanatCinsi", this.selectTakimGrubu);
        this.$store.dispatch("addYuzeyGrubu", this.selectTakimGrubu);
        this.$store.dispatch("addYuzeyStokListesi", null);
      }

      // this.$store.dispatch("addKanatType", this.selectedProductType);
      // this.$store.dispatch("addPervazType", this.selectedProductType);
    }
  }
};
</script>

<style scoped>
/* button {
  background-image: url("data:image/png;base64,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");
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;
  outline: none !important;
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
} */
</style>
