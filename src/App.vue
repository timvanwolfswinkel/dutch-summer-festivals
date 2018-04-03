<template>
  <div class="app">
    <app-sidebar/>
    <div 
      ref="purpleOverlay" 
      class="app__overlay app__overlay--purple" 
      style="transform:scaleX(0)"/>
    <transition 
      :css="false"
      @enter="enter">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import anime from "animejs";
import SideBar from "./components/SideBar";

export default {
  name: "App",
  components: {
    "app-sidebar": SideBar
  },
  methods: {
    enter(el, done) {
      const animatedTransition = anime.timeline();
      const purpleOverlay = this.$refs.purpleOverlay;

      animatedTransition
        .add({
          targets: purpleOverlay,
          duration: 600,
          delay: 500,
          scaleX: 1,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: purpleOverlay,
          duration: 600,
          delay: 50,
          scaleX: 0,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "scss/app.scss";
@import "scss/global.scss";
</style>
