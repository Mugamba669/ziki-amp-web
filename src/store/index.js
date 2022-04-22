
import { createStore } from 'vuex'
import { Equalizer } from '../Core/Equalizer';
const { image } = require("../Core/default");
import * as id3 from "music-metadata-browser";
import axios from 'axios';
const { ipcRenderer } = window.require('electron');
import MediaLibrary from 'media-library';
const audio = new Audio();
const eq = new Equalizer(audio);
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default createStore({
  state: {
    volume:0.17,lyrics:'',
    playlist:[],
    reduceCount:0,
    player:audio,
    delays:eq.getDelayBands(),
    feedback:eq.getFeedBack(),
    bands:eq.getBands(),
    bass:eq.getBass(),
    treble:eq.getTreble(),
    equalizer:eq,
    Id3:id3,
    counter:0,
    now:{ title:"title",
    artist:"",
    album:"",
    artwork:image,}
  },
  mutations: {
    setVolume(state,payload){
      console.log(payload);
      state.player.volume = payload;
    },
    updatePlaylist(state,payload){
      state.playlist = [...state.playlist,payload];
      // localStorage.setItem("playlist",JSON.stringify(state.playlist));
    },
    dataList(state,payload){
      var library = new MediaLibrary({
        // persistent storage location (optional)
        dataPath: '/home/blabs/Music',
        // the paths to scan
        paths: [ '/home/blabs/Music' ]
      });

      library.scan().on('done', () => {
        // listing all tracks
        library.tracks((err, tracks) => state.playlist = tracks);
      });
        // state.playlist = 
    },
    loadPlaylist(state,payload){
      console.log(payload);
        state.playlist = payload;
    },
    nowPlaying(state,payload){
        state.now = payload;
    },
    fetchLyrics(state , payload){
      ipcRenderer.send("fetchLyrics",payload);
      console.log(payload)
    },
    changeFeedBack(state,payload){
        state.feedback[payload[0]].gain.value = payload[1];
        console.log(payload);
    },
    changeDelays(state,payload){
      console.log(payload);
        state.delays[payload[0]].delayTime.value = payload[1];
    },
    updateBands(state,payload){
      state.bands[payload[0]].gain.value = payload[1];
    },
    tuneBass(state,payload){
      // console.log('payload '+payload);
      state.bass.gain.value = payload;
    },
    tuneTreble(state,payload){
      // console.log('treble '+payload)
      state.treble.gain.value = payload;
    },
    incrementCount(state,payload){
      state.counter = payload;
      // console.log(payload)
  },
  streamMusic(state,payload){
    ipcRenderer.sendSync('hot100',payload);
    console.log(payload)
  },
  playStream(state,payload){
      state.player.src = payload;
      state.player.crossOrigin = "anonymous";
      state.player.play();
  },
  decreaseCount(state,payload){
    state.reduceCount = payload;
    // console.log(payload)
}
  },
  

  getters:{
    getVolume : (state) => state.volume,
    getPlaylist:(state) => state.playlist,
    getPlayer: (state) => state.player,
    getBands: (state) => state.bands,
    getFeedback :(state) => state.feedback,
    getDelays: (state) => state.delays,
    getEqualiser:(state) => state.equalizer,
    getCurrentBass :(state) => state.bass,
    getNowPlaying:(state)=> state.now,
    getId3:(state)=> state.Id3,
    reduceCount:(state)=>state.reduceCount,
    getCount:(state)=> state.counter,
  }
})
