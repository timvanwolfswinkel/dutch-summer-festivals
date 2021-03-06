<template>
  <div :style="showModal ? 'overflow:hidden' : 'overflow:scroll'">
    <button-back-to-overview/>
    <Modal 
      :show-modal="showModal" 
      :video-url="festival.youtubeAftermovieUrl"/>

    <div class="festival">
      <div class="festival__container">
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

          <div class="festival__description-container">
            <p class="festival__description">{{ festival.description }}</p>
            <aftermovie 
              :festival-id="festival.url" 
              class="festival__aftermovie"/>
          </div>

          <content-block
            :content="getLocation()"
            :show-button="true"
            :button-url="festival.ticketUrl"
            title="where"
            button-text="open on google maps"
            button-emoji="🗺"/>

          <content-block
            :content="getDate()"
            title="when"
            align="flex-end"
            padding-right="75"
            margin-top="-20"/>

          <artist/>

          <content-block
            :content="festival.mood"
            title="genres"/>

          <content-block
            :content="festival.funfact"
            title="funfact"
            align="flex-end"/>

          <artist/>
        </div>
      </div>

      <gallery/>

      <div class="festival__container">
        <div class="festival__item">
          <artist/>

          <content-block
            :content="getAmountOfVisitors()"
            title="crowdsurfing"/>
        </div>
      </div>

      <artists-ticker/>

      <div class="festival__container">
        <div class="festival__item">
          <footer-block 
            :facebook-event-url="festival.facebookEventUrl"
            :ticket-url="festival.ticketUrl"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from "moment";

import Vuex from "vuex";
import store from "../store/store";

import ButtonBackToOverview from "../components/ButtonBackToOverview";
import ButtonLink from "../components/ButtonLink";
import Aftermovie from "../components/festival/Aftermovie";
import Modal from "../components/festival/Modal";
import ContentBlock from "../components/festival/ContentBlock";
import Artist from "../components/festival/Artist";
import Gallery from "../components/festival/Gallery";
import ArtistsTicker from "../components/festival/ArtistsTicker";
import FooterBlock from "../components/festival/FooterBlock";

const mapState = Vuex.mapState;

export default {
  store,
  name: "Festival",
  components: {
    ButtonBackToOverview,
    ButtonLink,
    Aftermovie,
    Modal,
    ContentBlock,
    Artist,
    Gallery,
    ArtistsTicker,
    FooterBlock
  },
  data() {
    return {
      festival: this.getFestival(),
      date: null,
      location: null
    };
  },
  computed: {
    ...mapState(["showModal"])
  },
  mounted() {
    this.$store.dispatch("toggleInfoPanel");
  },
  methods: {
    // TODO: move these to computed
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
      const amountOfVisitors = Math.floor(this.festival.amountOfVisitors);
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
