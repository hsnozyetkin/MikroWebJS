<template>
  <div class="containerMessage position-fixed alert alert-success">Yukarı Sağ</div>
</template>

<script>
export default {
  name: 'TopRight'
}
</script>

<style scoped>
.containerMessage {
  top: 0;
  right: 0;
  max-width: 350px;
  min-width: 200px;
  z-index: 20000;
}
</style>