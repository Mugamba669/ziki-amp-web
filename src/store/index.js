import { createStore } from 'vuex'
import { Equalizer } from '../Core/Equalizer';
const audio = new Audio();
const eq = new Equalizer(audio);
export default createStore({
  state: {
    volume:0.17,
    playlist:[],
    player:audio,
    delays:eq.getDelayBands(),
    feedback:eq.getFeedBack(),
    bands:eq.getBands(),
    bass:eq.getBass(),
    treble:eq.getTreble(),
    equalizer:eq
  },
  mutations: {
    setVolume(state,payload){
      console.log(payload);
      state.player.volume = payload;
    },
    updatePlaylist(state,payload){
      state.playlist = [...state.playlist,payload];
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
      console.log('treble '+payload)
      state.treble.gain.value = payload;
    }
  },

  getters:{
    getVolume : (state) => state.volume,
    showPlaylist:(state) => state.playlist,
    getPlayer: (state) => state.player,
    getBands: (state) => state.bands,
    getFeedback :(state) => state.feedback,
    getDelays: (state) => state.delays,
    getEqualiser:(state) => state.equalizer,
    getCurrentBass :(state) => state.bass,
  }
})
