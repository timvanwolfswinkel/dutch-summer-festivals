<template>
  <div class="intro">
    <transition 
      :css="false"
      @leave="animateOut">
      <div 
        v-if="showIntro"  
        class="intro__background"/>
    </transition>
    <div class="intro__container">
      <h1 class="intro__header">Your complete festival overview.</h1>
      <span class="intro__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "Intro",
  props: {
    showIntro: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    animateOut(el, done) {
      anime({
        targets: el,
        duration: 500,
        delay: 1000,
        width: 0,
        easing: "easeOutExpo",
        complete() {
          done();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/intro.scss";
</style>
