<template>
 <div class="visual">
       <canvas v-show="displayVisual" ref="canvas"></canvas>
    </div>
  <div class="home">
  <div v-show="ptr1" class="part1">
         <Cover 
         v-if="!queueView" 
          v-show="showCover"
          :source="image"
          :audio="audio"
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
        @showVisual="toggleVisualWidget"
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
  <!-- <router-link to="/hot100">Hot 100</router-link> -->
      <Room
        v-show="roomView"
        :delays="delayArr"
        :feedback="feedBackArr"
        @closeRoom="closeRoom"
       />

     <div v-show="ptr2" class="prt2">
      
       <Dropdown
       v-show="displayVisual"
       @choice="chooseVisual"
       />
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
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import Room from "@/components/Room/Room.vue";
import * as mm from  "music-metadata-browser";
const { Visualizer } = require("../Core/Visualizer");
const { image } = require("../Core/default");
export default {
  name: 'Home',
  data(){
    return {
      displayVisual:false,
       audio:new Audio(),
       playlist:[],
       bufferArray:[],
       delayArr:[],
       feedBackArr:[],
       title:"....",
       artist:"....",
       album:"...",
       showEQ:false,
       showCover:true,
       ptr1:true,
       ptr2:true,
       image:null,
       size:0,
       curlTime:0,
       roomView:false,
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
      canvas:null,
      context:null,
      visualize:null,
      shuffle:false,
      selected:0,
      vise:null,
      eq:null,
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
    Dropdown,
    EQ,
    Room,
    Search,
  },
  methods: {
    loadTrack(value){
      for (let i = 0;i < value.length;i++) {
          this.playlist = [...this.playlist,{id:i,data:value[i],active:false}]
      localStorage.setItem(i,{id:i,data:value[i],active:false});

      }
      this.queueView = true;
    },

    liveS(query){ /// to perform a live search
        this.playlist = this.playlist.filter(song => {
          return song.findIndex(data => {
            data.name == query;
          })
        });
        console.log(this.playlist);

    },
  toggleVisualWidget(){
      this.displayVisual = ! this.displayVisual;
  },
    roomEffectsComponent(){
        this.ptr1 = !this.ptr1;
        this.ptr2 = !this.ptr2;
        this.roomView = !this.roomView;
    },
    closeRoom(){
      this.roomEffectsComponent();
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
         this.shuffle = !this.shuffle;
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
        mm.parseBlob(file).then(meta =>{
            console.log(meta.common);
        });
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
          this.image =  (this.bufferArray == undefined || this.bufferArray == '' || this.bufferArray == null)? image : imageURL;
          document.querySelector("body").style.backgroundImage = "url("+image+")";
      });
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
          // console.log(this.getTitle(queue[0].data));
      },
      toggleList(id){
               this.playlist = this.playlist.map((track) => track.id == id?{...track,active:!track.active}:track)
      },
    showQueue(){
      // this.showCover = !this.showCover;
        this.queueView = !this.queueView;
    },
    closeQueue(){
        this.queueView = !this.queueView;
       },
     chooseVisual(eventValue){
         switch(parseInt(eventValue)){
           case 1:
             this.vise.barsVisualiser();
             break;

             case 2:
               this.vise.dustyParticles()
               break;
             case 3:
               this.vise.histogramVisualiser()
               break;

             case 4:
               this.vise.sineWaveVisualiser()
               break;
             case 5:
               this.vise.rippleWaveVisualiser()
               break;
              
             case 6:
               this.vise.glassTilesVisualiser()
               break;
              
             case 7:
               this.vise.floatingBars()
               break;

                case 8:
               this.vise.colorstetchVisualiser()
               break;
         }
     }
  },
  
  mounted(){
    /**default volume = 0.17 */
    this.audio.volume = this.vol;

      /**  Canvas */
      this.canvas = this.$refs['canvas'];
      this.context = this.$refs['canvas'].getContext("2d");
    
      this.eq = new Equalizer(this.audio);
      this.vise = new Visualizer(this.eq.analyser,this.canvas,this.context);
  
      this.eq.startEq();
      this.eqBands = this.eq.getBands();
      this.delayArr = this.eq.getDelayBands();
      this.feedBackArr = this.eq.getFeedBack();

    // console.log(localStorage);
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
         this.showPlay =!this.showPlay;
         this.showPause = !this.showPause;
         
        //  eq.barsVisualiser();
    }

    this.audio.onended = ()=>{
        if(this.shuffle == true){
            this.countPlay = Math.floor(Math.random() * this.playlist.length);
            this.commonComand(this.playlist[this.countPlay].data);
        }else{
           this.countPlay +=1;
          this.commonComand(this.playlist[this.countPlay].data);
          this.toggleList(this.countPlay);
        }
         
    }

   this.audio.onplay = ()=>{
          this.showPlay =!this.showPlay;
         this.showPause = !this.showPause;
    }
  },
  created(){
    // console.log(image)
    // for (let index = 0; index < localStorage.length -8; index++) {
    //   const element = localStorage.getItem([index]);
    //   console.log(element.data)
    // }
  }
}
</script>
 
 <style lang="scss" scoped>
 *{
   user-select: none;
 }
   .visual{
          width: 100%;
          height: 100%;
           backdrop-filter: blur(94px)!important;
          z-index: -1!important;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events:none;
          background: rgba(0,0,0,0.3);
          canvas{
            z-index: -1!important;
          width:100%;
          height: 100%;

        }
    }
   .home {
      top: 0;
      left: 0;
       background: rgba(0,0,0,0.4);
        width: 100%;
        height: 100%;
        z-index:2!important;
        position: fixed;
         display: flex!important;
        flex-direction:row!important;
        justify-content: space-around!important;
        align-items: center!important;
        color:#ddd;
      .prt2,.part1{
          margin: 15px;
          // position:absolute;
          display: flex;
          flex-direction: column!important;
          justify-content: center!important;
          z-index: 3!important;
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
          z-index: 3!important;
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
        
       .prt2,.part1{
          
           display: flex;
          flex-direction: column!important;
          justify-content: center!important;
          align-items: center!important;
        }
      }
}
    
 </style>