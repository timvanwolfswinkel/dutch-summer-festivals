<template>
  <div 
    class="info-panel">
    <div 
      class="info-panel__close"
      @click="toggleInfoPanel">
      <img
        :src="require(`@/assets/img/icons/close.svg`)"
        class="info-panel__close-icon">
    </div>
    <div class="info-panel__content">
      <span class="info-panel__heading">{{ festival.name }}</span>
      <span class="info-panel__heading-small">Date</span>
      <span class="info-panel__heading-medium">{{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonthFull }}</span>
      <span class="info-panel__heading-small">Tickets</span>
      <span class="info-panel__heading-medium">€80 - €120</span>
      <span class="info-panel__heading-small">About</span>
      <p class="info-panel__description">{{ festival.shortDescription }}</p>
      <div class="info-panel__learn-more">
        <span class="info-panel__heading-small info-panel__heading-small--inline">Learn more</span>
        <router-link :to=" {name: 'Festival', params: { festivalId : festival.url } }">
          <img
            :src="require(`@/assets/img/icons/learn-more.svg`)"
            class="info-panel__icon">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPanel",
  computed: {
    festival() {
      const festivalId = this.$store.state.festivalId;
      const festival = this.$store.getters.getFestivalById(festivalId);

      return festival[0].fields;
    }
  },
  methods: {
    toggleInfoPanel() {
      this.$store.dispatch("toggleInfoPanel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/info-panel.scss";
</style>
