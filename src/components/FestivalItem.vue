<template>
  <div class="festival-item">
    <columns/>
    <div class="festival-item__container">
      <div
        :style="imagePosition"
        class="festival-item__image-container">
        <image-transition>
          <img
            v-if="showImage" 
            :src="require(`@/assets/img/${festival.fields.url}/list-item.jpg`)"
            class="festival-item__image">
        </image-transition>
      </div>
      <div 
        class="festival-item__content"
        @click="prepareInfoPanel">
        <h2 class="festival-item__heading">{{ festival.fields.name }}</h2>
        <p class="festival-item__start-date">{{ festival.fields.startDate | dateDay }}</p>
        <p class="festival-item__divider"/>
        <p class="festival-item__end-date">{{ festival.fields.endDate | dateDayMonth | uppercase }}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
      infoPanelIsOpen: this.$store.state.showInfoPanel
    };
  },
  computed: {
    imagePosition(margin) {
      const imagePosition = margin.margin.value
        ? "left: -25px"
        : "right: -25px";

      return imagePosition;
    }
  },
  methods: {
    toggleImage() {
      this.showImage = !this.showImage;
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
