<template>
  <div>
    <button-back-to-overview/>
    <div class="festival">
      <div 
        v-if="festival"
        class="festival__item">
        <div class="festival__header">
          <h1 class="festival__title">{{ festival.name }}</h1>
          <div class="festival__buy-tickets">
            <button-link 
              :url="festival.ticketUrl"
              text="buy tickets" 
              emoji="💸"/>
          </div>
        </div>
        <p class="festival__description">{{ festival.description }}</p>

        <content-block 
          :content="festival.locationName"
          :show-button="true"
          :button-url="festival.ticketUrl"
          title="where"
          button-text="open on google maps"
          button-emoji="🗺"
        />

        <content-block 
          content="8juni"
          title="when"
        />

        <div class="festival__when">
          <p class="festival__when-title">When</p>
          <p class="festival__where-location">
            {{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonthFull | uppercase }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";

import ButtonBackToOverview from "../components/ButtonBackToOverview";
import ButtonLink from "../components/ButtonLink";
import ContentBlock from "../components/festival/ContentBlock";

export default {
  store,
  name: "Festival",
  components: {
    ButtonBackToOverview,
    ButtonLink,
    ContentBlock
  },
  data() {
    return {
      date: ""
    };
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

      // moment.locale("en");
      // const endDate = moment(festival.EndDate, "YYYY-MM-DD").format("DD MMMM");
      // const startDate = moment(festival.startDate, "YYYY-MM-DD").format("DD");

      // this.date = `${startDate} - ${endDate}`;

      return festival.length !== 0 ? festival[0].fields : {};
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/festival.scss";
</style>
