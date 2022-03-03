<template>
    <div>
        <div class="header">
           
        </div>
        <div class="content">

        </div>

    </div>
</template>

<script>
const Lyrics = require('4lyrics');
export default {
    name:'Lyrics',
    props:{
        title:String,
        artist:String
    }
    ,methods:{
        fetchLyrics(){
            // console.log(`${this.title} ${this.artist}`);
            // Lyrics.musixmatch.getURL(`${this.title} ${this.artist}`)
            // .then((r) => Lyrics.musixmatch.getLyrics(r))
            // .then((lyrics) => {
            //     console.log(lyrics);
            // });
        }
    },
    mounted(){
        this.fetchLyrics();
    }
}
</script>
<style lang="scss">
    
</style>