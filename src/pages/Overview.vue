<template>
  <div 
    v-drag-scroll
    :id="'overview'"
    class="overview">
    <intro-page :show-intro="showIntro"/>
    <months-list 
      :show-months-panel="showMonthsPanel" 
      :festivals="festivals"/>
    <festival-info :show-info-panel="showInfoPanel"/>
    
    <span 
      class="overview__show-months"
      @click="toggleShowMonthsPanel">
      {{ "Select a month" | uppercase }}
    </span>
    <list 
      :festivals="festivals" 
      :loading="loading"
      :show-intro="showIntro"/>
  </div>
</template>

<script>
import Vuex from "vuex";
import IntroPage from "../components/IntroPage";
import List from "../components/overview/List";
import MonthsList from "../components/panel/MonthsList";
import FestivalInfo from "../components/panel/FestivalInfo";
import dragScroll from "../directives/dragScroll";

const mapState = Vuex.mapState;

export default {
  name: "Overview",
  components: {
    IntroPage,
    List,
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
@import "src/assets/scss/pages/overview.scss";
</style>
