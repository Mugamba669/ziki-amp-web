<template>
  <div class="home">
   

  <div v-show="ptr1" class="part1">
         <Cover 
         v-if="!queueView" 
          v-show="showCover"
          :source="image"
          :playState="playState"
          />

        <EQ
          @closeEQ="closeEQ"
          :bandSet="eqBands"
          v-show="showEQ"
        />

      <Loader 
        v-if="!queueView" 
        @showQueue="showQueue"
        v-show="showCover"
        @trackLoader="loadTrack"
        @toggleEQ="toggleEQ"
        @showVol="showVol"
        @loadSingle="loadSingle"
        @showRoom="roomEffectsComponent"
      />

         <Volume
          v-if="!queueView"
          v-show="showV"
          @closeVol="closeVol"
          @changeVol="changeVol"
     />

       <Queue 
        @closeQueue="closeQueue"
        @queuePlay="playQueue"
        v-if="queueView" 
        :queueList="playlist"/>

         <!-- Visulizer -->
       
  </div>
     <div class="visual">
          <canvas ref="canvas"></canvas>
          <slot></slot>
       </div>

     <div v-show="ptr2" class="prt2">
       <!-- <Search
        @live="liveS"
       /> -->
        <Details 
        v-show="showCover"
          :title="title"
          :artist="artist"
          :album="album"
          :size="size"
        />
        <Slider
        v-show="showCover"
            @updateChange="updateSlider"
            :max="progMax"
            :currentValue="curlTime"
            :output="progress"
            :duration="durlTime"
        />
      <Control 
          v-show="showCover"
          @playtrack="playTrack" 
          @pausetrack="pauseNow"
          @looptrack="repeatTrack"
          @seektrack="seekNow"
          @shuffleTrack="shuffleTracks"
          @prevTrack="prevSeek"
          :phide="showPlay"
          :pshow="showPause"
          :togglebtn="btnValue"
          />
       </div>
  </div>
</template>
<script>
import Slider from '@/components/Slider.vue'; // @ is an alias to /src
import Cover from '@/components/ImageWidget/Cover.vue'; // @ is an alias to /src
import Details from "@/components/Details/Details.vue";
import Control from "@/components/ControlWidget/Control.vue";
import Loader from "@/components/loader/Loader.vue";
import Volume from "@/components/VolumeControl/Volume.vue";
import { Equalizer } from "../Core/Equalizer";
import EQ from "@/components/EqaulizerWidget/Equalizer.vue";
import Queue from "@/components/Queue/Queue.vue"
import Search from "@/components/Search/Search.vue";
import * as mm from  "music-metadata-browser";

