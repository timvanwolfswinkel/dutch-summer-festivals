<template>
  <div class="footer-block">
    <div class="footer-block__header">
      <span class="footer-block__title">Awesome, I’m gonna be there.</span>
    </div>
    <div class="footer-block__buttons">
      <div class="footer-block__button footer-block__button--margin">
        <button-link 
          :url="facebookEventUrl"
          text="attend on facebook"
          emoji="🙌🏻"/>
      </div>
      <div class="footer-block__button">
        <button-link 
          :url="ticketUrl"
          text="buy tickets" 
          emoji="💸"/>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonLink from "../../components/ButtonLink";

export default {
  name: "FooterBlock",
  components: {
    ButtonLink
  },
  props: {
    facebookEventUrl: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    },
    ticketUrl: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/footer-block.scss";
</style>
