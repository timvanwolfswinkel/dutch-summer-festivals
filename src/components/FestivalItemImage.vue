<template>
  <div
    :style="imagePosition"
    class="festival-item-image">
    <img 
      :src="'/static/' + url + '/header-image.jpg'"
      class="festival-item-image__image">
  </div>
</template>

<script>
export default {
  name: "FestivalItemImage",
  props: {
    url: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    position: {
      type: Object,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  computed: {
    imagePosition(position) {
      const imagePosition = position.position.value
        ? "left: -100px"
        : "right: -100px";

      return imagePosition;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/festival-item-image.scss";
</style>
