<template>
  <div
    v-if="!loading" 
    class="festivals-list">
    <info-panel :show-info-panel="showInfoPanel"/>
    <div class="festivals-list__intro">
      <div class="festivals-list__intro-container">
        <h1 class="festivals-list__header">Your complete festival overview.</h1>
        <span class="festivals-list__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </div>
    <div 
      v-for="month in festivals" 
      :key="month.monthTitle"
      class="festivals-list__item">
      <span>{{ month.month }}</span>

      <!-- <festival-item 
        :festival="festival" 
        :margin="{value: !(index % 2)}"/> use even/odd for handling left or right margin -->
    </div>
  </div>
</template>

<script>
import FestivalItem from "../components/FestivalItem";
import InfoPanel from "../components/InfoPanel";

export default {
  name: "FestivalsList",
  components: {
    FestivalItem,
    InfoPanel
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
