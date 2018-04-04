<template>
  <div class="home">
    <span class="home__heading">YOUR COMPLETE FESTIVAL OVERVIEW.</span>
    <columns/>
    <festivals-list 
      :festivals="festivals" 
      :loading="loading"/>
  </div>
</template>

<script>
import Vuex from "vuex";
import Columns from "../components/Columns";
import FestivalsList from "../components/FestivalsList";

const mapState = Vuex.mapState;

export default {
  name: "Home",
  components: {
    Columns,
    FestivalsList
  },
  computed: {
    ...mapState(["loading"]),
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
