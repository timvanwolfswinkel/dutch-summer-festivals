<template>
  <div>
    <div 
      ref="overlay"
      class="image-transition__overlay"
      style="transform:scaleY(0)"/>
    <transition 
      :css="false"
      @beforeEnter="setStyles"
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
    // TODO: Disable toggle image when animating the elements in/out (state)
    setStyles(el) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/image-transition.scss";
</style>
