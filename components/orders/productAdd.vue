<template>
  <div class="productAdd shadow shadow-lg bg-white position-absolute container px-sm-5 px-md-3">
    <div class="row text-center bg-light border-bottom py-2">
      <div class="col-12">
        <strong class="text-secondary">Yeni Satır</strong>
        <button
          @click="$store.commit('setProductSelected', false)"
          type="button"
          class="close"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 productBody px-0" :style="{ 'height' : (windowHeight - 100 ) + 'px'}">
        <div
          v-show="!$store.getters.getIsLoding"
          class="container-fluid h-100 px-md-0 position-relative"
        >
          <div class="row mx-md-0 py-3">
            <div class="col-sm-12 col-lg-4">
              <div
                @click="selectedType('appMamul')"
                class="productAddType flex-fill py-1 my-2 text-white text-center bg-info"
              >
                <span class="mx-1" v-if="selectedComponent == 'appMamul'">&#10003;</span>
                <span class="mx-1">Takım</span>
              </div>
            </div>
            <div class="col-sm-12 col-lg-4">
              <div
                @click="selectedComponent = 'appYariMamul'"
                class="productAddType flex-fill py-1 my-2 text-white text-center bg-primary"
              >
                <span class="mx-1" v-if="selectedComponent == 'appYariMamul'">&#10003;</span>
                <span class="mx-1">Toplama</span>
              </div>
            </div>
            <div class="col-sm-12 col-lg-4">
              <div
                @click="selectedComponent = 'appHammadde'"
                class="productAddType flex-fill py-1 my-2 text-white text-center bg-success"
              >
                <span class="mx-1" v-if="selectedComponent == 'appHammadde'">&#10003;</span>
                <span class="mx-1">Malzeme</span>
              </div>
            </div>
          </div>
          <div v-if="selectedComponent != ''" class="row mx-md-0">
            <div class="col-sm-12 col-md-4">
              <div class="form-group row">
                <label for="inputEn" class="col-sm-12 col-lg-3 col-form-label d-none d-sm-block">En</label>
                <div class="col-sm-12 col-lg-9">
                  <input
                    type="number"
                    class="form-control"
                    id="inputEn"
                    placeholder="En"
                    v-model="orderLine.en"
                  >
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="inputBoy"
                  class="col-sm-12 col-lg-3 col-form-label d-none d-sm-block"
                >Boy</label>
                <div class="col-sm-12 col-lg-9">
                  <input
                    type="number"
                    class="form-control"
                    id="inputBoy"
                    placeholder="Boy"
                    v-model="orderLine.boy"
                  >
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-group row">
                <label
                  for="inputBoy"
                  class="col-sm-12 col-lg-3 col-form-label d-none d-sm-block"
                >Miktar</label>
                <div class="col-sm-12 col-lg-9">
                  <input
                    type="number"
                    class="form-control"
                    id="inputMiktar"
                    placeholder="Miktar"
                    v-model="orderLine.miktar"
                  >
                </div>
              </div>
            </div>
          </div>
          <transition
            enter-class
            enter-active-class="animated faster fadeInRight"
            leave-class
            leave-active-class="animated faster fadeOutLeft"
            mode="out-in"
          >
            <app-mamul :orderLine="orderLine" v-if="selectedComponent == 'appMamul'"></app-mamul>
            <app-yari-mamul v-if="selectedComponent == 'appYariMamul'"></app-yari-mamul>
            <app-hammadde v-if="selectedComponent == 'appHammadde'"></app-hammadde>
            <!-- <component :is="selectedComponent">

            </component>-->
          </transition>
        </div>
      </div>
      <Loading/>
    </div>
    <div class="row">
      <div class="col-12">
        <button
          @click="EditAndNewLine"
          class="btn btn-outline-primary btn-block mb-2"
        >{{ duzenleKontrol ? 'Değişiklikleri Kaydet' : 'Ekle' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/loading";

import Mamul from "./product/mamul";
import YariMamul from "./product/yarimamul";
import Hammadde from "./product/hammadde";

export default {
  props: {
    satirDuzenle: {
      type: Number,
      required: false
    }
  },
  components: {
    appMamul: Mamul,
    appYariMamul: YariMamul,
    appHammadde: Hammadde,
    Loading
  },
  data() {
    return {
      searchText: "",
      windowHeight: 0,
      selectedComponent: "",
      takimStok: {
        sto_RECno: null,
        sto_kod: null,
        sto_isim: null,
        imageData: null
      },
      orderLine: {
        id: null,
        tip: null,
        sipStok: {
          sto_kod: null,
          sto_isim: null,
          sto_RECno: null,
          imageData: null
        },
        en: null,
        boy: null,
        miktar: null,
        takimGrubu: null,
        detail: {
          kanat: {
            kanatStok: {
              sto_kod: null,
              sto_isim: null,
              sto_RECno: null,
              imageData: null
            },
            yuzeyStok: {
              sto_kod: null,
              sto_isim: null,
              sto_RECno: null,
              imageData: null
            },
            cumbaStok: {
              sto_kod: null,
              sto_isim: null,
              sto_RECno: null,
              imageData: null
            }
          },
          kasa: null,
          pervaz: null
        }
      }
    };
  },
  computed: {
    duzenleKontrol() {
      if (this.satirDuzenle) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    selectedType(type) {
      this.selectedComponent = type;
    },
    EditAndNewLine() {
      let data = {
        orderLine: {
          id:
            this.satirDuzenle != null
              ? this.satirDuzenle
              : this.$store.getters.getOrderLines.length + 1,
          tip: this.selectedComponent,
          ...this.orderLine
        }
      };
      this.$store.commit("setNewOrderData", {
        data: data,
        editId: this.satirDuzenle
      });
      this.$store.commit("setProductSelected", false);
    }
  },
  mounted() {
    if (this.satirDuzenle != null) {
      console.log("Düzenleme Arama İşlemi => ");
      this.$store.getters.getOrderLines.forEach(satir => {
        console.log(typeof satir.id, typeof this.satirDuzenle);
        if (satir.id == this.satirDuzenle) {
          console.log("BULUNDU");
          this.orderLine = satir;
          this.selectedComponent = this.orderLine.tip;
        }
      });
    }
    // if (this.satirDuzenle) {
    //   console.log("productAdd SatirDüzenle => ", this.satirDuzenle);
    //   this.selectedComponent = this.satirDuzenle.tip;
    //   this.orderLine = { ...this.satirDuzenle };
    // }
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
      });
    });
  },
  created() {
    this.$nuxt.$on("selectedTakimStok", data => {
      this.orderLine.sipStok = data;
    });
    this.$nuxt.$on("selectedKanatStok", data => {
      this.orderLine.detail.kanat.kanatStok = { imageData: null, ...data };
    });
    this.$nuxt.$on("selectedYuzeyStok", data => {
      this.orderLine.detail.kanat.yuzeyStok = data;
    });

    this.$nuxt.$on("TakimGrubuDegisti", takimGrubu => {
      console.log("TAkim Değişti => ");
      this.orderLine = {
        sipStok: {
          sto_kod: null,
          sto_isim: null
        },
        en: this.orderLine.en,
        boy: this.orderLine.boy,
        miktar: this.orderLine.miktar,
        takimGrubu: takimGrubu,
        detail: {
          kanat: {
            kanatStok: {
              sto_kod: null,
              sto_isim: null
            },
            yuzeyStok: {
              sto_kod: null,
              sto_isim: null
            },
            cumbaStok: {
              sto_kod: null,
              sto_isim: null
            }
          },
          kasa: null,
          pervaz: null
        }
      };
    });

    this.windowHeight = window.innerHeight;
    // this.$store.dispatch("setProjectListData", this.customer);
    // this.$nuxt.$on("backProductAdd", () => {
    //   this.selectedComponent = "";
    // });
  },
  watch: {
    // orderLine(valu) {
    //   console.log("orderLine Değişim => ", valu);
    // }
  }
};
</script>

<style scoped>
.productAddType {
  cursor: pointer;
  border-radius: 20px;
  -webkit-box-shadow: 1px 1px 14px 0px rgba(199, 155, 199, 1);
  -moz-box-shadow: 1px 1px 14px 0px rgba(199, 155, 199, 1);
  box-shadow: 1px 1px 14px 0px rgba(199, 155, 199, 1);
}

.productAdd {
  /* top: 0;
  left: 0; */
  overflow: hidden;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 3px;
}
.productBody {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 10%;
  transition: all 0.3s;
}
.productBody li {
  cursor: pointer;
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

/* .effect {
  animation-duration: 1s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
} */
</style>
