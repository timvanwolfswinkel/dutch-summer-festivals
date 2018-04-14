<template>
  <div class="intro-page">
    <div class="intro-page__container">
      <h1 class="intro-page__header">The dutch like to party, hard.</h1>
      <span
        class="intro-page__button"
        @click="toggleIntro">Explore</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroPage",
  methods: {
    toggleIntro() {
      this.$store.dispatch("toggleIntro");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/intro-page.scss";
</style>
