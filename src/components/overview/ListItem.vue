<template>
  <div class="list-item">
    <div class="list-item__container">
      <div :class="'list-item__content list-item__content--' + festival.fields.position">
        <div
          :style="getImagePosition"
          class="list-item__image-container">
          <image-transition>
            <img
              v-if="showImage" 
              :src="require(`@/assets/img/${festival.fields.url}/list-item.jpg`)"
              class="list-item__image">
          </image-transition>
        </div>
        <div 
          v-split-text
          ref="festivalHeading"
          class="list-item__heading"
          @mouseover="toggleImage"
          @mouseout="toggleImage"
          @click="prepareInfoPanel">
          {{ festival.fields.name }}
        </div>
        <p class="list-item__countdown">In {{ getDaysUntilFestival }} days</p>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import ImageTransition from "../../components/transitions/ImageTransition";
import splitText from "../../directives/splitText";

export default {
  name: "ListItem",
  components: {
    ImageTransition
  },
  directives: {
    splitText
  },
  props: {
    festival: {
      type: Object,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  data() {
    return {
      showImage: false,
      infoPanelIsOpen: this.$store.state.showInfoPanel
    };
  },
  computed: {
    getDaysUntilFestival(festival) {
      const oneDay = 24 * 60 * 60 * 1000;
      const currentDate = new Date();
      const festivalDate = new Date(festival.festival.fields.startDate);

      const daysUntilFestival = Math.round(
        Math.abs((currentDate.getTime() - festivalDate.getTime()) / oneDay)
      );

      return daysUntilFestival;
    },
    getImagePosition() {
      return "right: 30px; top: 30px";
    }
  },
  methods: {
    toggleImage() {
      if (!this.$store.state.listItemAnimating) {
        this.showImage = !this.showImage;
        this.$store.dispatch("setListItemAnimating");

        const el = this.$refs.festivalHeading;
        const elements = el.getElementsByTagName("span");

        if (this.showImage) {
          this.animateTextBackgroundsIn(elements, 500, this);
        } else {
          this.animateTextBackgroundsOut(elements, 750, this);
        }
      }
    },
    animateTextBackgroundsIn(elements, delay, context) {
      anime.remove([elements]);

      setTimeout(() => {
        anime({
          targets: [elements],
          duration: 450,
          scaleY: "1",
          easing: "easeOutExpo",
          complete() {
            [].forEach.call(elements, element => {
              const span = element;
              span.style.transformOrigin = "0% 100%";
            });

            context.$store.dispatch("setListItemAnimating");
          }
        });
      }, delay);
    },
    animateTextBackgroundsOut(elements, delay, context) {
      anime.remove([elements]);

      setTimeout(() => {
        anime({
          targets: [elements],
          duration: 450,
          scaleY: "0",
          easing: "easeOutExpo",
          complete() {
            [].forEach.call(elements, element => {
              const span = element;
              span.style.transformOrigin = "100% 0%";
            });

            context.$store.dispatch("setListItemAnimating");
          }
        });
      }, delay);
    },
    prepareInfoPanel() {
      if (!this.$store.state.showInfoPanel) {
        this.setFestivalId();
        this.toggleShowInfoPanel();
      } else if (this.festival.sys.id === this.$store.state.festivalId) {
        this.toggleShowInfoPanel();
      }
    },
    setFestivalId() {
      this.$store.dispatch("setFestivalId", {
        festivalId: this.festival.sys.id
      });
    },
    toggleShowInfoPanel() {
      // close the months list panel if open
      if (this.$store.state.showMonthsPanel) {
        this.$store.dispatch("toggleMonthsPanel");
      }

      this.$store.dispatch("toggleInfoPanel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/overview/list-item.scss";
</style>
