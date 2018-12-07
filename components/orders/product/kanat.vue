<template>
  <div>
    <div class="row mx-md-0">
      <div class="col-12">
        <div v-if="cagiran != 0" class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Kanat Grubu</label>
          </div>
          <select name id class="custom-select">
            <option value="pasif" disabled selected>Kanat Cinsini Seçiniz</option>
            <option>
              <!-- {{ kanat.sto_isim }}  -->
            </option>
          </select>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Kanat Seçimi</label>
          </div>
          <input
            v-model="kanat.kanatStok.sto_isim"
            type="text"
            class="form-control bg-white"
            disabled
            aria-label="Takım Cinsi"
          >
          <div class="input-group-append">
            <button @click="selectKanatCinsi" class="btn btn-outline-primary" type="button">...</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-md-0">
      <div class="col-12">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Yüzey Seçimi</label>
          </div>
          <input
            v-model="kanat.yuzeyStok.sto_isim"
            type="text"
            class="form-control bg-white"
            disabled
            aria-label="Yüzey Cinsi"
          >
          <div class="input-group-append">
            <button @click="selectYuzey" class="btn btn-outline-primary" type="button">...</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-md-0">
      <div class="col-12">
        <hr>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    kanat: {
      type: Object,
      required: false
    },
    cagiran: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      selectedKanatCinsi: "",
      selectedYuzeyCinsi: ""
    };
  },
  computed: {
    // getKanat() {
    //   return this.$store.getters.getKanatType;
    // }
  },
  methods: {
    selectKanatCinsi() {
      this.$nuxt.$emit("popupSelect", 3);
    },
    selectYuzey() {
      this.$nuxt.$emit("popupSelect", 7);
    }
  },
  created() {
    if (this.selectTakimGrubu) {
    }
  }
};
</script>