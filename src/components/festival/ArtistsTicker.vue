<template>
  <div class="artists-ticker">
    <div
        v-for="(row, index) in artistsInChunks"
        :key="`artists-row-${index}`"  
        :class="`artists-ticker__row artists-ticker__row--${index}`">
        <span
        v-for="(artist, index) in row"
        :key="`artist-${index}`"  
        :class="`artists-ticker__artist`">
          {{ artist.name }}
        </span>
      </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "ArtistsTicker",
  props: {
    artists: {
      type: Object,
      required: false,
      default: () => {},
      validate(value) {
        return [value];
      }
    }
  },
  data() {
    return {
      // TODO: fill this data with props artists
      artistsTemp: [
        { name: "Kendrick Lamar", imageUrl: "1" },
        { name: "Jeugd van Tegenwoordig", imageUrl: "2" },
        { name: "San Proper", imageUrl: "3" },
        { name: "Honey Dijon", imageUrl: "4" },
        { name: "Fatima Yamaha", imageUrl: "5" },
        { name: "Job Jobse", imageUrl: "6" },
        { name: "Grizzly Bear", imageUrl: "7" },
        { name: "Dua Lipa", imageUrl: "8" },
        { name: "N.E.R.D.", imageUrl: "9" },
        { name: "The War On Drugs", imageUrl: "10" },
        { name: "Bicep", imageUrl: "11" },
        { name: "Actress", imageUrl: "12" },
        { name: "Mr. Fingers", imageUrl: "13" },
        { name: "Max Cooper", imageUrl: "14" },
        { name: "Rival Consoles", imageUrl: "15" },
        { name: "DJ Koze", imageUrl: "16" },
        { name: "Django Django", imageUrl: "17" },
        { name: "Alt-J", imageUrl: "18" },
        { name: "Febueder", imageUrl: "19" },
        { name: "Moscoman", imageUrl: "20" }
      ],
      artistsInChunks: []
    };
  },
  beforeMount() {
    this.divideArtistsInChunks(this.artistsTemp);
  },
  mounted() {
    this.animateRows();
  },
  methods: {
    divideArtistsInChunks(artists) {
      const splitSize = Math.floor(artists.length / 3);
      const maxSize = 2;
      let i;

      // loop trough artists array and divide them into chunks
      for (i = 0; i < artists.length; i += splitSize) {
        // only allow 3 arrays into the chunks array (for 3 rows)
        if (!(this.artistsInChunks.length > maxSize)) {
          this.artistsInChunks.push(artists.slice(i, i + splitSize));
        }
      }
    },
    animateRows(){
      const rows = this.$el.querySelectorAll(".artists-ticker__row");
      console.log(rows);

      // Duplicate the row
      // When x exceeds width of row append new row
      // Animate rows (middle row should go in opposite direction)

      [].forEach.call(rows, row => {
        if(row.className === "artists-ticker__row artists-ticker__row--1") {
          console.log("reverse");
          anime({
            targets: row,
            duration: 5000,
            translateX: -500,
            easing: "easeOutExpo",
            loop: true
          });
        } else {
          anime({
            targets: row,
            duration: 5000,
            translateX: 500,
            easing: "easeOutExpo",
            loop: true
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/artists-ticker.scss";
</style>
