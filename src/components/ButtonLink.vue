<template>
  <span>
    <a 
      v-if="url"
      :href="url"
      target="_blank" 
      class="button-link">
      <span class="button-link__heading">{{ text }}</span>
      <div class="button-link__container">
        <span class="button-link__emoji">{{ emoji }}</span>
        <img
          :src="require(`@/assets/img/icons/circle-yellow.svg`)"
          class="button-link__circle">
      </div>
    </a>
    <div 
      v-if="!url" 
      class="button-link">
      <span class="button-link__heading">{{ text }}</span>
      <div class="button-link__container">
        <span class="button-link__emoji">{{ emoji }}</span>
        <img
          :src="require(`@/assets/img/icons/circle-yellow.svg`)"
          class="button-link__circle">
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "ButtonLink",
  props: {
    text: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    emoji: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    url: {
      type: String,
      required: false,
      default: null,
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/button-link.scss";
</style>
