<template>
  <div class="container">
    <h1 class="heading">{{ header }}</h1>
    <div v-if="!loading">
      <div 
        class="festivals-list" 
        v-for="festival in festivals" 
        :key="festival.name">
        <div class="festival-list__item">
          <router-link 
            class="festival-list__link" 
            :to=" {name: 'Festival', params: { festivalId : festival.sys.id } }" >
            <h2 class="festival-list__heading">{{ festival.fields.name | uppercase }}</h2>
            <p class="festival-list__date">{{ festival.fields.date | date }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";

const mapState = Vuex.mapState;

export default {
  name: "Home",
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
