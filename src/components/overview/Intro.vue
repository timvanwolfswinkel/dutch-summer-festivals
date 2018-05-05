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
      <h1  
        v-split-text
        ref="header" 
        class="intro__header">
        Your complete festival overview.
      </h1>
      <span 
        v-split-text
        ref="description"
        class="intro__description" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import splitText from "../../directives/splitText";

export default {
  name: "Intro",
  directives: {
    splitText
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
  mounted() {
    setTimeout(() => {
      this.animateHeaderIn();
      this.animateDescriptionIn();
    }, 100);
  },
  methods: {
    animateHeaderIn() {
      const parent = this.$refs.header.getElementsByClassName(
        "festival-item__word"
      );
      let test = [];

      for (let i = 0; i < parent.length; i += 1) {
        const childs = parent[i].children;

        for (let x = 0; x < childs.length; x += 1) {
          test.push(childs[x]);
        }

        anime({
          targets: [test],
          duration: 250,
          delay(target, index) {
            return 500 + index * 25;
          },
          opacity: 1,
          translateY: 0,
          easing: "easeOutExpo"
        });

        test = [];
      }
    },
    animateDescriptionIn() {
      const parent = this.$refs.description.getElementsByClassName(
        "festival-item__word"
      );
      let test = [];

      for (let i = 0; i < parent.length; i += 1) {
        const childs = parent[i].children;

        for (let x = 0; x < childs.length; x += 1) {
          test.push(childs[x]);
        }

        anime({
          targets: [test],
          duration: 250,
          delay(target, index) {
            return 500 + index * 25;
          },
          opacity: 1,
          translateY: 0,
          easing: "easeOutExpo"
        });

        test = [];
      }
    },
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
