import { createStore } from "vuex";
import { Equalizer } from "../Core/Equalizer";
const { image } = require("../Core/default");
import * as id3 from "music-metadata-browser";
import axios from "axios";

// import MediaLibrary from "media-library";
export const audio = new Audio();
export const eq = new Equalizer(audio);
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default createStore({
  state: {
    volume: 0.17,
    lyrics: "",
    playlist: [],
    queue: [],
    reduceCount: 0,
    player: audio,
    delays: eq.getDelayBands(),
    feedback: eq.getFeedBack(),
    bands: eq.getBands(),
    bass: eq.getBass(),
    treble: eq.getTreble(),
    equalizer: eq,
    Id3: id3,
    counter: 0,
    now: { title: "title", artist: "", album: "", artwork: image },
  },
  mutations: {
    setVolume(state, payload) {
      console.log(payload);
      state.player.volume = payload;
    },
    updatePlaylist(state, payload) {
      state.playlist = [...state.playlist, payload];
      // localStorage.setItem("playlist",JSON.stringify(state.playlist));
    },
    loadQueue(state, payload) {
      state.queue = payload;
    },
    dataList(state, payload) {
      // var library = new MediaLibrary({
      //   // persistent storage location (optional)
      //   dataPath: '/',
      //   // the paths to scan
      //   paths: [ '/' ]
      // });
      // library.scan().on('done', () => {
      //   // listing all tracks
      //   library.tracks((err, tracks) => state.playlist = tracks);
      // });
      // state.playlist =
    },
    loadPlaylist(state, payload) {
      console.log(payload);
      state.playlist = payload;
    },
    nowPlaying(state, payload) {
      state.now = payload;
    },
    fetchLyrics(state, payload) {
    
    },
    changeFeedBack(state, payload) {
      state.feedback[payload[0]].gain.value = payload[1];
      console.log(payload);
    },
    changeDelays(state, payload) {
      console.log(payload);
      state.delays[payload[0]].delayTime.value = payload[1];
    },
    updateBands(state, payload) {
      state.bands[payload[0]].gain.value = payload[1];
      state.bands[payload[0]].gain.value = payload[1] /2;
    },
    tuneBass(state, payload) {
      // console.log('payload '+payload);
      state.bass.gain.value = payload;
    },
    tuneTreble(state, payload) {
      // console.log('treble '+payload)
      state.treble.gain.value = payload;
    },
    incrementCount(state, payload) {
      state.counter = payload;
      // console.log(payload)
    },
    streamMusic(state, payload) {
      
    },
    playStream(state, payload) {
      state.player.src = payload;
      state.player.crossOrigin = "anonymous";
      state.player.play();
    },
    decreaseCount(state, payload) {
      state.reduceCount = payload;
      // console.log(payload)
    },
  },
  //  // "start": "vue-cli-service electron:serve"

  getters: {
    getQueue: (state) => state.queue,
    getVolume: (state) => state.volume,
    getPlaylist: (state) => state.playlist,
    getPlayer: (state) => state.player,
    getBands: (state) => state.bands,
    getFeedback: (state) => state.feedback,
    getDelays: (state) => state.delays,
    getEqualiser: (state) => state.equalizer,
    getCurrentBass: (state) => state.bass,
    getNowPlaying: (state) => state.now,
    getId3: (state) => state.Id3,
    reduceCount: (state) => state.reduceCount,
    getCount: (state) => state.counter,
  },
});
