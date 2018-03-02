<template>
  <div class="home">
    <h1 class="heading">{{ header }}</h1>
    <festivals-list 
      :festivals="festivals" 
      :loading="loading"/>
  </div>
</template>

<script>
import Vuex from "vuex";
import FestivalsList from "../components/FestivalsList";

const mapState = Vuex.mapState;

export default {
  name: "Home",
  components: {
    FestivalsList
  },
  data() {
    return {
      header: "Festivals"
    };
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
@import "../scss/pages/home.scss";
</style>
