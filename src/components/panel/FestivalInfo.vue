<template>
  <panel 
    :show-panel="showInfoPanel" 
    :panel="'festival-info'"
    :position="'right'">
    <div class="festival-info">
      <element-transition :delay="1">
        <span
          v-show="showInfoPanel" 
          class="festival-info__heading">{{ festival.name }}</span>
      </element-transition>
      <element-transition :delay="2">
        <span
          v-show="showInfoPanel" 
          class="festival-info__heading-small">Date</span>
      </element-transition>
      <element-transition :delay="3">
        <span 
          v-show="showInfoPanel"
          class="festival-info__heading-medium">{{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonthFull }}</span>
      </element-transition>
      <element-transition :delay="4">
        <span 
          v-show="showInfoPanel"
          class="festival-info__heading-small">Tickets</span>
      </element-transition>
      <element-transition :delay="5">
        <span 
          v-show="showInfoPanel"
          class="festival-info__heading-medium">€80 - €120</span>
      </element-transition>
      <element-transition :delay="6">
        <span 
          v-show="showInfoPanel"
          class="festival-info__heading-small">About</span>
      </element-transition>
      <element-transition :delay="7">
        <p 
          v-show="showInfoPanel"
          class="festival-info__description">{{ festival.shortDescription }}</p>
      </element-transition>
      <element-transition :delay="8">
        <div 
          v-show="showInfoPanel"
          class="festival-info__learn-more">
          <span class="festival-info__heading-small festival-info__heading-small--inline">Learn more</span>
          <router-link :to=" {name: 'Festival', params: { festivalId : festival.url } }">
            <img
              :src="require(`@/assets/img/icons/learn-more.svg`)"
              class="festival-info__icon">
          </router-link>
        </div>
      </element-transition>
    </div>
  </panel>
</template>

<script>
import Panel from "./Panel";
import ElementTransition from "../../components/transitions/ElementTransition";

export default {
  name: "FestivalInfo",
  components: {
    Panel,
    ElementTransition
  },
  props: {
    showInfoPanel: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  computed: {
    festival() {
      // TODO: Fix on page load error
      const festivalId = this.$store.state.festivalId;
      const festival = this.$store.getters.getFestivalById(festivalId);

      return festival[0].fields;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/panel/festival-info.scss";
</style>
