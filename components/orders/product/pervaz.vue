<template>
    <div class="row mx-md-0 pt-3">
        <div class="col-12">
            <div class="card text-center">
                <div class="card-header py-1">
                    Pervaz Özellikleri
                </div>
                <div class="card-body px-1">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Pervaz Cinsi</label>
                                </div>
                                <select name="" id="" v-model="selectedPervazType" class="custom-select">
                                <option value="pasif" disabled selected>Pervaz Cinsini Seçiniz</option>
                                <option 
                                    v-for="(pervaz, index) in getPervaz" 
                                    :value="pervaz.sto_kod" 
                                    :key="index"
                                > 
                                    {{ pervaz.sto_isim }} 
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
      selectedPervazType: ""
    };
  },
  computed: {
    getPervaz() {
      return this.$store.getters.getPervazType;
    }
  }
};
</script>