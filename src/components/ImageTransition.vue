<template>
  <div>
    <div 
      ref="blackOverlay"
      class="image-transition__overlay image-transition__overlay--black"
      style="transform:scaleX(0)"/>
    <div 
      ref="orangeOverlay"
      class="image-transition__overlay image-transition__overlay--orange"
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

// on enter fire a event to set a value which disables mouse over
// after leave fire a event to set the default value which enables mouse over again
// in parent fire event on mouse over only if value is false

export default {
  name: "ImageTransition",
  methods: {
    animateIn(el, done) {
      const animatedTransition = anime.timeline();
      const blackOverlay = this.$refs.blackOverlay;
      const orangeOverlay = this.$refs.orangeOverlay;

      orangeOverlay.style.scaleX = 0;

      animatedTransition
        .add({
          targets: orangeOverlay,
          duration: 600,
          delay: 250,
          scaleY: 1,
          easing: "easeOutExpo",
          complete() {
            console.log("purple-overlay-complete");
            orangeOverlay.style.transformOrigin = "0 100%";
            blackOverlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: [orangeOverlay, blackOverlay],
          duration: 600,
          delay: 50,
          scaleY: 0,
          easing: "easeOutExpo",
          complete() {
            orangeOverlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    },
    animateOut(el, done) {
      const animatedTransition = anime.timeline();
      const blackOverlay = this.$refs.blackOverlay;
      const orangeOverlay = this.$refs.orangeOverlay;

      animatedTransition
        .add({
          targets: orangeOverlay,
          duration: 600,
          delay: 500,
          scaleY: 1,
          easing: "easeOutExpo",
          complete() {
            orangeOverlay.style.transformOrigin = "0 100%";
            blackOverlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: [orangeOverlay, blackOverlay],
          duration: 600,
          delay: 50,
          scaleY: 0,
          easing: "easeOutExpo",
          complete() {
            orangeOverlay.style.transformOrigin = "100% 0";
            blackOverlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/image-transition.scss";
</style>
