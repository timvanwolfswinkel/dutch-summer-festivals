<template>
  <div class="page-transition">
    <div 
      ref="purpleOverlay" 
      class="page-transition__overlay" 
      style="transform:scaleX(0)"/>
    <transition 
      :css="false"
      @beforeEnter="setOpacity"
      @enter="animateOverlay"
      @afterEnter="fadeIn"
      @leave="fadeOut">
      <slot/>
    </transition>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "PageTransition",
  methods: {
    setOpacity(el) {
      const element = el;

      element.style.opacity = 0;
    },
    animateOverlay(el, done) {
      const animatedTransition = anime.timeline();
      const purpleOverlay = this.$refs.purpleOverlay;

      animatedTransition
        .add({
          targets: purpleOverlay,
          duration: 500,
          delay: 500,
          scaleX: 1,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: purpleOverlay,
          duration: 500,
          delay: 50,
          scaleX: 0,
          easing: "easeOutExpo",
          complete() {
            purpleOverlay.style.transformOrigin = "100% 0";
            done();
          }
        });
    },
    fadeIn(el) {
      anime({
        targets: el,
        duration: 1000,
        opacity: 1,
        easing: "easeOutExpo"
      });
    },
    fadeOut(el, done) {
      anime({
        targets: el,
        duration: 500,
        opacity: 0,
        easing: "easeOutExpo",
        complete() {
          window.scrollTo(0, 0);
          done();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/page-transition.scss";
</style>
