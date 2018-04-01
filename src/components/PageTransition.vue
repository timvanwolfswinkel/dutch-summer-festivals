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
        delay: 200,
        scaleX: 0,
        easing: "easeOutExpo"
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/page-transition.scss";
</style>