export default {
  name: 'Home',
  data(){
    return {
       audio:new Audio(),
       playlist:[],
       bufferArray:[],
       title:"tat",
       artist:"",
       album:"",
       showEQ:false,
       showCover:true,
       ptr1:true,
       ptr2:true,
       image:`../assets/logo.png`,
       size:0,
       curlTime:0,
       progress:0,
       progMax:1,
       trackData:File,
       durlTime:"",
       showPlay:true,
       showPause:false,
       btnValue:"EQ",
       queueView:false,
       showV:false,
       vol:0.17,
       visual:true,
       loop:false,
       countPlay:0,
       eqBands:[],
       playState:"paused",
      canvas:null,
      context:null,
       
    }
  
  },
  components: {
    Slider,
    Loader,
    Cover,
    Details,
    Control,
    Volume,
    Queue,
    EQ,
    Search,
  },
  methods: {
    loadTrack(value){
      for (let i = 0;i < value.length;i++) {
          this.playlist = [...this.playlist,{id:i,data:value[i],active:false}]
          //  this.getTitle(value[i]);
      }
        // this.showPlay = false;
        //  this.showPause = true;
      this.queueView = true;
      // this.showCover = false;
    //  this.commonComand(value);
    // this.$state.playlist
    },

    liveS(query){ /// to perform a live search
        this.playlist = this.playlist.filter(song => {
          return song.findIndex(data => {
            data.name == query;
          })
        });
        console.log(this.playlist);

    },
    roomEffectsComponent(){

    },
    loadSingle(file){
      let id = 0;
      const listTile = {
              id:id,
              data: file,
              active:false
              };

      this.playlist = [...this.playlist,listTile];
      this.commonComand(file);
      this.showPlay = false;
      this.showPause = true;
      id++;
    },
    closeEQ(){
      this.showEQ = !this.showEQ;
       this.showCover = !this.showCover;
    },
    playTrack(){
         this.showPlay = !this.showPlay;
         this.showPause = !this.showPause;
         this.audio.play();
    },
    pauseNow(){
     this.showPlay = true;
         this.showPause = false;
      this.audio.pause();
    },
    shuffleTracks(){
         this.countPlay = Math.floor(Math.random() * this.playlist.length);
        this.commonComand(this.playlist[this.countPlay].data);
    },
    changeVol(vol){
        this.audio.volume = vol;
        this.vol = vol;
    },
    closeVol(){
      this.showV = !this.showV;
    },
    showVol(){
      this.showV = !this.showV;
    },
    getTitle(file){
  
        // mm.parseBlob(file).then(meta =>{
        //     console.log(meta.common);
        // });
    },
    commonComand(track){
      const url =  URL.createObjectURL(track);
      this.audio.src = url;
      this.audio.play();
      this.size = ((track.size)/1000000);
      mm.parseBlob(track).then(meta => {
        // console.log(meta);
      this.title = meta.common.title == null ? (track.name).replace(".mp3","") : meta.common.title;
      this.artist = meta.common.artist == null ? "Unknown artist" : meta.common.artist;
      this.album = meta.common.album == null ? "Unknown album" : meta.common.album ;
      this.bufferArray = meta.common.picture[0].data;
    document.querySelector("title").value = this.title;
      // const unprocessedData =this.buff;
      /**
       * Track infor processed
       */
          var data = new Uint8Array(this.bufferArray);
          const blob = new Blob([data],{type:"image/jpeg"});
          const imageURL = URL.createObjectURL(blob);
          this.image =  this.bufferArray == null ? "../assets/pAudio.jpeg": imageURL;
          document.querySelector("body").style.backgroundImage = "url("+imageURL+")";
      })
    },
    seekNow(){
       this.countPlay +=1;
       this.commonComand(this.playlist[this.countPlay].data);
       this.toggleList(this.countPlay);
    },
    prevSeek(){
         this.countPlay -= 1;
        this.commonComand(this.playlist[this.countPlay].data);
        this.toggleList(this.countPlay);
    },
    repeatTrack(){
      this.loop = !this.loop;
       // toggle audio repeat 
      this.audio.loop = this.loop == true ? true : false;
    },
    updateSlider(value){
         this.audio.currentTime = value;
    },
    toggleEQ(){
      this.showEQ = !this.showEQ;
      this.showCover = !this.showCover;
    },
    playQueue(queue){
          this.commonComand(queue[0].data);
          this.countPlay = queue[1];
          this.closeQueue();
          this.toggleList(queue[1]);
          console.log(this.getTitle(queue[0].data));
      },
      toggleList(id){
               this.playlist = this.playlist.map((track) => track.id == id?{...track,active:!track.active}:track)
      },
    showQueue(){
      // this.showCover = !this.showCover;
        this.queueView = !this.queueView;
    },
    closeQueue(){
      //  this.showCover = !this.showCover;
        this.queueView = !this.queueView;
       }
  },
  
  mounted(){
    /**default volume = 0.17 */
    this.audio.volume = this.vol;

      /**  Canvas */
      this.canvas = this.$refs['canvas'];
      this.context = this.$refs['canvas'].getContext("2d");
    console.log(this.canvas)
    console.log(this.context)
      const eq = new Equalizer(this.audio,this.canvas,this.context);

      eq.startEq();
      this.eqBands = eq.getBands();
    // console.log(can);
  setInterval(()=>{
           this.progress = this.audio.currentTime;
          this.progMax = this.audio.duration;
        },500);

    this.audio.ontimeupdate = ()=>{
      /**Display the track's current time */
       const min = Math.floor((this.audio.currentTime / 60) % 60)
       const sec = Math.floor(this.audio.currentTime % 60 );
       this.curlTime = sec < 10 ? min+":0"+sec:min+":"+sec;
/**Display the track duration */
       const dmin = Math.floor((this.audio.duration / 60) % 60)
       const dsec = Math.floor(this.audio.duration % 60 );
       this.durlTime = dsec < 10 ?dmin+":0"+dsec:dmin+":"+dsec;

    }
    this.audio.onpause = ()=>{
         this.showPlay = true;
         this.showPause = false;
         eq.barsVisualiser();
    }

    this.audio.onended = ()=>{
      //  this.showPlay = true;
      //    this.showPause = false;
          this.countPlay +=1;
         this.commonComand(this.playlist[this.countPlay].data);
         this.toggleList(this.countPlay);
    }

   this.audio.onplay = ()=>{
          this.showPlay = false;
         this.showPause = true;
    }
  },
  created(){}
}
</script>
 
 <style lang="scss" scoped>
 *{
   user-select: none;
 }
   .home {
        backdrop-filter: blur(94px);
        width: 100%;
        height: 100%;
        position: fixed;
         display: flex!important;
        flex-direction:row!important;
        justify-content: space-around!important;
        align-items: center!important;
        background: rgba(0,0,0,0.3);
        top: 0;
        left: 0;
        color:#ddd;
      .prt2,.part1{
          margin: 15px;
           display: flex;
          flex-direction: column!important;
          justify-content: center!important;
          align-items: center!important;
        }
      }
@media (max-width:901px) {
   .home{
        backdrop-filter: blur(94px);
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        display: flex!important;
        flex-direction: column  !important;
        justify-content: center!important;
        align-items: center!important;
        color:#ddd;
        .visual{
          width: 100%;
          height: 100%;
          z-index: 1;
          position: fixed;
          canvas{
          width:100%;
          height: 100%;
        }
      }
        
       .prt2,.part1{
           display: flex;
          flex-direction: column!important;
          justify-content: center!important;
          align-items: center!important;
        }
      }
       
}
    
@media (max-width:480px) {
   .home{
        backdrop-filter: blur(94px);
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        display: flex!important;
        flex-direction: column  !important;
        justify-content: center!important;
        align-items: center!important;
        color:#ddd;
        .visual{
          width: 100%;
          height: 100%;
          z-index: 1;
          position: fixed;
          canvas{
          width:100%;
          height: 100%;

        }
    }
        
       .prt2,.part1{
          
           display: flex;
          flex-direction: column!important;
          justify-content: center!important;
          align-items: center!important;
        }
      }
       
}
    
 </style>