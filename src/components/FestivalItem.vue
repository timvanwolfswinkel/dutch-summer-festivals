<template>
  <div class="festival-item">
    <columns/>
    <div class="festival-item__container">
      <div
        :style="getImagePosition"
        class="festival-item__image-container">
        <image-transition>
          <img
            v-if="showImage" 
            :src="require(`@/assets/img/${festival.fields.url}/list-item.jpg`)"
            class="festival-item__image">
        </image-transition>
      </div>
      <div 
        :style="getElementPosition" 
        class="festival-item__content"
        @mouseover="toggleImage"
        @mouseout="toggleImage"
        @click="prepareInfoPanel">
        <div 
          v-split-text
          ref="festivalHeading"
          class="festival-item__heading">
          {{ festival.fields.name }}
        </div>
        <p class="festival-item__countdown">In {{ getDaysUntilFestival }} days</p>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import Columns from "../components/Columns";
import ImageTransition from "../components/ImageTransition";

export default {
  name: "FestivalItem",
  components: {
    Columns,
    ImageTransition
  },
  props: {
    festival: {
      type: Object,
      required: true,
      validate(value) {
        return [value];
      }
    },
    margin: {
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
      infoPanelIsOpen: this.$store.state.showInfoPanel,
      randomInt: Math.floor(Math.random() * (30 - 15 + 1)) + 15
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
    getElementPosition(margin) {
      const elementPosition = margin.margin.value
        ? `top: ${this.randomInt}%`
        : `bottom: ${this.randomInt}%`;

      return elementPosition;
    },
    getImagePosition(margin) {
      const imagePosition = margin.margin.value
        ? `left: 35px; top: calc(${this.randomInt}% + 20px)`
        : `right: 35px; bottom: calc(${this.randomInt}% - 60px)`;

      return imagePosition;
    }
  },
  methods: {
    toggleImage() {
      if (!this.$store.state.imageAnimating) {
        this.showImage = !this.showImage;

        const el = this.$refs.festivalHeading;

        if (this.showImage) {
          console.log("animate in");

          anime({
            targets: `${el} span`,
            duration: 250,
            backgroundColor: "#CCC",
            easing: "easeOutExpo"
          });
        } else {
          anime({
            targets: `${el} span`,
            duration: 250,
            backgroundColor: "#000",
            easing: "easeOutExpo"
          });
        }
      }
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
      this.$store.dispatch("toggleInfoPanel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival-item.scss";
</style>
