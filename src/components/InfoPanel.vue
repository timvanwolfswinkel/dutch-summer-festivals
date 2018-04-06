<template>
  <div class="info-panel">
    <div 
      class="info-panel__close"
      @click="toggleInfoPanel">
      <img
        :src="require(`@/assets/img/icons/close.svg`)"
        class="info-panel__close-icon">
    </div>
    <div class="info-panel__content">
      <span class="info-panel__heading">Festival</span>
      <span class="info-panel__heading-small">Date</span>
      <span class="info-panel__heading-medium">4 - 8 Augustus</span>
      <span class="info-panel__heading-small">Tickets</span>
      <span class="info-panel__heading-medium">€80 - €120</span>
      <span class="info-panel__heading-small">About</span>
      <p class="info-panel__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil asperiores fugiat, vitae cupiditate numquam suscipit hic possimus, doloremque repudiandae cum molestias amet velit voluptates ut quas! Perspiciatis, autem ut.</p>
      <div class="info-panel__learn-more">
        <span class="info-panel__heading-small info-panel__heading-small--inline">Learn more</span>
        <img
          :src="require(`@/assets/img/icons/learn-more.svg`)"
          class="info-panel__icon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPanel",
  methods: {
    toggleInfoPanel() {
      console.log("toggleInfoPanel");
      this.$store.dispatch("toggleInfoPanel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/info-panel.scss";
</style>
