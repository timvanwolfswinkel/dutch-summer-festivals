<template>
  <div class="container">
    <h1 class="heading">{{ header }}</h1>
    <div v-if="!loading">
      <div class="festivals" v-for="festival in festivals" :key="festival.name">
        <div class="festival">
          <router-link :to=" {name: 'Detail', params: { festivalId : festival.sys.id } }" >
            {{ festival.fields.name }}
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

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
