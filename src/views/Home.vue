<template>
 <div class="visual">
       <canvas v-show="displayVisual" ref="canvas"></canvas>
    </div>
  <div class="home">
  <div :class="[ptr1?'active':'','part1']">
         <Cover 
         v-if="!queueView" 
          v-show="showCover"
          :source="image"
          :playing="checker"
          />

        <EQ
        :class="[showEQ?'active':'','EQ']"
          @closeEQ="closeEQ"
          :bandSet="eqBands"
          
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
         :class="[showV?'active':'','volume']"
          @closeVol="closeVol"
          
     />

       <Queue 
       :class="[listView?'active':'','listView']"
        @closeQueue="closeLQueue"
        @queuePlay="playL"
        :queueList="playlist"/>

         <GridView 
          :class="[queueView?'active':'','gView']"
            :listTrack="playlist"
            @gridPlay="playQueue"
            @closeQueue="closeQueue"
            />
            
         <!-- Visulizer -->
  </div>

  <!-- <router-link to="/hot100">Hot 100</router-link> -->
      <Room
      :class="[roomView?'active':'','room']"
        
        :delays="delayArr"
        :feedback="feedBackArr"
        @closeRoom="closeRoom"
       />


     <div :class="[ptr2?'active':'','prt2']">
      
       <Dropdown
       v-show="displayVisual"
       @choice="chooseVisual"
       />
       <!-- <Search
        @live="liveS"
       /> -->
       <div  class="b">
         <button v-show="!showEQ" @click="viewOpt">View</button>
         <button v-show="!showEQ" @click="loadLyrics">Lyrics</button>
         <button v-show="!showEQ" @click="loadHot100">Hot 100</button>
       </div>
       <div :class="[showOpt?'active':'','options']">
         <p @click="listShow">ListView</p>
         <p @click="gridShow">GirdView</p>
       </div>
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
       <Hot100 
       @closeHot="closeHot"
       @triggerResize="resize"
       :class="[showHot100?'active':'','hot100']"
     
       />
        <BottomSheet
          :class="[showNext?'active':'','bottom']"
          :playlist="nextTrack"
          @closeB="closeB"
          />
           <Lyrics
       @closeL="closeLyrics"
        :class="[showLyrics?'active':'','lyrics']" :content="lyrics"/>
  </div>
      

 
 
</template>
<script>

