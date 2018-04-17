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
      yPos: null,
      elementYPos: null
    };
  },
  mounted() {
    document.body.addEventListener("mousedown", this.onMouseDown);
    document.body.addEventListener("mouseup", this.onMouseUp);
    document.body.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    document.body.removeEventListener("mousedown", this.onMouseDown);
    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mousemove", this.onMouseMove);
  },
  methods: {
    onMouseDown() {
      anime.remove(this.$el);
      
      anime({
        targets: this.$el,
        duration: 500,
        delay: 50,
        scale: 0.5,
        easing: "easeOutExpo"
      });
    },
    onMouseUp() {
      anime.remove(this.$el);

      anime({
        targets: this.$el,
        duration: 500,
        delay: 50,
        scale: 1,
        easing: "easeOutExpo"
      });
    },
    onMouseMove(e) {
      // TODO: Do not allow element to go outside of window (causing scrollbars)
      this.xPos = e.clientX;
      this.yPos = e.clientY;
      
      // check with mouse position rather then element position
      // this.elementYPos = !(this.elementYPos > window.innerHeight - 100) && !(this.elementYPos < window.screenY) ? this.yPos - 50 : this.elementYPos;

      // console.log("innerheight: " + window.innerHeight);
      // console.log("elementpos: " + this.elementYPos);
      // console.log(!(this.elementYPos > window.innerHeight - 100));
      // console.log("screentop: " + window.screenTop);
      // console.log(!(this.elementYPos < 0));

      // if bigger then window height or smaller then window height + 100

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
