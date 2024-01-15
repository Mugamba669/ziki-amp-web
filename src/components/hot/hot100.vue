<template lang="html">
    <div class="hot-container">
        <div v-for="(songs,index) in (hot100)" @click="playSong(songs.url)" :key="index">
            <div class="song-card">
                <div class="img-cover">
                    <img :src="songs.artWork" class="cover"  alt="album cover" />
                </div>
                <div class="song-info">
                    <span>{{ songs.title }}</span>
                    <span>{{ songs.artist }} - {{ songs.album }}</span>
                </div>
                <div>
                   <v-button 
                   icon="pi pi-download"
                    size="2"
                    @click="downloadFile(songs.url)"
                    label="Download"
                    severity="info" />

                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { mapGetters, mapMutations } from 'vuex'
import VButton from 'primevue/button'
import axios from 'axios'
export default {
  name: 'V-Hot100',
  computed: {
    ...mapGetters(['hot100'])
  },
  components: {
    VButton
  },
  methods: {
    ...mapMutations(['playHot100']),
    playSong(song: string) {
      this.playHot100(song)
    },
    downloadFile(url: string) {
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      axios
        .get(url)
        .then((response) => {
          if (response.status != 200) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
          }
          return response.data
        })
        .then((blob) => {
          console.log(blob)
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch((error) => {
          console.error('Error during file download:', error)
        })
    }

    // Example usage
    // const fileUrl = 'https://example.com/path/to/file.txt';
    // const desiredFileName = 'downloaded_file.txt';

    // downloadFile(fileUrl, desiredFileName);
  }
}
</script>
<style lang="scss" scoped>
.hot-container {
  width: 600px !important;
  height: 600px !important;
  padding: 10px;
  //   box-shadow: inset 0px 0px 5px 0px #eee;
  background-color: rgba(20, 20, 20, 0.514);
  backdrop-filter: blur(30px);
  word-wrap: break-word;
  border-radius: 10px;
  border: 0.3px solid #eeeeee67;
  overflow-y: scroll !important;
  overflow-x: none !important;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #00000000;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .song-card {
    width: 400px;
    display: flex;
    margin: 10px;
    background: #888;
    border-radius: 10px;
    flex-direction: row;
    // justify-content: space-between !important;
    align-items: center !important;
    .song-info {
      width: 100% !important;
      display: flex;
      margin: 10px;
      background: #888;
      flex-direction: column;
      // justify-content: space-between !important;
      span {
        font: 13px 100 Arial;
      }
    }
    .img-cover {
      width: 80px;
      height: 80px;
      padding: 10px;
      .cover {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: contain;
      }
    }
  }
}
</style>