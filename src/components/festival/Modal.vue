<template>
  <div
    v-if="showModal" 
    class="modal">
    <span 
      class="modal__close" 
      @click="closeModal()">close</span>
    <div class="modal__content">
      <youtube 
        ref="youtube"
        :video-id="getId()"
        :player-vars="playerVars"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
    videoUrl: {
      type: String,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  data() {
    return {
      playerVars: {
        autoplay: 1
      }
    };
  },
  methods: {
    closeModal() {
      this.$store.dispatch("toggleModal");
      document.body.style.overflow = "auto";
    },
    getId() {
      return this.$youtube.getIdFromUrl(this.$props.videoUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/modal.scss";
</style>
