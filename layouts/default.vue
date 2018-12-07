<template>
  <div id="wrapper" class="container-fluid d-flex flex-column align-items-stretch w-100 h-100 p-0">
    <!-- <ContainerTopLeft />
    <ContainerTopCenter />
    <ContainerTopRight />
    <ContainerBottomLeft />
    <ContainerBottomCenter />
    <ContainerBottomRight /> -->
    <top-menu v-if="getMenuVisible"></top-menu>
    <Header></Header>
    <app-content v-if="!getMenuVisible">
      <nuxt/>
    </app-content>
    <div @click="close" v-if="getDarknes" class="darknes h-100 w-100 bg-dark position-absolute">

    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import ContainerTopLeft from '@/components/MesajKutusu/containerTopLeft'
// import ContainerTopCenter from '@/components/MesajKutusu/containerTopCenter'
// import ContainerTopRight from '@/components/MesajKutusu/containerTopRight'
// import ContainerBottomLeft from '@/components/MesajKutusu/containerBottomLeft'
// import ContainerBottomCenter from '@/components/MesajKutusu/containerBottomCenter'
// import ContainerBottomRight from '@/components/MesajKutusu/containerBottomRight'

import Content from "../components/shared/Content";
import Header from "../components/shared/Header";
import TopMenu from "../components/shared/TopMenu";
export default {
  components: {
    Header,
    topMenu: TopMenu,
    appContent: Content,
    // ContainerTopLeft,
    // ContainerTopCenter,
    // ContainerTopRight,
    // ContainerBottomLeft,
    // ContainerBottomCenter,
    // ContainerBottomRight
  },
  computed: {
    ...mapGetters(["getMenuVisible", "getDarknes"])
  },
  methods: {
    ...mapMutations([
      "setDarknes",
      "setCustomerSelected",
      "setProjectSelected",
      "setProductSelected"
    ]),
    close() {
      this.setDarknes(false);
      this.setCustomerSelected(false);
      this.setProjectSelected(false);
      this.setProductSelected(false);
    }
  }
};
</script>

<style>
/*     DArknes    */
.darknes {
  z-index: 1;
  opacity: 0.3;
}
/**********************************/
div#__nuxt {
  width: 100%;
  height: 100%;
}

#__layout {
  width: 100%;
  height: 100%;
}

#wrapper {
  overflow: scroll;
  width: 100%;
  height: 100%;
  overflow: auto;
}

html,
body {
  font-family: sans-serif;
  height: 100%;
}
/*********MEnü ***************/

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
