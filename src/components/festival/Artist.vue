<template>
  <div class="artist">
    <div class="artist__container">
      <div class="artist__info">
        <span class="artist__song">{{ songTitle }}</span>
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
    },
    songTitle: {
      type: String,
      required: false,
      default: "R u mine?",
      validate(value) {
        return [value];
      }
    },
    songUrl: {
      type: String,
      required: false,
      default:
        "https://p.scdn.co/mp3-preview/104ad0ea32356b9f3b2e95a8610f504c90b0026b?cid=8897482848704f2a8f8d7c79726a70d4",
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
