<template>
  <div v-scroll-reveal="{ delay: 500 }">
    <div class="festival-item">
      <router-link
        :style="itemOffset" 
        :to=" {name: 'Festival', params: { festivalId : festival.fields.url } }"
        class="festival-item__content">
        <p class="festival-item__start-date">{{ festival.fields.startDate | dateDay }}</p>
        <p class="festival-item__divider"/>
        <p class="festival-item__end-date">{{ festival.fields.endDate | dateDayMonth | uppercase }}</p>
        <img
          :src="'/static/' + festival.fields.url + '/art-small.png'" 
          class="festival-item__logo">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "FestivalItem",
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
  computed: {
    itemOffset(margin) {
      const amount = Math.floor(Math.random() * (150 - 25 + 1)) + 25;
      const offset = margin.margin.value
        ? `margin-left: -${amount}px`
        : `margin-left: ${amount}px`;

      return offset;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/festival-item.scss";
</style>
