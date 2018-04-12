<template>
  <transition 
    :css="false"
    @enter="animateIn"
    @leave="animateOut">
    <div 
      v-if="showPanel"
      ref="panel"
      :style="'transform: translateX(' + translateX + 'px)'"
      class="panel">
      <div 
        class="panel__close"
        @click="togglePanel">
        <img
          :src="require(`@/assets/img/icons/close.svg`)"
          class="panel__close-icon">
      </div>
      <div class="panel__content">
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
import anime from "animejs";

export default {
  name: "Panel",
  props: {
    showPanel: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
    panel: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    position: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  data() {
    return {
      translateX: this.position === "left" ? -440 : 440,
      panelTitle: this.panel,
      panelPosition: this.position
    };
  },
  methods: {
    togglePanel() {
      if (this.panelTitle === "festival-info") {
        this.$store.dispatch("toggleInfoPanel");
      } else if (this.panelTitle === "months-list") {
        this.$store.dispatch("toggleMonthsPanel");
      }
    },
    animateIn(el, done) {
      document.body.style.overflow = "hidden";

      // set styling of element based on prop position
      if (this.panelPosition === "left") {
        this.$refs.panel.style.left = "0px";
      } else if (this.panelPosition === "right") {
        this.$refs.panel.style.right = "0px";
      }

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
    animateOut(el, done) {
      document.body.style.overflow = "hidden";

      anime({
        targets: el,
        duration: 500,
        translateX: this.panelPosition === "left" ? -440 : 440,
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
@import "src/assets/scss/components/panel.scss";
</style>
