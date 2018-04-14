<template>
  <div class="columns">
    <div class="columns__column">
      <transition 
        :css="false"
        @leave="animateOut">
        <span 
          v-if="showIntro" 
          class="columns__background"/>
      </transition>
    </div>
    <div class="columns__column">
      <transition 
        :css="false"
        @leave="animateOut">
        <span 
          v-if="showIntro" 
          class="columns__background"/>
      </transition>
    </div>
    <div class="columns__column">
      <transition 
        :css="false"
        @leave="animateOut">
        <span 
          v-if="showIntro" 
          class="columns__background"/>
      </transition>
    </div>
    <div class="columns__column">
      <transition 
        :css="false"
        @leave="animateOut">
        <span 
          v-if="showIntro" 
          class="columns__background"/>
      </transition>
    </div>
    <div class="columns__column">
      <transition 
        :css="false"
        @leave="animateOut">
        <span 
          v-if="showIntro" 
          class="columns__background"/>
      </transition>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "Columns",
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
@import "src/assets/scss/components/columns.scss";
</style>
