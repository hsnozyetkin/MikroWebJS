<template>
    <div 
      v-if="data != null"
      @click="data= null"
      class=" w-100 h-100 selectBox shadow shadow-lg position-absolute" >
      <customer-select v-if="data == 0" />
      <project-select v-if="data == 1" />
      <ProductSelect :tip="data" v-if="data != 0 && data != 1" />
    </div>
</template>

<script>
import CustomerSelect from "@/components/orders/customerSelect";
import ProjectSelect from "@/components/orders/projectSelect";
import ProductSelect from "@/components/products/ProductSelect";

export default {
  components: {
    CustomerSelect,
    ProjectSelect,
    ProductSelect
  },
  data() {
    return {
      windowHeight: 0,
      popupShow: null,
      data: null
    };
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
      });
    });
  },
  created() {
    this.$nuxt.$on("popupSelect", data => {
      console.log("Stok SDeç Geldi", typeof data);
      this.data = data;
      // switch (data) {
      //   case 0:
      //     this.popupShow = "CustomerSelect";
      //     break;
      //   case 1:
      //     this.popupShow = "ProjectSelect";
      //     break;
      //   case 2:
      //     this.popupShow = "ProductSelect";
      //     break;
      //   default:
      //     this.popupShow = null;
      //     break;
      // }
    });
  }
};
</script>

<style scoped>
.selectBox {
  overflow: hidden;
   top: 0%;
  left: 0%;
  /*transform: translate(-50%, -50%); */
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.1) !important;
}
.customerBody {
  overflow-y: scroll;
}

tbody tr {
  cursor: pointer;
}
</style>
