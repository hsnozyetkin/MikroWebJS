<template>
    <div @click.stop="" class="productSelect shadow shadow-lg bg-white col-sm-12 col-md-8 col-lg-6">
        <div class="row text-center bg-light border-bottom">
            <div class="col-12 py-2">
                <strong>Stok Seçim</strong>
                <button @click="close" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col-12 text-left p-0 pt-2  pl-1 pr-3 pb-2">
                <select name="" id=""  v-model="selectedYuzeyGrubu" v-if="tip == 7" class="form-control form-control-sm mb-1">
                  <option value="pasif" disabled selected>Yüzey Grubu Seçiniz</option>
                  <option :value="yuzey.sto_kod" v-for="yuzey in getYuzeyGrubu" :key="yuzey.stoRECno"> {{ yuzey.sto_isim }} </option>
                </select>
                <input v-model="searchText" type="text" class="form-control form-control-sm" placeholder="Stok Ara" aria-label="" aria-describedby="basic-addon2">
            </div>
        </div>
        <div class="row bg-white ">
            <div class="col-12 productBody p-0" :style="bodyHeight">
                <ul class="list-group">
                  <li 
                    class="list-group-item p-1 my-1 mx-2" 
                    v-for="product in getStokListesi" 
                    :key="product.sto_kod"
                    @click="selectStok(product)"
                    >
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-md-3">
                          <img v-if="product.imageData" class="img-thumbnail" width="100" :src="product.imageData" />
                          <img v-else class="img-thumbnail" width="100" :src="$store.getters.getDefaultImage" />
                        </div>
                        <div class="col-md-9"> 
                             <strong>Stok Adı : </strong> {{ product.sto_isim }}
                            <br>
                            <strong>Miktar : </strong> <span class="badge badge-success">88</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
            </div>
        </div>              
    </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      searchText: "",
      windowHeight: 0,
      selectedYuzeyGrubu: null
    };
  },
  computed: {
    getYuzeyGrubu() {
      return this.$store.getters.getYuzeyGrubu;
    },
    getStokListesi() {
      switch (this.tip) {
        case 2:
          return this.$store.getters.getTakimListesi;
          break;
        case 3:
          return this.$store.getters.getKanatCinsi;
        case 7:
          return this.$store.getters.getYuzeyStokListesi;
        default:
          break;
      }
    },
    bodyHeight() {
      if (this.tip == 7) {
        // 'height' : tip == 7 ? (windowHeight - 140 ) : (windowHeight - 100 ) + 'px'
        return {
          height: this.windowHeight - 140 + "px"
        };
      } else {
        return {
          height: this.windowHeight - 100 + "px"
        };
      }
    }
  },
  methods: {
    showCustomerDetail(Recno) {
      this.active = true;
      console.log("Gelen Veri Tıklama", Recno);
      this.$nuxt.$emit("customerInfoShow" + Recno, Recno);
    },
    close() {
      this.$nuxt.$emit("popupSelect", null);
    },
    selectStok(product) {
      if (this.tip == 2) this.$nuxt.$emit("selectedTakimStok", product); // Doğrama Takım Seçimi
      if (this.tip == 3) this.$nuxt.$emit("selectedKanatStok", product); // Doğrama Kanat Seçimi
      if (this.tip == 7) this.$nuxt.$emit("selectedYuzeyStok", product); // Doğrama Yüzey Seçimi

      this.$nuxt.$emit("popupSelect", null);
    }
  },

  mounted() {
    console.log("Stok Seçim Mounted => ", this.tip);
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
      });
    });
  },
  created() {
    console.log("Stok Seçim Created => ", this.tip);
    this.windowHeight = window.innerHeight;
  },
  watch: {
    selectedYuzeyGrubu(value) {
      this.$store.dispatch("addYuzeyStokListesi", value);
    }
  }
};
</script>

<style scoped>
.productSelect {
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  opacity: initial !important;
}
.productBody {
  overflow-y: scroll;
}

.productBody li {
  transition: all 0.3s ease;
}
.productBody li:hover {
  border-color: #666;
  cursor: pointer;
  background-color: #afc3cc;
}
</style>
