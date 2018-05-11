<template>
  <div class="aftermovie">
    <img
      :src="require(`@/assets/img/${festivalId}/list-item.jpg`)"
      class="aftermovie__image">
    <div @click="openModal()">
      <button-link
        text="view aftermovie" 
        emoji="👀"
        class="aftermovie__button"/>
    </div>
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
    }
  },
  data() {
    return {
      showVideoOverlay: false
    };
  },
  methods: {
    openModal() {
      this.$store.dispatch("toggleModal");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/aftermovie.scss";
</style>
