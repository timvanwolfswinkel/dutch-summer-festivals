<template>
  <div class="gallery">
    <div class="gallery__header">
      <span class="gallery__title">Gallery</span>
      <span class="gallery__counter"> 1 / 10 </span>
    </div>
    <div class="gallery__carousel">
      <div
        v-for="image in imagesList"
        :key="image.url"  
        class="gallery__item">
        <img
          :src="require(`@/assets/img/best-kept-secret/gallery/${image.url}.jpg`)"
          class="gallery__image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  props: {
    images: {
      type: Object,
      required: false,
      default: () => {},
      validate(value) {
        return [value];
      }
    }
  },
  data() {
    return {
      imagesList: [
        { url: "1" },
        { url: "2" },
        { url: "3" },
        { url: "4" },
        { url: "5" },
        { url: "6" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/gallery.scss";
</style>
