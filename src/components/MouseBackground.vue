<template>
  <div class="mouse-background"/>
</template>

<script>
import anime from "animejs";

export default {
  name: "MouseBackground",
  data() {
    return {
      xPos: null,
      yPos: null
    };
  },
  mounted() {
    document.body.addEventListener("mousedown", this.onMouseDown);
    document.body.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    document.body.removeEventListener("mousedown", this.onMouseDown);
    document.body.removeEventListener("mousemove", this.onMouseMove);
  },
  methods: {
    onMouseDown() {
      //   console.log("onMouseDown");
      //   this.xPos = e.clientX;
      //   this.yPos = e.clientY;
      //   console.log(this.xPos);
      //   console.log(this.yPos);
      //   console.log(this.$el);
      //   anime({
      //     targets: this.$el,
      //     duration: 250,
      //     delay: 50,
      //     left: this.xPos - 50,
      //     top: this.yPos - 50,
      //     easing: "easeOutExpo"
      //   });
    },
    onMouseMove(e) {
      this.xPos = e.clientX;
      this.yPos = e.clientY;

      anime({
        targets: this.$el,
        duration: 250,
        left: this.xPos - 50,
        top: this.yPos - 50,
        easing: "easeOutExpo"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/mouse-background.scss";
</style>
