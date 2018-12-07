<template>

</template>

<script>
// import Logo from '~/components/Logo.vue'
import { mapGetters, mapMutations } from "vuex";


export default {
  computed: {
    ...mapGetters(["getMenuVisible"])
  }
};
</script>

<style scoped>

</style>
