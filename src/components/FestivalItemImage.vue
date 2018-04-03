<template>
  <div
    :style="imagePosition"
    class="festival-item-image">
    <image-transition>
      <img
        v-if="showImage" 
        :src="'/static/' + url + '/list-item.jpg'"
        class="festival-item-image__image">
    </image-transition>
  </div>
</template>

<script>
import ImageTransition from "../components/ImageTransition";

export default {
  name: "FestivalItemImage",
  components: {
    ImageTransition
  },
  props: {
    showImage: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
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
