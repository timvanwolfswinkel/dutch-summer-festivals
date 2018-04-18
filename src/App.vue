<template>
  <div class="app">
    <page-transition>
      <router-view/>
    </page-transition>
  </div>
</template>

<script>
import PageTransition from "./components/transitions/PageTransition";

export default {
  name: "App",
  components: {
    PageTransition
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/global.scss";
</style>
