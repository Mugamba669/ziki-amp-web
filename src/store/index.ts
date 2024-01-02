import { createStore } from 'vuex'
import { Equalizer } from '../Core/Equalizer'
import { defaultArtwork } from '../Core/default'
// import axios from 'axios'
import { Buffer } from "buffer";
window.Buffer = Buffer;
import * as id3 from 'music-metadata-browser'

export const audio = new Audio() as HTMLAudioElement
const eq = new Equalizer()

export default createStore({
  state: {
    volume: 0.17,
    lyrics: '',
    playlist: [],
    queue: [],
    reduceCount: 0,
    currentTime: 0,
    player: audio,
    delays: eq.getDelayBands(),
    feedback: eq.getFeedBack(),
    bands: eq.getBands(),
    bass: eq.getBass(),
    treble: eq.getTreble(),
    bandGains: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    equalizer: eq,
    Id3: id3,
    counter: 0,
    now: { title: 'title', artist: '', album: '', artwork: defaultArtwork.image }
  },
  mutations: {
    setVolume(state: any, payload: any) {
      console.log(payload)
      state.player.volume = payload
    },
    updatePlaylist(state: any, payload: any) {
      state.playlist = [...state.playlist, payload]
      // localStorage.setItem("playlist",JSON.stringify(state:any.playlist));
    },
    loadQueue(state: any, payload: any) {
      state.queue = payload
    },
    setCurrentTime(state: any, payload: any) {
      state.currentTime = payload
      console.log(payload)
    },

    loadPlaylist(state: any, payload: any) {
      console.log(payload)
      state.playlist = payload
    },
    nowPlaying(state: any, payload: any) {
      state.now = payload
    },

    changeFeedBack(state: any, payload: any) {
      state.feedback[payload[0]].gain.value = payload[1]
      console.log(payload)
    },
    changeDelays(state: any, payload: any) {
      console.log(payload)
      state.delays[payload[0]].delayTime.value = payload[1]
    },
    updateBands(state: any, payload: any) {
      state.bands[payload[0]].gain.value = payload[1]
    },
    tuneBass(state: any, payload: any) {
      // console.log('payload '+payload:any);
      state.bass.gain.value = payload
    },
    tuneTreble(state: any, payload: any) {
      // console.log('treble '+payload:any)
      state.treble.gain.value = payload
    },
    incrementCount(state: any, payload: any) {
      state.counter = payload
      // console.log(payload:any)
    },

    playStream(state: any, payload: any) {
      state.player.src = payload
      state.player.crossOrigin = 'anonymous'
      state.player.play()
    },
    decreaseCount(state: any, payload: any) {
      state.reduceCount = payload
      // console.log(payload:any)
    }
  },
  //  // "start": "vue-cli-service electron:serve"

  getters: {
    getQueue: (state: any) => state.queue,
    getVolume: (state: any) => state.volume,
    getPlaylist: (state: any) => state.playlist,
    getPlayer: (state: any) => state.player,
    getBands: (state: any) => state.bands,
    getFeedback: (state: any) => state.feedback,
    getDelays: (state: any) => state.delays,
    getEqualiser: (state: any) => state.equalizer,
    getCurrentBass: (state: any) => state.bass,
    getNowPlaying: (state: any) => state.now,
    getId3: (state: any) => state.Id3,
    reduceCount: (state: any) => state.reduceCount,
    getCount: (state: any) => state.counter,
    bandGains: (state: any) => state.bandGains,
    currentTime: (state: any) => state.currentTime
  }
})
