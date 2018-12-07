<template>
    <div v-if="!isLoading" class="productListContainer col-sm-12 col-md-10 pt-5 mx-md-auto h-100">
        <div class="row w-100">
          <div class="col-12">
            <h3 class="">Stok Yönetimi</h3>
            <hr>
          </div>
        </div>
        <div class="row w-100">
            <div class="col-sm-12 col-md-3 mb-2">
              <select name="" id="" class="form-control w-100" v-model="filter">
                  <option disabled selected value="">Filtre Seçiniz</option>
                  <option value="stok">Stok Adı Filtrele</option>
                  <option value="anagrup">Ana Grubu Filtrele</option>
                  <option value="altgrup">Alt Grubu Filtrele</option>
              </select>
            </div>
            <div class="col-sm-12 col-md-9 mb-2">
              <input type="text" class="form-control" v-model="searchText">
            </div>
        </div>
        <app-product v-for="(product, index) in productList" :key="index" :product="product" :index="index" > </app-product>
        <div class="row w-100 ">
          <nav aria-label="Page navigation example" class="mx-auto">
            <ul class="pagination pagination-sm-lg">
              <li class="page-item" @click="currentPage=0">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li 
                  v-for="a in calc" 
                  :key="a*2" 
                  class="page-item"
                  :class=" { active : currentPage == a-1 } "
                  v-if="a-1 < currentPage + 4 && a-1 > currentPage - 4"
                  @click="currentPage = a-1"
                  >
                <a class="page-link" href="#" > 
                  {{ a }} 
                </a>
              </li>
              <li class="page-item" @click="currentPage=calc-1">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
          <button class="btn btn-success" > parça 1 </button>
          <button class="btn btn-primary" > parça 2 </button>
        </div>
    </div>
</template>


<script>
import Product from "../../components/products/Product";
import { mapGetters } from "vuex";
export default {
  components: {
    appProduct: Product
  },
  data() {
    return {
      products: [],
      pageList: [],
      offset: 10,
      val: 0,
      searchText: "",
      filter: "",
      isLoading: false,
      currentPage: 0
    };
  },
  computed: {
    ...mapGetters({
      productList: "getProductList"
    }),
    ProductsFilter() {
      return this.products.filter(element => {
        return element.sto_isim
          .toLowerCase()
          .match(this.searchText.toLowerCase());
      });
    },
    calc() {
      return Math.ceil(this.products.length / 10);
    }
  },
  watch: {
    currentPage() {
      const val = this.currentPage * this.offset;
      this.pageList = this.products.slice(val, val + this.offset - 1);
    },
    productList() {
      const val = this.currentPage * this.offset;
      this.pageList = this.products.slice(val, val + this.offset - 1);
    }
  },
  created() {
    // console.log("Stok Yönetim Created");
    // this.$store.dispatch("setProductList").then(() => {
    //   console.log("Ürünler Yüklendi");
    //   this.products = this.productList;
    //   console.log("Sayfalama işlemine geçildi");
    //   const val = this.currentPage * this.offset;
    //   this.pageList = this.products.slice(val, val + this.offset);
    //   console.log("Sayfalama Dizesi", this.pageList);
    // });
  },
  mounted() {
    console.log("mounted işlemi");
    const val = this.currentPage * this.offset;
    this.pageList = this.products.slice(val, val + this.offset);
  }
};
</script>

<style scoped>
</style>

