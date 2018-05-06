<template>
  <transition 
    :css="false"
    @beforeEnter="setStyles"
    @enter="animateIn">
    <div style="opacity: 0; transform: translateX(50px)">
      <slot/>
    </div>
  </transition>
</template>

<script>
// TODO: organise delay within this component rather then hardcoded on the child elements
import anime from "animejs";

export default {
  name: "ElementTransition",
  props: {
    delay: {
      type: Number,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    setStyles(el) {
      const element = el;
      element.style.opacity = 0;
      element.style.translateX = 50;
    },
    animateIn(el, done) {
      anime({
        targets: el,
        duration: 600,
        delay: this.delay * 50 + 300,
        opacity: 1,
        translateX: 0,
        easing: "easeOutExpo",
        complete() {
          done();
        }
      });
    }
  }
};
</script>
