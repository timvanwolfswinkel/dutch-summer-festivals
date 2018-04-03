<template>
  <div class="app">
    <app-sidebar/>
    <page-transition>
      <router-view/>
    </page-transition>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import PageTransition from "./components/PageTransition";

export default {
  name: "App",
  components: {
    "app-sidebar": SideBar,
    "page-transition": PageTransition
  }
};
</script>

<style lang="scss">
@import "scss/app.scss";
@import "scss/global.scss";
</style>
