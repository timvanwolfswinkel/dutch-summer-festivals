<template>
  <panel 
    :show-panel="showMonthsPanel" 
    :panel="'months-list'"
    :position="'left'">
    <div
      class="months-list">
      <div 
        v-for="(month, index) in festivals" 
        :key="month.month"
        class="months-list__month"
        @click="scrollToElement(month.month)">
        <element-transition :delay="index">
          <span class="months-list__title">{{ month.month }}</span>
          <span class="months-list__amount">{{ month.festivalsInMonth | getLength }}</span>
        </element-transition>
      </div>
    </div>
  </panel>
</template>

<script>
// import anime from "animejs";

import Panel from "../components/Panel";
import ElementTransition from "../components/ElementTransition";

export default {
  name: "MonthsList",
  components: {
    Panel,
    ElementTransition
  },
  props: {
    showMonthsPanel: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
    festivals: {
      type: [Array, Promise],
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    scrollToElement(month) {
      console.log(month);

      const list = document.getElementById("festivals-list");
      const element = document.getElementById(month);
      // const scroll = document.documentElement.scrollTop;
      const position = element.getBoundingClientRect();
      const listPosition = list.getBoundingClientRect();

      // console.log(element);
      // console.log(scroll);
      console.log(position.x);
      console.log(listPosition.x);

      // anime({
      //   targets: list,
      //   x: -2000,
      //   duration: 350,
      //   easing: "easeInOutCubic"
      //   // update: () => window.scroll(0, scroll.x)
      // });

      // document.getElementById(month).scrollIntoView();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/months-list.scss";
</style>
