<template>
  <div>
    <page-transition/>
    <div class="festival">
      <div 
        v-if="festival"
        class="festival__item">
        <div class="festival__header">
          <div v-scroll-reveal="{ delay: 1000 }">
            <img 
              :src="'/static/' + festival.url + '/art-header.jpg'"
              class="festival__art-header">
          </div>
          <div v-scroll-reveal="{ delay: 1200 }">
            <span class="festival__date">{{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonth | uppercase }}</span>
          </div>
        </div>
        <div v-scroll-reveal="{ delay: 1500 }">
          <p class="festival__short-description">{{ festival.shortDescription }}</p>
        </div>
        <div v-scroll-reveal="{ delay: 1750 }">
          <img 
            :src="'/static/' + festival.url + '/header-image.jpg'"
            class="festival__header-image">
        </div>
        <div v-scroll-reveal>
          <p 
            class="festival__description"
            v-html="festival.description">{{ festival.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import PageTransition from "../components/PageTransition";

export default {
  store,
  name: "Festival",
  components: {
    PageTransition
  },
  computed: {
    festival() {
      const festivals = this.$store.getters.festivals;
      const festivalId = this.$route.params.festivalId;
      const festival = festivals.filter(key => key.fields.url === festivalId);

      return festival.length !== 0 ? festival[0].fields : {};
    }
  },
  created() {
    window.scrollTo(0, 0); // reset scroll position
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/pages/festival.scss";
</style>
