<template>
  <div class="app">
    <app-sidebar/>
    <transition 
      name="fade" 
      mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";

export default {
  name: "App",
  components: {
    "app-sidebar": SideBar
  }
};
</script>

<style lang="scss">
@import "scss/global.scss";

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
