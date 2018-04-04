<template>
  <div class="festival-item">
    <div 
      :style="itemOffset" 
      class="festival-item__content">
      <div
        :style="imagePosition"
        class="festival-item__image-container">
        <image-transition>
          <img
            v-if="showImage" 
            :src="'/static/' + festival.fields.url + '/list-item.jpg'"
            class="festival-item__image">
        </image-transition>
      </div>
      <div 
        @mouseover="toggleImage"
        @mouseout="toggleImage">
        <router-link
          :to=" {name: 'Festival', params: { festivalId : festival.fields.url } }">
          <p class="festival-item__start-date">{{ festival.fields.startDate | dateDay }}</p>
          <p class="festival-item__divider"/>
          <p class="festival-item__end-date">{{ festival.fields.endDate | dateDayMonth | uppercase }}</p>
          <img
            :src="'/static/' + festival.fields.url + '/art-small.png'" 
            class="festival-item__logo">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTransition from "../components/ImageTransition";

export default {
  name: "FestivalItem",
  components: {
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
      showImage: false
    };
  },
  computed: {
    itemOffset(margin) {
      const amount = Math.floor(Math.random() * (150 - 25 + 1)) + 25;
      const offset = margin.margin.value
        ? `margin-left: -${amount}px`
        : `margin-left: ${amount}px`;

      return offset;
    },
    imagePosition(margin) {
      const imagePosition = margin.margin.value
        ? "left: -100px"
        : "right: -100px";

      return imagePosition;
    }
  },
  methods: {
    toggleImage() {
      this.showImage = !this.showImage;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival-item.scss";
</style>
