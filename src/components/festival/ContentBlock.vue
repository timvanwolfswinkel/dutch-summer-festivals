<template>
  <div class="content-block">
    <p class="content-block__title">{{ title }}</p>
    <p class="content-block__content">{{ content }}</p>
    <div 
      v-if="showButton" 
      class="content-block__button">
      <button-link 
        :url="buttonUrl"
        :text="buttonText" 
        :emoji="buttonEmoji"/>
    </div>
  </div>
</template>

<script>
import ButtonLink from "../../components/ButtonLink";

export default {
  name: "ContentBlock",
  components: {
    ButtonLink
  },
  props: {
    title: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    content: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    showButton: {
      type: Boolean,
      required: false,
      default: false,
      validate(value) {
        return [value];
      }
    },
    buttonText: {
      type: String,
      required: false,
      default: "",
      validate(value) {
        return [value];
      }
    },
    buttonEmoji: {
      type: String,
      required: false,
      default: "",
      validate(value) {
        return [value];
      }
    },
    buttonUrl: {
      type: String,
      required: false,
      default: "",
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/content-block.scss";
</style>
