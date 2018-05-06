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
      <h1 class="intro__header">
        <text-transition>
          Your complete festival overview.
        </text-transition>
      </h1>
      <span class="intro__description" >
        <text-transition padding="0px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </text-transition>
      </span>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import TextTransition from "../../components/transitions/TextTransition";

export default {
  name: "Intro",
  components: {
    TextTransition
  },
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
@import "src/assets/scss/components/overview/intro.scss";
</style>
