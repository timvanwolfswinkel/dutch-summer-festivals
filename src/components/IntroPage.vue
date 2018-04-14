<template>
  <transition 
    :css="false"
    @leave="animateOut">
    <div 
      v-if="showIntro" 
      class="intro-page">
      <div class="intro-page__container">
        <h1 class="intro-page__header">The dutch like to party, hard.</h1>
        <span
          class="intro-page__button"
          @click="toggleIntro">Explore</span>
      </div>
    </div>
  </transition>
</template>

<script>
import anime from "animejs";

export default {
  name: "IntroPage",
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
    toggleIntro() {
      this.$store.dispatch("toggleIntro");
    },
    animateOut(el, done) {
      anime({
        targets: el,
        duration: 500,
        translateY: 75,
        opacity: 0,
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
@import "src/assets/scss/components/intro-page.scss";
</style>
