<template>
  <div class="artist">
    <div class="artist__container">
      <div class="artist__info">
        <span class="artist__song">R u mine?</span>
        <span class="artist__name">{{ artist }}</span>
        <span class="artist__title">Will be there</span>
      </div>
      <div class="artist__image-container">
        <img
          :src="require(`@/assets/img/artists/arctic-monkeys.jpg`)"
          class="artist__image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Artist",
  props: {
    artist: {
      type: String,
      required: false,
      default: "arctic monkeys",
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/artist.scss";
</style>
