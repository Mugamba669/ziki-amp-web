<template>
  <div class="hot100">
    <button>
      <router-link to="/player">Home</router-link>
    </button>
    hot 100
  </div>
</template>

<script lang="js">
export default {
  name: 'Hot-100',
  components: {},
  data() {
    return {
      siteUrl: 'https://www.nowviba.com/music/pages/top100.php',
      streams: []
    }
  },
  methods: {},
  mounted() {},
  created() {}
}
</script>

<style lang="scss" scoped></style>
