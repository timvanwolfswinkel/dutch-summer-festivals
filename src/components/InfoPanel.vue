<template>
  <transition 
    :css="false"
    @enter="animateInfoPanelIn"
    @leave="animateInfoPanelOut">
    <div 
      v-if="showInfoPanel"
      ref="infoPanel"
      class="info-panel"
      style="transform: translateX(440px)">
      <div 
        class="info-panel__close"
        @click="toggleInfoPanel">
        <img
          :src="require(`@/assets/img/icons/close.svg`)"
          class="info-panel__close-icon">
      </div>
      <div class="info-panel__content">
        <element-transition :delay="1">
          <span
            v-show="showInfoPanel" 
            class="info-panel__heading">{{ festival.name }}</span>
        </element-transition>
        <element-transition :delay="2">
          <span
            v-show="showInfoPanel" 
            class="info-panel__heading-small">Date</span>
        </element-transition>
        <element-transition :delay="3">
          <span 
            v-show="showInfoPanel"
            class="info-panel__heading-medium">{{ festival.startDate | dateDay }} - {{ festival.endDate | dateDayMonthFull }}</span>
        </element-transition>
        <element-transition :delay="4">
          <span 
            v-show="showInfoPanel"
            class="info-panel__heading-small">Tickets</span>
        </element-transition>
        <element-transition :delay="5">
          <span 
            v-show="showInfoPanel"
            class="info-panel__heading-medium">€80 - €120</span>
        </element-transition>
        <element-transition :delay="6">
          <span 
            v-show="showInfoPanel"
            class="info-panel__heading-small">About</span>
        </element-transition>
        <element-transition :delay="7">
          <p 
            v-show="showInfoPanel"
            class="info-panel__description">{{ festival.shortDescription }}</p>
        </element-transition>
        <element-transition :delay="8">
          <div 
            v-show="showInfoPanel"
            class="info-panel__learn-more">
            <span class="info-panel__heading-small info-panel__heading-small--inline">Learn more</span>
            <router-link :to=" {name: 'Festival', params: { festivalId : festival.url } }">
              <img
                :src="require(`@/assets/img/icons/learn-more.svg`)"
                class="info-panel__icon">
            </router-link>
          </div>
        </element-transition>
      </div>
    </div>
  </transition>
</template>

<script>
// TODO: move content outside of component
import anime from "animejs";

import ElementTransition from "../components/ElementTransition";

export default {
  name: "InfoPanel",
  components: {
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
      const festivalId = this.$store.state.festivalId;
      const festival = this.$store.getters.getFestivalById(festivalId);

      return festival[0].fields;
    }
  },
  methods: {
    toggleInfoPanel() {
      this.$store.dispatch("toggleInfoPanel");
    },
    // TODO: disable clicking on element during animation (state)
    // TODO: before route leave set panel to false
    animateInfoPanelIn(el, done) {
      document.body.style.overflow = "hidden";
      this.$refs.infoPanel.style.right = "0px";

      anime({
        targets: el,
        duration: 500,
        translateX: 0,
        easing: "easeOutExpo",
        complete() {
          document.body.style.overflow = "auto";
          done();
        }
      });
    },
    animateInfoPanelOut(el, done) {
      document.body.style.overflow = "hidden";

      anime({
        targets: el,
        duration: 500,
        translateX: 440,
        easing: "easeOutExpo",
        complete() {
          document.body.style.overflow = "auto";
          done();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/info-panel.scss";
</style>
