<template>
  <div
    v-if="!loading" 
    class="festivals-list">
    <intro/>
    <div 
      v-for="month in festivals" 
      :key="month.monthTitle"
      class="festivals-list__month">
      <columns/>
      <span class="festivals-list__month-title">{{ month.month | uppercase }}</span>
      <div 
        v-for="(festival, index) in month.festivalsInMonth" 
        :key="festival.name"
        class="festivals-list__festival">
        <festival-item 
          :festival="festival" 
          :margin="{value: !(index % 2)}"/> <!--use even/odd for handling left or right margin-->
      </div>
    </div>
</div></template>

<script>
import FestivalItem from "../components/FestivalItem";
import Intro from "../components/Intro";
import Columns from "../components/Columns";

export default {
  name: "FestivalsList",
  components: {
    FestivalItem,
    Intro,
    Columns
  },
  props: {
    festivals: {
      type: [Array, Promise],
      required: true,
      validate(value) {
        return [value];
      }
    },
    loading: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
    showInfoPanel: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festivals-list.scss";
</style>
