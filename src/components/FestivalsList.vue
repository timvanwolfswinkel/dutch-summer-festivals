<template>
  <div
    v-if="!loading" 
    class="festivals-list">
    <columns/>
    <div 
      v-for="(festival, index) in festivals" 
      :key="festival.name"
      class="festivals-list__item">
      <festival-item 
        :festival="festival" 
        :margin="{value: !(index % 2)}"/> <!-- use even/odd for handling left or right margin -->
    </div>
  </div>
</template>

<script>
import Columns from "../components/Columns";
import FestivalItem from "../components/FestivalItem";

export default {
  name: "FestivalsList",
  components: {
    Columns,
    FestivalItem
  },
  props: {
    festivals: {
      type: Array || Promise,
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festivals-list.scss";
</style>
