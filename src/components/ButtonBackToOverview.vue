<template>
  <router-link :to=" {name: 'Overview' }">
    <div class="button-back-to-overview">
      <div class="button-back-to-overview__container">
        <img
          :src="require(`@/assets/img/icons/arrow.svg`)"
          class="button-back-to-overview__arrow">
        <div 
          v-split-text="{background: false,
                         opacity: '1',
                         translateY: '0px',
                         wordDisplay: 'block',
                         letterDisplay: 'block', 
                         paddingTop: '0px', 
                         paddingLeft: '0px', 
                         paddingRight: '0px', 
                         marginBottom: '10px'}"
          class="button-back-to-overview__text">
          Back to overview
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import splitText from "../directives/splitText";

export default {
  name: "BackButton",
  directives: {
    splitText
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/button-back-to-overview.scss";
</style>
