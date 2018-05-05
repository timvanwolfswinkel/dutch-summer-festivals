<template>
  <div>
    <div 
      ref="overlay"
      class="image-transition__overlay"
      style="transform:scaleY(0)"/>
    <transition 
      :css="false"
      @beforeEnter="prepareAnimation"
      @enter="animateIn"
      @afterEnter="updateImageAnimating"
      @beforeLeave="updateImageAnimating"
      @leave="animateOut"
      @afterLeave="updateImageAnimating">
      <slot/>
    </transition>
  </div>
</template>

<script>
import anime from "animejs";

// TODO: on enter fire a event to set a value which disables mouse over
// TODO: after leave fire a event to set the default value which enables mouse over again
// TODO: in parent fire event on mouse over only if value is false

export default {
  name: "ImageTransition",
  methods: {
    prepareAnimation(el) {
      this.updateImageAnimating();

      const overlay = this.$refs.overlay;
      const element = el;

      overlay.style.scaleY = 0;
      element.style.opacity = 0;
    },
    animateIn(el, done) {
      const animatedTransition = anime.timeline();
      const overlay = this.$refs.overlay;

      animatedTransition
        .add({
          targets: overlay,
          duration: 300,
          scaleY: 1,
          easing: "easeInOutQuad",
          complete() {
            overlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: el,
          duration: 50,
          opacity: 1,
          easing: "easeInQuad"
        })
        .add({
          targets: overlay,
          duration: 300,
          scaleY: 0,
          easing: "easeInOutQuad",
          complete() {
            overlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    },
    animateOut(el, done) {
      const animatedTransition = anime.timeline();
      const overlay = this.$refs.overlay;

      animatedTransition
        .add({
          targets: overlay,
          duration: 300,
          scaleY: 1,
          easing: "easeInOutQuad",
          complete() {
            overlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: el,
          duration: 50,
          opacity: 0,
          easing: "easeInQuad"
        })
        .add({
          targets: overlay,
          duration: 300,
          scaleY: 0,
          easing: "easeInOutQuad",
          complete() {
            overlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    },
    updateImageAnimating() {
      this.$store.dispatch("setImageAnimating");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/transitions/image-transition.scss";
</style>
