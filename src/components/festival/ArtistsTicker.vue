<template>
  <div class="artists-ticker">
    ArtistsTicker
  </div>
</template>

<script>
export default {
  name: "ArtistsTicker",
  props: {
    artists: {
      type: Object,
      required: false,
      default: () => {},
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/artists-ticker.scss";
</style>
