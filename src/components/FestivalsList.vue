<template>
  <div class="festivals-list">
    <div v-if="!loading">
      <div 
        class="festivals-list__list" 
        v-for="festival in festivals" 
        :key="festival.name">
        <div class="festivals-list__item">
          <router-link 
            class="festivals-list__link" 
            :to=" {name: 'Festival', params: { festivalId : festival.sys.id } }" >
            <h2 class="festivals-list__heading">{{ festival.fields.name | uppercase }}</h2>
            <p class="festivals-list__date">{{ festival.fields.date | date }}</p>
          </router-link>
        </div>
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
