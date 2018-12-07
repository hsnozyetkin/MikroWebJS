<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <button @click="Kaydet" class="btn btn-success btn-sm">Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    Kaydet() {
      this.$axios
        .get(
          "/order/Save/" + JSON.stringify(this.$store.getters.getNewOrderData)
        )
        .then(result => {
          console.log("Kaydet Cevabı => ", result);
        })
        .catch(err => {});
    }
  }
};
</script>
