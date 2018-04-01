<template>
  <div class="festival">
    <page-transition/>
    <div 
      v-if="festival"
      class="festival__item">
      <h1>{{ festival.name }}</h1>
      <h2>{{ festival.slogan }}</h2>
      <p>{{ festival.description }}</p>
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
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/pages/festival.scss";
</style>