import Slider from '@/components/Slider.vue'; // @ is an alias to /src
import Cover from '@/components/ImageWidget/Cover.vue'; // @ is an alias to /src
import Details from "@/components/Details/Details.vue";
import Control from "@/components/ControlWidget/Control.vue";
import Loader from "@/components/loader/Loader.vue";
import Volume from "@/components/VolumeControl/Volume.vue";
import EQ from "@/components/EqaulizerWidget/Equalizer.vue";
import Queue from "@/components/Queue/Queue.vue"
import Search from "@/components/Search/Search.vue";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import Room from "@/components/Room/Room.vue";
import * as mm from  "music-metadata-browser";
import Lyrics from "@/components/Lyrics/Lyrics.vue";
import GridView from "@/components/Queue/Grid.vue";
import Hot100 from "@/components/Music/Hot100.vue";
import BottomSheet from "@/components/model/BottomSheet.vue";
const { ipcRenderer } = window.require('electron');
const { Visualizer } = require("../Core/Visualizer");
const { image } = require("../Core/default");
export default {
  name: 'Home',
  data(){
  
    return {
      displayVisual:false,
       audio:null,
       playlist:[],
       bufferArray:[],
       current:[],
       delayArr:[],
       feedBackArr:[],
       title:"",
       artist:"",
       album:"",
       nPlay:{title:"title", artist:"",album:"",artwork:image},
      nextTrack:{title:"",artist:"",image:image },
       showEQ:false,
       showCover:true,
       showLyrics:false,
       listView:false,
       ptr1:true,
       ptr2:true,
       showNext:false,
       image:image,
       size:0,
       curlTime:0,
       roomView:false,
       progress:0,
       progMax:1,
       trackData:File,
       durlTime:"",
       showPlay:true,
       showPause:false,
       showOpt:false,
       btnValue:"EQ",
       queueView:false,
       showV:false,
       vol:0,
       visual:true,
       loop:false,
       stopAnime:0,
       countPlay:0,
       eqBands:[],
      canvas:null,
      showHot100:false,
      context:null,
      visualize:null,
      shuffle:false,
      checker:false,
      selected:0,
      frameResize:false,
      vise:null,
      eq:null,
      lyrics:'',
      audioSrc:''
    }
  
  },
  components: {
    Slider,
    Loader,
    Lyrics,
    Cover,
    Details,
    Hot100,
    BottomSheet,
    GridView,
    Control,
    Lyrics,
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
        mm.parseBlob(value[i]).then(meta => {
          const raw = meta.common.picture[0].data;
           var data = new Uint8Array(raw);
          const blob = new Blob([data]);
          const imageURL = URL.createObjectURL(blob);
          const processed = {id:i+1, data:value[i],active:false,
                              artwork:(raw == undefined ||raw == null)? image : imageURL,
                            title:(meta.common.title == null || meta.common.title == undefined) ? (value[i].name).replace(".mp3","") : meta.common.title,
                           artist:(meta.common.artist == null || meta.common.artist == undefined )? "Unknown artist" : meta.common.artist
                    };
             this.playlist = [...this.playlist,processed ];

          this.$store.commit('updatePlaylist',processed);
           });
      // localStorage.setItem(i,{id:i,data:value[i],active:false});

      }
          this.ptr2 = false;
        this.queueView = !this.queueView;
    },
    viewOpt(){
      this.showOpt = true;
    },resize(){
      this.frameResize = !this.frameResize;
    },
    closeHot(){
      this.showHot100 = !this.showHot100;
    },
    liveS(query){ /// to perform a live search
        this.playlist = this.playlist.filter(song => {
          return song.findIndex(data => {
            data.name == query;
          })
        });
        // console.log(this.playlist);
    },
  toggleVisualWidget(){
      this.displayVisual = ! this.displayVisual;
     this.stopAnime = this.displayVisual == true?1:0;
  },
  closeB(){
    this.showNext = false;
  },
  loadLyrics(){
    this.$store.commit('fetchLyrics',[this.title,this.artist]);
    this.lyrics = "";
       this.showLyrics = !this.showLyrics;

  },
  closeLyrics(){
    this.showLyrics = !this.showLyrics;
  },
    roomEffectsComponent(){
        // this.ptr1 = !this.ptr1;
        // this.ptr2 = !this.ptr2;
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
      this.showPlay = !this.showPlay;
      this.showPause = !this.showPause;
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
     this.showPlay = !this.showPlay;
     this.showPause = !this.showPause;
      this.audio.pause();
    },
    shuffleTracks(){
         this.shuffle = !this.shuffle;
    },
    changeVol(vol){
        this.audio.volume = vol;
        // this.vol = vol;
    },
    closeVol(){
      this.showV = !this.showV;
    },
    showVol(){
      this.showV = !this.showV;
    },
    getTitle(file){
        mm.parseBlob(file).then(meta =>{
            // console.log(meta.common);
        });
    },
    imageProcess(buffer){
         var data = new Uint8Array(buffer);
          const blob = new Blob([data]);
          return URL.createObjectURL(blob);
    },
    commonComand(track){
      const url =  URL.createObjectURL(track);
      // this.audioSrc = url;
      this.audio.src = url;
      this.audio.play();
      this.size = ((track.size)/1000000);
    mm.parseBlob(track).then(meta => {
        // console.log(meta);
      this.title = meta.common.title == null || meta.common.title == undefined ? (track.name).replace(".mp3","") : meta.common.title;
      this.artist = meta.common.artist == null || meta.common.artist == undefined ? "Unknown artist" : meta.common.artist;
      this.album = meta.common.album == null || meta.common.album == undefined ? "Unknown album" : meta.common.album ;
      this.bufferArray = meta.common.picture[0].data;
       document.querySelector("title").textContent = `${this.title} - ${this.artist}`;
      const imageURL = this.imageProcess(this.bufferArray);
      /**
       * Track infor processed
       */
         

          this.image =  (this.bufferArray == undefined ||this.bufferArray == null)? image : imageURL;
          document.querySelector("body").style.backgroundImage =(this.bufferArray == undefined ||this.bufferArray == null)?"url("+image+")":"url("+imageURL+")";

          this.image =  (this.bufferArray == undefined || this.bufferArray == '' || this.bufferArray == null)? image : imageURL;
          
          document.querySelector("body").style.backgroundImage = (this.bufferArray == undefined || this.bufferArray == '' || this.bufferArray == null)?"url("+image+")":"url("+imageURL+")";
          
          const link = document.querySelector("link");
   link.href.replace(this.image,"");
  link.href = this.image;
  // ipcRenderer.sendSync('iconUp',link.href);
      const notify = new Notification(this.title,{body:this.artist,icon:this.image});
      notify.onclose = ()=>{
          
      }
     const currentTrack = {
       title:this.title,
       artist:this.artist,
       album:this.album,
       artwork:this.image
      };

      this.$store.commit('nowPlaying',currentTrack);

  // console.log(link.href)
      });
    },
    seekNow(){
       this.countPlay += 1;
       this.commonComand(this.playlist[this.countPlay].data);
       this.executeNext(this.playlist[this.countPlay+1].data);
       this.toggleList(this.countPlay);
    },
    prevSeek(){
         this.countPlay -= 1;
        this.commonComand(this.playlist[this.countPlay].data);
        this.toggleList(this.countPlay);
        this.executeNext(this.playlist[this.countPlay+1].data)
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
    executeNext(file){
        
         mm.parseBlob(file).then((meta)=>{
           const buff = meta.common.picture[0].data;
           this.nextTrack.image = buff == null || buff == undefined ?this.image:this.imageProcess(buff);
            this.nextTrack.title = meta.common.title == null || meta.common.title == undefined ? (track.name).replace(".mp3","") : meta.common.title;
             this.nextTrack.artist = meta.common.artist == null || meta.common.artist == undefined ? "Unknown artist" : meta.common.artist;
          })
    },
    listShow(){
      this.showOpt = false;
        this.listView = !this.listView;
    },
    gridShow(){
      this.showOpt = false;
      this.showQueue();
    },
    playQueue(queue){
          this.commonComand(queue[0].data);
          this.countPlay = queue[1];
          this.closeQueue();
          this.toggleList(queue[1]);
         this.executeNext(this.playlist[this.countPlay+1]);// console.log(this.getTitle(queue[0].data));
      },
        playL(queue){
          this.commonComand(queue[0].data);
          this.countPlay = queue[1];
          this.closeLQueue();
          this.toggleList(queue[1]);
          // this.listView = !this.listView;
         this.executeNext(this.playlist[this.countPlay+1]);// console.log(this.getTitle(queue[0].data));
      },
      toggleList(id){
        // console.log(id);
              //  this.playlist = this.playlist.map((track) => console.log(track.id) /*track.id == id?{...track,active:!track.active}:track*/)
      },
      loadHot100(){
        this.showHot100 = !this.showHot100;
        this.$store.commit('streamMusic',`https://www.nowviba.com/music/pages/top100.php`);
         //**load online streams */
    //  ipcRenderer.on('stream',(e,streams)=>{
         
        // })
      
      },
    showQueue(){
      this.ptr2 = false;
        this.queueView = !this.queueView;
        this.playlist = this.$store.getters.getPlaylist;
    },
    closeQueue(){
        this.ptr2 = true;
        this.queueView = !this.queueView;
       },
        closeLQueue(){
        // this.ptr1 = true;
        this.listView = !this.listView;
       },
     chooseVisual(eventValue){
         switch(parseInt(eventValue)){
           case 1:
             this.vise.barsVisualiser(this.stopAnime);
             break;

             case 2:
               this.vise.dustyParticles(this.stopAnime)
               break;
             case 3:
               this.vise.histogramVisualiser(this.stopAnime)
               break;

             case 4:
               this.vise.sineWaveVisualiser(this.stopAnime)
               break;
             case 5:
               this.vise.rippleWaveVisualiser(this.stopAnime)
               break;
              
             case 6:
               this.vise.glassTilesVisualiser(this.stopAnime)
               break;
              
             case 7:
               this.vise.floatingBars(this.stopAnime)
               break;

                case 8:
               this.vise.colorstetchVisualiser()
               break;
         }
     }
  },
  
  mounted(){
    ipcRenderer.sendSync('dataList');
    
    // ipcRenderer.on('lib',(e,a)=>{
    //   this.current = a;
    //   // console.log(a);
    // })
// console.log(new MediaStream().getTracks())
  this.stopAnime = this.displayVisual == true?1:0;
    this.playlist = this.$store.getters.getPlaylist;
    this.nPlay = this.$store.getters.getNowPlaying;
    document.querySelector("body").style.backgroundImage = "url("+this.nPlay.artwork+")";
    // this.$
    /**default volume = 0.17 */

      /**  Canvas */
      this.canvas = this.$refs['canvas'];
      this.context = this.$refs['canvas'].getContext("2d");
  
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
       const dmin = Math.floor(((this.audio.duration - this.audio.currentTime) / 60) % 60)
       const dsec = Math.floor((this.audio.duration - this.audio.currentTime) % 60 );
       this.durlTime = dsec < 10 ?dmin+":0"+dsec:dmin+":"+dsec;
    /**Logic for next track */
     const monitor = Math.floor((this.audio.duration) -this.audio.currentTime);
            if(monitor == 60){
              this.showNext = true;
            //    const notify = new Notification(this.title,{body:this.artist,icon:this.playlist[this.trackId]});
            } else if(monitor == 30){
               this.showNext = false;
            }else if(monitor < 30 || monitor > 60){
               this.showNext = false;
            }

    }
  
    this.audio.onpause = ()=>{
      this.checker = false;
    }
 
    this.audio.onended = ()=>{
               this.checker = false;
this.showLyrics = false;
        if(this.shuffle == true){
            this.countPlay = Math.floor(Math.random() * this.playlist.length);
            this.commonComand(this.playlist[this.countPlay].data);
            this.executeNext(this.playlist[this.countPlay+1].data);
        }else{
           this.countPlay +=1;
          this.commonComand(this.playlist[this.countPlay].data);
          this.executeNext(this.playlist[this.countPlay + 1].data);
          this.toggleList(this.countPlay);
        }
         
    }

   this.audio.onplay = ()=>{
     this.checker = true;
          this.showPlay = false;
         this.showPause = true;
    }
  },
  
  created() {
    this.audio = this.$store.getters.getPlayer;
    this.audio.volume = this.$store.getters.getVolume;
    this.eq = this.$store.getters.getEqualiser;
   this.stopAnime = this.displayVisual == true?1:0;
   /**listen for incomming lyrics */
   ipcRenderer.on('lyrics',(e,lyrics)=>{
     this.lyrics = lyrics;
    //  console.log(lyrics);
   });
  console.log(this.$store.getters.getPlaylist)
  },
}
</script>
 
 <style lang="scss" scoped>
