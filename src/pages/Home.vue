<template>
  <div class="home">
    <info-panel :show-info-panel="showInfoPanel"/>
    <months-panel 
      :show-months-panel="showMonthsPanel" 
      :festivals="festivals"/>
    <span 
      class="home__show-months"
      @click="toggleShowMonthsPanel">
      {{ "Select a month" | uppercase }}
    </span>
    <festivals-list 
      :festivals="festivals" 
      :loading="loading"
      :show-info-panel="showInfoPanel"/>
  </div>
</template>

<script>
import Vuex from "vuex";
import FestivalsList from "../components/FestivalsList";
import InfoPanel from "../components/InfoPanel";
import MonthsPanel from "../components/MonthsPanel";

const mapState = Vuex.mapState;

export default {
  name: "Home",
  components: {
    FestivalsList,
    InfoPanel,
    MonthsPanel
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState(["showInfoPanel"]),
    ...mapState(["showMonthsPanel"]),
    festivals() {
      return this.$store.state.festivals.length > 0
        ? this.$store.state.festivals
        : this.$store.dispatch("getFestivals");
    }
  },
  methods: {
    toggleShowMonthsPanel() {
      this.$store.dispatch("toggleMonthsPanel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/home.scss";
</style>
