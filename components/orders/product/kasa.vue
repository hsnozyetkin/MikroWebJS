<template>
    <div class="row mx-md-0 pt-3">
        <div class="col-12">
            <div class="card text-center">
                <div class="card-header py-1">
                    Kasa Özellikleri
                </div>
                <div class="card-body px-1">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Kasa Eni</label>
                                </div>
                                <select name="" id="" v-model="selectedKasaMost" class="custom-select">
                                    <option value="pasif" disabled selected>Kasa Eni Seçiniz</option>
                                    <option value="10"> 10 </option>
                                    <option value="12"> 12 </option>
                                    <option value="16"> 16 </option>
                                    <option value="18"> 18 </option>
                                    <option value="20"> 20 </option>
                                    <option value="22"> 22 </option>
                                    <option value="24"> 24 </option>
                                </select>
                            </div>                                     
                        </div>
                        <div class="col-sm-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Kasa Cinsi</label>
                                </div>
                                <select name="" id="" v-model="selectedKasaType" class="custom-select">
                                <option value="pasif" disabled selected>Kasa Cinsini Seçiniz</option>
                                <option 
                                    v-for="(kasa, index) in getKasa" 
                                    :value="kasa.sto_kod" 
                                    :key="index"
                                > 
                                    {{ kasa.sto_isim }} 
                                </option>
                                </select>
                            </div>                    
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      selectedKasaType: "",
      selectedKasaMost: ""
    };
  },
  props: {
    productType: {
      type: String,
      required: false
    }
  },
  computed: {
    getKasa() {
      return this.$store.getters.getKasaType;
    }
  },
  watch: {
    selectedKasaMost() {
      this.$store.dispatch(
        "addKasaType",
        JSON.stringify({
          productType: this.productType,
          kasaMost: this.selectedKasaMost
        })
      );
    },
    productType() {
      (this.selectedKasaMost = ""), (this.selectedKasaType = "");
    }
  }
};
</script>