@import "../Design/Hot100.scss";
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
            z-index: 2!important;
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
        overflow: hidden !important;
        z-index:2!important;
        position: fixed;
         display: flex!important;
        flex-direction:row!important;
        justify-content: space-around!important;
        align-items: center!important;
        color:#ddd;
      .prt2,.part1{
          margin: 15px;
          opacity:0;
          display: flex;
          flex-direction: column!important;
          justify-content: center!important;
          z-index: 3!important;
          align-items: center!important;
          visibility: hidden!important;
          transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
        .prt2.active , .part1.active{
            opacity:1;
            visibility: visible !important;
        }
      }
      .EQ{
        opacity:0;
        visibility: hidden;
        transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        position: absolute;
      }
      .EQ.active{
         opacity:1;
        visibility: visible;
      }
      @keyframes tapEffect {
        0%{
          transform:scale(0);
        }
        50%{
          transform:scale(1.2,1.2);
        }
        100%{
          transform:scale(1,1);

        }
      }
      .lyrics{
        width: fit-content;
        height: max-content;
        z-index: 30!important;
        right:-400px;
        visibility: hidden;
        top:20px;
        transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        position:absolute!important;
      }
       .lyrics.active{
         animation: 2s 2s linear forwards;
        visibility: visible;
         right:30px;
       }
      .gView{
        width: 100%;
        height: 100%;
        position:absolute;
        visibility: hidden;
        left:-5000px;
        z-index:120px!important;
        transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        // opacity:0;
      }
      .gView.active{
          width: 100%;
          left:0px;
             visibility:visible;
        // opacity:1;
      }
       .listView{
         width: fit-content;
         height: max-content;
        position:absolute;
        visibility: hidden;
        bottom:-5000px;
        z-index:120px!important;
        transition: 0.83s ease-in-out;
        // opacity:0;
      }
        .listView.active{
        bottom:150px;
          // width: 100%;
          left:50px;
             visibility:visible;
        // opacity:1;
      }
     
    .options{
      border: 1px solid #eeeeee77;
      padding:10px;
      width:140px;
      height:100px;
      border-radius:10px;
      position: absolute;
      top: 100px;
      z-index: 6!important;
      background: rgba(206, 198, 198, 0.356);
      backdrop-filter: blur(94px);
       opacity:0;
        visibility: hidden;
        transition: 0.3s ease-in-out;
      p{
        margin:10px;
        padding:5px;
        transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        &:hover{
          background:#eeeeee50;
          border-radius:10px;
          padding:5.3px;
        }
      }
    }
    .options.active{
        opacity:1;
        visibility: visible;
    }
    .b{
      display: flex;
      flex-direction: row!important;
      justify-content: space-evenly;
      button{
        width: 90px;
        height: 40px;
        border: 1px solid #dddddd4f;
        background: rgba(0,0,0,0.1);
        color: #eeeeee50;
        cursor: pointer;
        font: 400 16px Ubuntu,Arial;
        transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        &:hover{
             border: 1px solid #dddddd;
        color: #eee;

        }
      }
    }
      .volume{
        left: 0px;
        transition:0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        position: absolute;
        visibility: hidden;
        opacity: 0;
      }
      .volume.active{
        visibility: visible;

        left: 90px;
        opacity: 1;

      }
      .room{
        transition:0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        opacity:0;
        position: absolute;
        bottom:0px;
        visibility: hidden;
      }
      .room.active{
        bottom: 120px;
         visibility: visible;
        opacity: 1;
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
     .bottom{
         width: 500px;
          position: absolute;
          bottom:100px;
          z-index: 30!important;
          right: 10px;
          visibility: hidden;
          opacity: 0;
          transition: 0.3s cubic-bezier(0.045, 0.05, 0.55, 0.95);
    }
    .bottom.active{
       right: 500px;
        visibility: visible;
          opacity: 1;
    }
 </style>