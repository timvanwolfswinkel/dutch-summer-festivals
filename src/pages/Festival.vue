<template>
  <div>
    <button-back-to-overview/>
    <div class="festival">
      <div 
        v-if="festival"
        class="festival__item">
        <h1 class="festival__title">{{ festival.name }}</h1>
        <!-- <span class="festival__date">{{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonth | uppercase }}</span> -->
        <p class="festival__description">{{ festival.description }}</p>
        <button-link 
          :url="festival.ticketUrl"
          text="buy tickets" 
          emoji="💸"/>
        <button-link 
          :url="festival.ticketUrl"
          text="view aftermovie" 
          emoji="👀"/>
        <button-link 
          :url="festival.ticketUrl"
          text="open on google maps" 
          emoji="🗺"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";

import ButtonBackToOverview from "../components/ButtonBackToOverview";
import ButtonLink from "../components/ButtonLink";

export default {
  store,
  name: "Festival",
  components: {
    ButtonBackToOverview,
    ButtonLink
  },
  computed: {
    festival() {
      this.$store.dispatch("toggleInfoPanel"); // TODO: move this to mounted event
      const storeFestivals = this.$store.getters.festivals;
      const temp = [];
      const festivalId = this.$route.params.festivalId;

      // TODO: replace this with reduce
      // flatten array
      storeFestivals.forEach(festival => {
        if (festival.festivalsInMonth.length > 0) {
          festival.festivalsInMonth.forEach(item => {
            temp.push(item);
          });
        }
      });

      const festivals = [].concat(...temp);
      const festival = festivals.filter(key => key.fields.url === festivalId);

      console.log(festival);

      return festival.length !== 0 ? festival[0].fields : {};
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/festival.scss";
</style>
