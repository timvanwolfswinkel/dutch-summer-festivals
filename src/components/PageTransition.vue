<template>
  <div 
    ref="pageTransition"
    class="page-transition"
    style="transform:scaleX(0)"/>
</template>

<script>
import anime from "animejs";

export default {
  name: "PageTransition",
  mounted() {
    this.animate();
  },
  beforeDestroy() {
    // TODO: animate before destroy (or load transition into homepage and fire only when not initial pageload)
    this.animate();
  },
  methods: {
    animate() {
      const animatedTransition = anime.timeline();
      const el = this.$refs.pageTransition;

      animatedTransition
        .add({
          targets: el,
          duration: 600,
          delay: 500,
          scaleX: 1,
          easing: "easeOutExpo",
          complete() {
            el.style.transformOrigin = "0 100%";
          }
        })
        .add({
          targets: el,
          duration: 600,
          delay: 50,
          scaleX: 0,
          easing: "easeOutExpo",
          complete() {
            el.style.transformOrigin = "100% 0";
          }
        });
      // --------- TODO: ANIMATE A SECOND TIME (IF WANTED) ---------
      // .add({
      //   targets: el,
      //   duration: 600,
      //   delay: 10,
      //   scaleX: 1,
      //   easing: "easeOutExpo",
      //   complete() {
      //     el.style.transformOrigin = "0 100%";
      //   }
      // })
      // .add({
      //   targets: el,
      //   duration: 600,
      //   delay: 50,
      //   scaleX: 0,
      //   easing: "easeOutExpo"
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/page-transition.scss";
</style>
