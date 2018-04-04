<template>
  <div>
    <div 
      ref="blackOverlay"
      class="image-transition__overlay image-transition__overlay--black"
      style="transform:scaleX(1)"/>
    <div 
      ref="purpleOverlay"
      class="image-transition__overlay image-transition__overlay--purple"
      style="transform:scaleX(0)"/>
    <transition 
      :css="false"
      @enter="animateIn"
      @leave="animateOut">
      <slot/>
    </transition>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "ImageTransition",
  methods: {
    animateIn(el, done) {
      const animatedTransition = anime.timeline();
      const blackOverlay = this.$refs.blackOverlay;
      const purpleOverlay = this.$refs.purpleOverlay;

      purpleOverlay.style.scaleX = 0;

      animatedTransition
        .add({
          targets: purpleOverlay,
          duration: 600,
          delay: 250,
          scaleY: 1,
          easing: "easeOutExpo",
          complete() {
            console.log("purple-overlay-complete");
            purpleOverlay.style.transformOrigin = "0 100%";
            blackOverlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: [purpleOverlay, blackOverlay],
          duration: 600,
          delay: 50,
          scaleY: 0,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    },
    animateOut(el, done) {
      const animatedTransition = anime.timeline();
      const blackOverlay = this.$refs.blackOverlay;
      const purpleOverlay = this.$refs.purpleOverlay;

      animatedTransition
        .add({
          targets: [purpleOverlay, blackOverlay],
          duration: 600,
          delay: 500,
          scaleY: 1,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "0 100%";
            blackOverlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: purpleOverlay,
          duration: 600,
          delay: 50,
          scaleY: 0,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "100% 0";
            blackOverlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/image-transition.scss";
</style>
