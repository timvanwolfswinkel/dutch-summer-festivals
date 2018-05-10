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
import { listen, styler, pointer, value, transform, spring } from "popmotion";
import anime from "animejs";

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
      maxXPosition: 0
    };
  },
  mounted() {
    this.maxXPosition = -(this.imagesList.length * this.$el.querySelector('.gallery__item').getBoundingClientRect().width);
    this.initSlider();
  },
  methods: {
    initSlider() {
      const { nonlinearSpring, linearSpring, conditional, pipe } = transform;
      const handle = this.$el.querySelector('.gallery__carousel');
      const handleStyler = styler(handle);
      const handleX = value(0, handleStyler.set('x'));

      // Single-axis pointer
      const pointerX = (x) => pointer({ x }).pipe(v => v.x);

      const springRange = (from, to, strength) => pipe(
        conditional(
          v => v < from,
          nonlinearSpring(strength, from)
        ),
        conditional(
          v => v > to,
          nonlinearSpring(strength, to)
        )
      );

      listen(handle, 'mousedown touchstart')
        .start((e) => {
          this.scaleItemsCss("down");
          e.preventDefault();
          pointerX(handleX.get())
            .pipe(springRange(this.maxXPosition, this.minXPosition, 3))
            .start(handleX)
        })

      listen(document, 'mouseup touchend')
        .start(() => {
          this.scaleItemsCss("up");
          const x = handleX.get()

          if (x < this.maxXPosition || x > this.minXPosition) {
            spring({
              from: x,
              to: x < this.maxXPosition ? this.maxXPosition : this.minXPosition,
              velocity: handleX.getVelocity(),
              stiffness: 900,
              damping: 25
            }).start(handleX);
          } else {
            handleX.stop();
          }
        });
    },
    scaleItemsCss(direction){
      const items = this.$el.querySelectorAll('.gallery__item');

      if(direction === 'down') {
        [].forEach.call(items, item => {
          item.className += " gallery__item--active";
        });
      } else {
        [].forEach.call(items, item => {
          item.className = "gallery__item";
        });
      }
    },
    scaleItems(direction) {
      const items = this.$el.querySelectorAll('.gallery__item');

      if(direction === 'down') {
        anime({
          targets: [items],
          duration: 250,
          delay(target, index) {
            return index * 200;
          },
          scale: 0.95,
          easing: "linear"
        });
      } else {
          anime({
          targets: [items],
          duration: 250,
          delay(target, index) {
            return index * 200;
          },
          scale: 1,
          easing: "linear"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/gallery.scss";
</style>
