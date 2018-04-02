<template>
  <div
    v-if="!loading" 
    class="festivals-list">
    <div 
      v-for="festival in festivals" 
      :key="festival.name"
      class="festivals-list__item">
      <div v-scroll-reveal="{ delay: 500 }">
        <router-link 
          :to=" {name: 'Festival', params: { festivalId : festival.fields.url } }" 
        >
          <p class="festivals-list__start-date">{{ festival.fields.startDate | dateDay }}</p>
          <p class="festivals-list__divider"/>
          <p class="festivals-list__end-date">{{ festival.fields.endDate | dateDayMonth | uppercase }}</p>
          <img
            :src="'/static/' + festival.fields.url + '/art-small.png'" 
            class="festivals-list__logo">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FestivalsList",
  props: {
    festivals: {
      type: Array,
      required: true,
      validate(value) {
        return [value];
      }
    },
    loading: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/festivals-list.scss";
</style>
