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
import { listen, value, pointer, styler, decay } from "popmotion";

export default {
  name: "Gallery",
  props: {
    images: {
      type: Object,
      required: false,
      default: () => {},
      validate(propValue) {
        return [propValue];
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
      ],
      minXPosition: 0,
      maxXPosition: 1000
    };
  },
  mounted() {
    this.initSlider();
  },
  methods: {
    initSlider() {
      const slider = this.$el.querySelector(".gallery__carousel");
      const sliderX = value(0, styler(slider).set("x"));

      listen(slider, "mousedown touchstart").start(() => {
        pointer({ x: sliderX.get() })
          .pipe(({ x }) => this.getMinMaxPosition(x))
          .start(sliderX);
      });

      listen(document, "mouseup touchend").start(() => {
        decay({
          from: sliderX.get(),
          velocity: sliderX.getVelocity()
        }).start(sliderX);
      });
    },
    getMinMaxPosition(x) {
      if (x > this.maxXPosition) {
        return this.maxXPosition;
      }

      if (x < this.minXPosition) {
        return this.minXPosition;
      }

      return x;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/gallery.scss";
</style>
