<template>
  <div class="festival-item">
    <div 
      :style="itemOffset" 
      class="festival-item__content">
      <festival-item-image 
        :show-image="showImage" 
        :position="margin"
        :url="festival.fields.url"/>
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
import FestivalItemImage from "../components/FestivalItemImage";

export default {
  name: "FestivalItem",
  components: {
    FestivalItemImage
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
@import "../scss/components/festival-item.scss";
</style>
