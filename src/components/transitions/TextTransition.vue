<template>
  <div 
    v-split-text="{background: background, 
                   paddingTop: paddingTop, 
                   paddingLeft: paddingLeft, 
                   paddingRight: paddingRight, 
                   marginBottom: marginBottom}"
    v-observe-visibility="visibilityChanged" 
    ref="text">
    <slot/>
  </div>
</template>

<script>
import anime from "animejs";
// TODO: Add polyfill for Intersection Observer API
import { ObserveVisibility } from "vue-observe-visibility";

import splitText from "../../directives/splitText";

export default {
  name: "TextTransition",
  directives: {
    splitText,
    ObserveVisibility
  },
  props: {
    background: {
      type: Boolean,
      default: false,
      required: false,
      validate(value) {
        return [value];
      }
    },
    paddingTop: {
      type: String,
      default: "10px",
      required: false,
      validate(value) {
        return [value];
      }
    },
    paddingLeft: {
      type: String,
      default: "10px",
      required: false,
      validate(value) {
        return [value];
      }
    },
    paddingRight: {
      type: String,
      default: "10px",
      required: false,
      validate(value) {
        return [value];
      }
    },
    marginBottom: {
      type: String,
      default: "5px",
      required: false,
      validate(value) {
        return [value];
      }
    },
    delay: {
      type: Number,
      default: 0,
      required: false,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    visibilityChanged(isInViewport, entry) {
      console.log(entry);

      if (isInViewport) {
        this.animateTextIn();
      }
    },
    animateTextIn() {
      const words = this.$refs.text.getElementsByClassName(
        "text-transition__word"
      );
      let letters = [];
      const delay = this.$props.delay;

      // iterate through all words within text
      for (let i = 0; i < words.length; i += 1) {
        const lettersInWords = words[i].children;

        // put letters within word into an array
        for (let x = 0; x < lettersInWords.length; x += 1) {
          letters.push(lettersInWords[x]);
        }
      }

      // animate letters with a stagger effect
      anime({
        targets: [letters],
        duration: 250, // TODO: create calculation based on amount of letters (so longer sentences animate faster)
        delay(target, index) {
          return 500 + delay + index * 25;
        },
        opacity: 1,
        translateY: 0,
        easing: "easeOutExpo"
      });

      letters = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/transitions/text-transition.scss";
</style>
