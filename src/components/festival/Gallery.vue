<template>
  <div class="gallery">
    <div class="gallery__header">
      <span class="gallery__title">Gallery</span>
      <span class="gallery__counter"> 1 / {{ amountOfImages }} </span>
    </div>
    <div class="gallery__container">
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
  </div>
</template>

<script>
import {
  listen,
  styler,
  pointer,
  value,
  transform,
  spring,
  decay
} from "popmotion";

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
      carouselSize: 0
    };
  },
  computed: {
    amountOfImages() {
      return this.imagesList.length;
    }
  },
  mounted() {
    // timeout needed to get correct scrollwidth (might be a better way to do this)
    setTimeout(() => {
      this.initSlider();
    }, 50);
  },
  methods: {
    initSlider() {
      // TODO: Update counter on mouseup (check which image/index is in the viewport)
      const { nonlinearSpring, conditional, pipe } = transform;
      const slider = this.$el.querySelector(".gallery__carousel");
      const divStyler = styler(slider);
      const sliderX = value(0, divStyler.set("x"));
      const carouselSize = slider.scrollWidth;

      const carouselConstrain =
        carouselSize - (window.innerWidth - slider.offsetLeft) + 500;

      const pointerX = x => pointer({ x }).pipe(v => v.x);

      const springRange = (from, to, strength) =>
        pipe(
          conditional(v => v < from, nonlinearSpring(strength, from)),
          conditional(v => v > to, nonlinearSpring(strength, to))
        );

      const isOutOfRange = x => x < -carouselConstrain || x > 0;

      listen(slider, "mousedown touchstart").start(e => {
        this.scaleItems("down");
        console.log(carouselConstrain);
        e.preventDefault();
        pointerX(sliderX.get())
          .pipe(springRange(-carouselConstrain, 0, 3))
          .start(sliderX);
      });

      listen(document, "mouseup touchend").start(() => {
        this.scaleItems("up");
        const x = sliderX.get();

        if (isOutOfRange(x)) {
          spring({
            from: x,
            to: x < -carouselConstrain ? -carouselConstrain : 0,
            velocity: sliderX.getVelocity(),
            stiffness: 900,
            damping: 25
          }).start(sliderX);
        } else {
          decay({
            from: sliderX.get(),
            velocity: sliderX.getVelocity()
          })
            .pipe(v => {
              if (isOutOfRange(v)) {
                return spring({
                  from: v,
                  to: v < -carouselConstrain ? -carouselConstrain : 0,
                  velocity: sliderX.getVelocity()
                }).start(sliderX);
              }
              return v;
            })
            .start(sliderX);
        }
      });
    },
    scaleItems(direction) {
      const items = this.$el.querySelectorAll(".gallery__item");

      if (direction === "down") {
        [].forEach.call(items, item => {
          item.className += " gallery__item--active"; // eslint-disable-line no-param-reassign
        });
      } else {
        [].forEach.call(items, item => {
          item.className = "gallery__item"; // eslint-disable-line no-param-reassign
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/gallery.scss";
</style>
