<template>
  <div>
    <back-button/>
    <div class="festival">
      <div 
        v-if="festival"
        class="festival__item">
        <div class="festival__header">
          <img 
            :src="require(`@/assets/img/${festival.url}/art-header.jpg`)"
            class="festival__art-header">
          <span class="festival__date">{{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonth | uppercase }}</span>
        </div>
        <p class="festival__short-description">{{ festival.shortDescription }}</p>
        <img 
          :src="require(`@/assets/img/${festival.url}/header-image.jpg`)"
          class="festival__header-image">
        <p 
          class="festival__description"
          v-html="festival.description">{{ festival.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import PageTransition from "../components/PageTransition";
import BackButton from "../components/BackButton";

export default {
  store,
  name: "Festival",
  components: {
    PageTransition,
    BackButton
  },
  computed: {
    festival() {
      const festivals = this.$store.getters.festivals;
      const festivalId = this.$route.params.festivalId;
      const festival = festivals.filter(key => key.fields.url === festivalId);

      return festival.length !== 0 ? festival[0].fields : {};
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/festival.scss";
</style>
