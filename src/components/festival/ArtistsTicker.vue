<template>
  <div class="artists-ticker">
    <div class="artists-ticker__container">
      <image-transition>
        <img
          v-if="showImage"
          :src="require(`@/assets/img/artists/${imageUrl}.jpg`)"
          class="artists-ticker__image">
      </image-transition>
    </div>
    <div class="artists-ticker__rows">
      <div
        v-for="(row, index) in artistsInChunks"
        :key="`artists-row-${index}`"  
        :class="`artists-ticker__row artists-ticker__row--${index}`">
        <div :class="{'artists-ticker__artists artists-ticker__artists--odd': index % 2 === 0, 'artists-ticker__artists artists-ticker__artists--even': index % 2 !== 0 }">
          <span
            v-for="(artist, index) in row"
            :key="`artist-${index}`"  
            :class="`artists-ticker__artist`">
            {{ artist.name }}
          </span>
        </div>
        <div :class="{'artists-ticker__artists artists-ticker__artists--odd': index % 2 === 0, 'artists-ticker__artists artists-ticker__artists--even': index % 2 !== 0 }">
          <span
            v-for="(artist, index) in row"
            :key="`artist-${index}`"  
            :class="`artists-ticker__artist`">
            {{ artist.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTransition from "../../components/transitions/ImageTransition";

export default {
  name: "ArtistsTicker",
  components: {
    ImageTransition
  },
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
        { name: "Kendrick Lamar", imageUrl: "job-jobse-small" },
        { name: "Jeugd van Tegenwoordig", imageUrl: "bicep-small" },
        { name: "San Proper", imageUrl: "job-jobse-small" },
        { name: "Honey Dijon", imageUrl: "san-proper-small" },
        { name: "Fatima Yamaha", imageUrl: "job-jobse-small" },
        { name: "Job Jobse", imageUrl: "job-jobse-small" },
        { name: "Grizzly Bear", imageUrl: "san-proper-small" },
        { name: "Dua Lipa", imageUrl: "san-proper-small" },
        { name: "N.E.R.D.", imageUrl: "san-proper-small" },
        { name: "The War On Drugs", imageUrl: "san-proper-small" },
        { name: "Bicep", imageUrl: "bicep-small" },
        { name: "Actress", imageUrl: "jeugd-van-tegenwoordig-small" },
        { name: "Mr. Fingers", imageUrl: "jeugd-van-tegenwoordig-small" },
        { name: "Max Cooper", imageUrl: "jeugd-van-tegenwoordig-small" },
        { name: "Rival Consoles", imageUrl: "jeugd-van-tegenwoordig-small" },
        { name: "DJ Koze", imageUrl: "bicep-small" },
        { name: "Django Django", imageUrl: "bicep-small" },
        { name: "Alt-J", imageUrl: "bicep-small" },
        { name: "Febueder", imageUrl: "bicep-small" },
        { name: "Moscoman", imageUrl: "bicep-small" }
      ],
      artistsInChunks: [],
      timer: "",
      showImage: true,
      imageUrl: "jeugd-van-tegenwoordig-small"
    };
  },
  beforeMount() {
    this.divideArtistsInChunks(this.artistsTemp);
  },
  created() {
    this.timer = setInterval(this.randomizeImage, 10000 / 2);
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
    randomizeImage() {
      const randomArtist = this.artistsTemp[
        Math.floor(Math.random() * this.artistsTemp.length)
      ];

      this.showImage = !this.showImage;

      setTimeout(() => {
        this.imageUrl = randomArtist.imageUrl;
        this.showImage = !this.showImage;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festival/artists-ticker.scss";
</style>
