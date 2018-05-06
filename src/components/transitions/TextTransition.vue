<template>
  <div 
    v-split-text="{background: background, padding: padding}"
    v-observe-visibility="visibilityChanged" 
    ref="text">
    <slot/>
  </div>
</template>

<script>
import anime from "animejs";
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
    padding: {
      type: String,
      default: "10px",
      required: false,
      validate(value) {
        return [value];
      }
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  mounted() {
    // give some extra time for DOM manipulations
    // setTimeout(() => {
    //   this.animateTextIn();
    // }, 100);
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      console.log(entry);

      if (isVisible) {
        this.animateTextIn();
      }
    },
    animateTextIn() {
      const words = this.$refs.text.getElementsByClassName(
        "text-transition__word"
      );
      let letters = [];

      // iterate through all words within text
      for (let i = 0; i < words.length; i += 1) {
        const lettersInWords = words[i].children;

        // put letters within word into an array
        for (let x = 0; x < lettersInWords.length; x += 1) {
          letters.push(lettersInWords[x]);
        }

        // animate letters with a stagger effect
        anime({
          targets: [letters],
          duration: 250,
          delay(target, index) {
            return 500 + index * 25;
          },
          opacity: 1,
          translateY: 0,
          easing: "easeOutExpo"
        });

        letters = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/transitions/text-transition.scss";
</style>
