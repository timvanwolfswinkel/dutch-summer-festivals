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
          :content="getLocation()"
          :show-button="true"
          :button-url="festival.ticketUrl"
          title="where"
          button-text="open on google maps"
          button-emoji="🗺"
        />

        <content-block
          :content="getDate()"
          title="when"
        />

        <content-block
          :content="festival.mood"
          title="genres"
        />

        <content-block
          :content="festival.funfact"
          title="funfact"
        />

        <content-block
          :content="getAmountOfVisitors()"
          title="crowdsurfing"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

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
      festival: this.getFestival(),
      date: null,
      location: null
    };
  },
  mounted() {
    this.$store.dispatch("toggleInfoPanel");
  },
  methods: {
    getFestival() {
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
    },
    getDate() {
      const start = this.festival.startDate;
      const end = this.festival.endDate;

      const startDate = moment(start, "YYYY-MM-DD").format("DD");
      const endDate = moment(end, "YYYY-MM-DD").format("DD MMMM");

      return `${startDate} - ${endDate}`;
    },
    getLocation() {
      const city = this.festival.locationName;
      const country = this.festival.country;

      return `${city} ${country}`;
    },
    getAmountOfVisitors() {
      const amountOfVisitors = Math.floor(this.festival.amountOfVisitors); // TODO: Add seperator on thousands
      const lastYear = moment()
        .subtract(1, "year")
        .format("YYYY");

      return `${amountOfVisitors} party people attended in ${lastYear}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/festival.scss";
</style>
