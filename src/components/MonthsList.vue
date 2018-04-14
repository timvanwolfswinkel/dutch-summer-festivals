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
import anime from "animejs";

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
      const container = document.getElementById("home");
      const list = document.getElementById("festivals-list");
      const element = document.getElementById(month);

      // TODO: check if window is not undefined
      const elementPosition = element.getBoundingClientRect().x;
      const listPosition = list.getBoundingClientRect().left;
      const containerPosition = container.getBoundingClientRect().left;

      const scrollTo =
        containerPosition - listPosition + (elementPosition - 500);

      anime({
        targets: container,
        scrollLeft: scrollTo,
        duration: 1000,
        easing: "easeOutCirc"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/months-list.scss";
</style>
