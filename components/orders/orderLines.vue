<template>
  <div class="container-fluid h-100">
    <transition name="fade" type="transition">
      <app-product-add :satirDuzenle="satirDuzenle" v-if="getProductSelected"></app-product-add>
    </transition>
    <div class="row">
      <div class="col-12">
        <div class="container-fluid p-0">
          <div
            class="row border rounded bg-light orderLine px-1 py-3 my-1"
            :class=" { 'border-primary' : showDetail == line.id } "
            v-for="line in orderLines"
            :key="line.id"
          >
            <div class="col-12 p-0">
              <div class="container-fluid px-1">
                <div class="row py-1">
                  <div class="col-sm-12 col-md-8">{{ line.sipStok.sto_isim }}</div>
                  <div class="col-sm-12 col-md-4 d-flex justify-content-end">
                    <div><span class="badge py-1 px-2 mx-1 badge-primary ">En : {{ line.en }}</span></div>
                    <div><span class="badge py-1 px-2 mx-1 badge-success">Boy : {{ line.boy }}</span></div>
                    <div><span class="badge py-1 px-2 mx-1 badge-secondary">Miktar : {{ line.miktar }}</span></div>
                  </div>
                </div>
                <div
                  class="row detail"
                  :style=" { 'height': showDetail == line.id ? 'auto' : '0' } "
                >
                  <div class="col-sm-12">
                    <div class="media border my-md-1 p-md-2">
                      <img
                        class="img-thumbnail mr-2"
                        :src="line.detail.kanat.kanatStok.imageData == null ? getImage : line.detail.kanat.kanatStok.imageData"
                        alt="Generic placeholder image"
                      >
                      <div class="media-body">
                        <h6 class="text-info">Kanat Bilgileri</h6>
                        <span>{{ line.detail.kanat.kanatStok.sto_isim }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="media border my-md-1 p-md-2">
                      <img
                        class="img-thumbnail mr-2"
                        :src="line.detail.kanat.yuzeyStok.imageData == null ? getImage : line.detail.kanat.yuzeyStok.imageData"
                        alt="Generic placeholder image"
                      >
                      <div class="media-body">
                        <h6 class="text-info">Yüzey Bilgileri</h6>
                        <span>{{ line.detail.kanat.yuzeyStok.sto_isim }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button
                      class="btn btn-sm btn-primary"
                      @click="showDetail = showDetail == line.id ? null : line.id"
                    >Detaylar</button>
                    <button class="btn btn-sm btn-secondary" @click="newLineCopy(line)">Kopyala</button>
                    <button class="btn btn-sm btn-warning" @click="editLine(line.id)">Düzenle</button>
                    <button class="btn btn-sm btn-dark" @click="removeLine(line.id)">Sil</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <button @click="newLine" class="btn btn-primary btn-sm">Satır Ekle</button>
            </div>
          </div>
          <div class="row">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductAdd from "./productAdd";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      satirDuzenle: null,
      showDetail: null
    };
  },
  components: {
    appProductAdd: ProductAdd
  },
  computed: {
    ...mapGetters(["getProductSelected"]),
    orderLines() {
      return this.$store.getters.getOrderLines;
    },
    getImage() {
      return this.$store.getters.getDefaultImage;
    }
  },
  methods: {
    ...mapMutations(["setDarknes", "setProductSelected"]),
    newLine() {
      this.satirDuzenle = null;
      this.setProductSelected(true);
    },
    newLineCopy(line) {
      this.$store.commit("orderLineCopy", {
        ...line,
        id: this.$store.getters.getOrderLines.length + 1
      });
    },
    removeLine(id) {
      this.$store.commit("orderLineRemove", id);
    },
    editLine(id) {
      this.satirDuzenle = id;
      this.setProductSelected(true);
    }
  },
  watch: {
    getProductSelected(value) {
      if (value) {
        this.setDarknes(true);
      } else {
        this.setDarknes(false);
      }
    }
  }
};
</script>

<style scoped>
.media img {
  width: 8% !important;
}
.detail {
  height: 0;
  overflow: hidden;
  transition: height 2s;
}

.orderLine button {
  padding: 0.1rem 0.5rem;
}
</style>