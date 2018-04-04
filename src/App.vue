<template>
  <div class="app">
    <page-transition>
      <router-view/>
    </page-transition>
  </div>
</template>

<script>
import PageTransition from "./components/PageTransition";

export default {
  name: "App",
  components: {
    PageTransition
  }
};
</script>

<style lang="scss">
@import "scss/global.scss";
</style>
