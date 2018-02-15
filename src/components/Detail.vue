<template>
    <div class="container">
        <div class="festival" v-if="festival">
            <h1>{{ festival.name }}</h1>
            <h2>{{ festival.slogan }}</h2>
            <p>{{ festival.description }}</p>
        </div>
    </div>
</template>

<script>
import store from "../store/store";

export default {
  store,
  name: "Detail",
  computed: {
    festival() {
      const festivals = this.$store.getters.festivals;
      const festivalId = this.$route.params.festivalId;
      const festival = festivals.filter(key => key.sys.id === festivalId);

      return festival.length !== 0 ? festival[0].fields : {};
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
