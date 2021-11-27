<template>
    <div class="hot100">
      <div class="container">
         <div class="stream" v-bind:key="stream" v-for="stream in streams">
            <img :src="stream.url" :alt="stream.title">
        </div>
      </div>
        
    </div>
</template>

<script>
import Axios from "axios";
import cheerio from "cheerio";
import MediaLibrary from "media-library";
export default {
  name: 'Hot100',
  components:{
    
  },
  data() {
    return{
        siteUrl:"https://www.nowviba.com/music/pages/top100.php",
        streams:[]
    }
  },
  methods:{
    
    },
    mounted(){
var library = new MediaLibrary({
  // persistent storage location (optional)
  dataPath: '/home/mugamba/Desktop',
  // the paths to scan
  paths: [ '/home/mugamba/Music' ]
});
 
// Scanning files (only needed at first start and when paths are added)
library.scan()
.on('track', (track) => {
  console.log(track);
})
.on('done', () => {
    // listing all tracks
    // library.tracks((err, tracks) => console.log(tracks));
    // library.scanCovers((err, tracks) => console.log(tracks));
 
    // listing artists  
    // library.artists((err, tracks) => console.log(tracks));
 
    // searching tracks
    // library.find({ artist: 'radiohead', title: 'ok' }, (err, tracks) => {
    //     console.log(tracks);
    // });
});
      // Axios.request()
        // Axios.get(this.siteUrl).then((response)=>{
        //    const ch = cheerio.load(response.data);
        //     let trackList = ch('.hot100');
        //     console.log(trackList)
        //     console.log(fs)
        // trackList.map((index,element)=>{
        //     let hot100 = {
        //         title:`${element.children[0].children[5].children[0].children[0].data}`,
        //         artist:`${element.children[0].children[5].children[1].children[0].data}`,
        //         artWork:`${element.children[0].children[3].children[1].attribs.data}`,
        //         url:`${element.children[2].children[3].children[1].attribs.src}`
        //     };
        //     console.log(hot100)
        //     this.streams = [...this.streams,hot100];
        // });
    // });
  }
}
</script>

<style lang="scss" scoped>
    .hot100{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      .container{
        width:600px;
        height:500px;
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(150px,0fr));
        grid-gap: 5px 5px;
        grid-template-rows: auto;
        .stream{
          width: 100%;
          object-fit: contain;
          height: auto;
        }
       }
    }
</style>