<template>
    <div @click.stop="" class="customerSelect shadow shadow-lg container position-absolute mt-3 bg-white">
        <div class="row text-center bg-light border-bottom py-2">
            <div class="col-12">
                <strong>Cari Seçim</strong>
                <button @click="close" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col-12 text-left">
                <input v-model="searchText" type="text" class="form-control" placeholder="Müşteri Ara" aria-label="Recipient's username" aria-describedby="basic-addon2">
            </div>
        </div>
        <div class="row bg-white">
            <div class="col-12 customerBody" :style="{ 'height' : (windowHeight - 200 ) + 'px'}">
                <ul class="list-group">
                <app-customer-list  
                    v-for="customer in customerFilter" 
                    :key="customer.cari_Recno"
                    :customer="customer"
                    @click.native="showCustomerDetail(customer.cari_Recno)"
                    @dblclick.native="selectCustomer"
                >
                </app-customer-list>
                </ul>
            </div>
        </div>              
    </div>
</template>

<script>
import CustomerList from "./customerList";

import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      windowHeight: 0
    };
  },
  components: {
    appCustomerList: CustomerList
  },
  computed: {
    ...mapGetters(["getDarknes", "getCustomerSelected", "getCustomerList"]),
    customerFilter() {
      return this.getCustomerList.filter(element => {
        return element.cari_unvan1
          .toLowerCase()
          .match(this.searchText.toLowerCase());
      });
    }
  },
  methods: {
    ...mapMutations(["setDarknes", "setCustomerSelected"]),
    showCustomerDetail(Recno) {
      this.active = true;
      console.log("Gelen Veri Tıklama", Recno);
      this.$nuxt.$emit("customerInfoShow" + Recno, Recno);
    },
    close() {
      this.$nuxt.$emit("popupSelect", null);
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
      });
    });
  },
  created() {
    this.windowHeight = window.innerHeight;
  }
};
</script>

<style scoped>
.customerDetail {
  border-left: solid 5px #563d7c;
}
.customerSelect {
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  border-radius: 10px;
  opacity: initial !important;
}
.customerBody {
  overflow-y: scroll;
}

tbody tr {
  cursor: pointer;
}
</style>
