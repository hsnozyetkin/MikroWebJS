<template>
    <div class="Menu position-absolute h-100 w-100">
        <div class=" text-white">
            <div id="headerContent" class="text-white  d-block"> <!-- fixed-top -->
                <div class="col-12 d-flex" style="height:50px">
                    <div class="d-flex flex-row flex-grow-1 px-3">
                        <router-link to="/" tag="div" @click.native="setmenuVisible(0)" class="head caption text-white" ><span>ORTAK GİRİŞİM</span></router-link>
                    </div>
                    <div class=""><a href="#menu" id="toggle" @click="setmenuVisible(1)"><span :class=" { MenuButtonAktif : !getMenuVisible, MenuButtonPasif : getMenuVisible } "></span></a></div>
                </div>
            </div>
            <div class="row mt-5 mx-1">
                <div class="col-md-4 col-sm-12 col-xs-12 mb-5">
                    <h5>Sipariş Yönetimi</h5>
                    <nuxt-link to="/order/new-order" tag="a" class="btn btn-primary mb-2 w-100" @click.native="setmenuVisible">Yeni Sipariş</nuxt-link>
                    <!-- <a href="#" class="btn btn-primary mb-2 w-100">Yeni Sipariş</a> -->
                    <a href="#" class="btn btn-success mb-2 w-100">Sipariş Listesi</a>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 mb-5">
                    <h5>Üretim Yönetimi</h5>
                    <a href="#" class="btn btn-warning mb-2 w-100">Aktif iş Emirleri</a>
                    <nuxt-link to="/products" tag="a" class="btn btn-info mb-2 w-100" @click.native="setmenuVisible">Stok Yönetimi</nuxt-link>
                    <!-- <router-link to="/products" tag="a" class="btn btn-info mb-2 w-100" @click.native="setmenuVisible">Stok Yönetimi</router-link> -->
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 mb-5">
                    <h5>Sevkiyat Planlama</h5>
                    <a href="#" class="btn btn-secondary mb-2 w-100">Sevkiyat Planı Hazırla</a>
                    <a href="#" class="btn btn-light mb-2 w-100">Sipariş Listesi</a>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getMenuVisible"])
  },
  methods: {
    ...mapMutations(["setmenuVisible"])
  }
};
</script>

<style scoped>
div#headerContent {
  height: 50px;
  background-color: #563d7c;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(86, 61, 124, 0.5);
  -moz-box-shadow: 0px 2px 5px 0px rgba(86, 61, 124, 0.5);
  box-shadow: 0px 1px 0px 0px rgba(86, 61, 124, 0.5);
}

.head {
  font-weight: bold;
  color: #caa0a8;
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  line-height: 50px;
  cursor: pointer;
}
.Menu {
  background-color: #563d7c;
  overflow: auto;
  z-index: 1000;

}
img {
  width: 50px;
}

/* Important styles */
#toggle {
  display: block;
  width: 28px;
  height: 50px;
  margin: 20px;
  position: relative;
  /* z-index: 9999; */
}

#toggle span:after,
#toggle span:before {
  content: "";
  position: absolute;
  left: 0;
  top: -9px;
}
#toggle span:after {
  top: 9px;
}
#toggle span {
  position: relative;
  display: block;
}

span.MenuButtonAktif:before,
span.MenuButtonAktif:after {
  background-color: #626d86;
}

span.MenuButtonPasif:before,
span.MenuButtonPasif:after {
  background-color: #4defc7;
}

#toggle span,
#toggle span:after,
#toggle span:before {
  width: 100%;
  height: 5px;
  transition: all 0.3s;
  background-color: #4defc7;
  backface-visibility: hidden;
  border-radius: 2px;
}

/* on activation */
#toggle.on span {
  background-color: transparent;
}
#toggle.on span:before {
  transform: rotate(45deg) translate(5px, 5px);
}
#toggle.on span:after {
  transform: rotate(-45deg) translate(7px, -8px);
}
#toggle.on + #menu {
  opacity: 1;
  visibility: visible;
}

/* menu appearance*/
#menu {
  position: relative;
  color: #999;
  width: 200px;
  padding: 10px;
  margin: auto;
  font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans",
    "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
  text-align: center;
  border-radius: 4px;
  background: white;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  /* just for this demo */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s;
}
#menu:after {
  position: absolute;
  top: -15px;
  left: 95px;
  content: "";
  display: block;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid white;
}
</style>
