<template>
  <div 
    v-drag-scroll
    :id="'home'"
    class="home">
    <intro-page :show-intro="showIntro"/>
    <months-list 
      :show-months-panel="showMonthsPanel" 
      :festivals="festivals"/>
    <festival-info :show-info-panel="showInfoPanel"/>
    
    <span 
      class="home__show-months"
      @click="toggleShowMonthsPanel">
      {{ "Select a month" | uppercase }}
    </span>
    <festivals-list 
      :festivals="festivals" 
      :loading="loading"
      :show-intro="showIntro"/>
  </div>
</template>

<script>
import Vuex from "vuex";
import IntroPage from "../components/IntroPage";
import FestivalsList from "../components/FestivalsList";
import MonthsList from "../components/MonthsList";
import FestivalInfo from "../components/FestivalInfo";
import dragScroll from "../directives/dragScroll";

const mapState = Vuex.mapState;

export default {
  name: "Home",
  components: {
    IntroPage,
    FestivalsList,
    MonthsList,
    FestivalInfo
  },
  directives: {
    dragScroll
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState(["showInfoPanel"]),
    ...mapState(["showMonthsPanel"]),
    ...mapState(["showIntro"]),
    festivals() {
      return this.$store.state.festivals.length > 0
        ? this.$store.state.festivals
        : this.$store.dispatch("getFestivals");
    }
  },
  methods: {
    toggleShowMonthsPanel() {
      // close the festival info panel if open
      if (this.$store.state.showInfoPanel) {
        this.$store.dispatch("toggleInfoPanel");
      }

      this.$store.dispatch("toggleMonthsPanel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/home.scss";
</style>
