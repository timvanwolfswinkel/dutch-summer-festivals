<template>
  <div class="aftermovie">
    <img
      :src="require(`@/assets/img/${festivalId}/list-item.jpg`)"
      class="aftermovie__image">
    <button-link
      text="view aftermovie" 
      emoji="👀"
      class="aftermovie__button"
      @click="openModal()"/>
  </div>
</template>

<script>
import ImageTransition from "../../components/transitions/ImageTransition";
import ButtonLink from "../ButtonLink";

export default {
  name: "Aftermovie",
  components: {
    ImageTransition,
    ButtonLink
  },
  props: {
    festivalId: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    videoUrl: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    openModal() {
      console.log("open modal");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/aftermovie.scss";
</style>
