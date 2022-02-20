import { createStore } from 'vuex'

export default createStore({
  state: {
    volume:0.17,
    playlist:[],
    player:new Audio()
  },
  mutations: {
    setVolume(state,payload){
      state.volume = payload;
    },
    updatePlaylist(state,payload){
      state.playlist = [...state.playlist,payload];
    }
  },
  actions: {
    adjustVolume(state,payload){
      state.commit("adjustVolume",payload);
    },
    // action to add jams to the playlist 
    addToPlaylist(state,payload){
      state.commit("updatePlaylist",payload)
    }
  },
  modules: {
  },
  getters:{
    getVolume : (state) => state.volume,
    showPlaylist:(state) => state.playlist,
  }
})
