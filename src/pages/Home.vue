<template>
  <div class="home">
    <info-panel :show-info-panel="showInfoPanel"/>
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

const mapState = Vuex.mapState;

export default {
  name: "Home",
  components: {
    FestivalsList,
    InfoPanel
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState(["showInfoPanel"]),
    festivals() {
      return this.$store.state.festivals.length > 0
        ? this.$store.state.festivals
        : this.$store.dispatch("getFestivals");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/home.scss";
</style>
