<template>
  <panel 
    :show-panel="showMonthsPanel" 
    :panel="'months-list'"
    :position="'left'">
    <div
      class="months-list">
      <div 
        v-for="(month, index) in festivals" 
        :key="month.monthTitle"
        class="months-list__month">
        <element-transition :delay="index">
          <span class="months-list__title">{{ month.month }}</span>
          <span class="months-list__amount">{{ month.festivalsInMonth | getLength }}</span>
        </element-transition>
      </div>
    </div>
  </panel>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/months-list.scss";
</style>
