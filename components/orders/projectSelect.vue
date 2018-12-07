<template>
  <div @click.stop class="projectSelect shadow shadow-lg container position-absolute bg-white">
    <div class="row text-center bg-light border-bottom py-2">
      <div class="col-12">
        <strong>Proje Seçim</strong>
        <button @click="close" type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="col-12 text-left">
        <input
          v-model="searchText"
          type="text"
          class="form-control"
          placeholder="Proje Ara"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12 projectBody" :style="{ 'height' : (windowHeight - 150 ) + 'px'}">
        <ul v-if="projectFilter.length > 0" class="list-group">
          <li
            v-for="(project, index) in projectFilter"
            :key="index"
            class="list-group-item list-group-item-action mt-1"
            @click="selectedProject(project)"
          >{{ project.pro_adi }}</li>
        </ul>
        <div v-if="projectFilter.length == 0">
          <div class="alert alert-warning mt-3">Seçili cariye ait proje kartı bulunmamaktadır...</div>
        </div>
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
      windowHeight: 0,
      customer: null
    };
  },
  props: ["orderData"],
  computed: {
    ...mapGetters(["getDarknes", "getProjectSelected", "getProjectList"]),
    projectFilter() {
      return this.getProjectList.filter(element => {
        return element.pro_adi
          .toLowerCase()
          .match(this.searchText.toLowerCase());
      });
    }
  },
  methods: {
    ...mapMutations(["setDarknes", "setProjectSelected"]),
    selectedProject(project) {
      console.log("Seçilen Proje => ", project);
      let data = {
        project: project
      };
      console.log("Oluşan Data proje Seçim => ", data);
      this.$store.commit("setNewOrderData", {
        data,
        editId: null
      });
      this.$nuxt.$emit("popupSelect", null);
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
.projectSelect {
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  border-radius: 10px;
}
.projectBody {
  overflow-y: auto;
  max-height: 10%;
  transition: all 0.3s;
}
.projectBody li {
  cursor: pointer;
}
</style>
