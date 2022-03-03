<template>
  <div class="hot100">
    <button>
  <router-link to="/player">Home</router-link>

    </button>

    hot 100
    <!-- <div class="container">
         <div class="stream" v-bind:key="stream" v-for="stream in streams">
            <img :src="stream.url" :alt="stream.title">
        </div>
      </div>
         -->
  </div>
</template>

<script>
import axios from "axios";
import MediaLibrary from "media-library";
export default {
  name: "Hot100",
  components: {},
  data() {
    return {
      siteUrl: "https://www.nowviba.com/music/pages/top100.php",
      streams: [],
    };
  },
  methods: {},
  mounted() {
  },
  created() {
  //  axios.get('https://www.nowviba.com/music/pages/top100.php/').then((data) => console.log(data.data));

    console.log(process.env);
  },
};
</script>

<style lang="scss" scoped>
</style>