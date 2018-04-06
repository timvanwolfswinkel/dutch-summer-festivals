<template>
  <router-link :to=" {name: 'Home' }">
    <span class="back-button">Go Back</span>
  </router-link>
</template>

<script>
export default {
  name: "BackButton"
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/back-button.scss";
</style>
