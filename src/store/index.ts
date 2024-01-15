import { createStore } from 'vuex';
import { Equalizer } from '../Core/Equalizer'
import { defaultArtwork } from '../Core/default'
// import axios from 'axios'
import { Buffer } from 'buffer'
window.Buffer = Buffer
import * as id3 from 'music-metadata-browser'
import type SongInfo from '@/interfaces/song_info'
import axios from 'axios';
import { Convert } from '@/interfaces/lyrics';
import { ConvertHot100, type SongMetaData } from '@/interfaces/hot100';

export const audio = new Audio() as HTMLAudioElement
audio.crossOrigin = "anonymous";
const eq = new Equalizer()

export default createStore({
  state: {
    volume: 0.17,
    lyrics: '',
    playlist: [] as SongInfo[],
    queue: [] as SongInfo[],
    hot100: [] as SongMetaData[],

    reduceCount: 0,
    currentTime: 0,
    player: audio,
    delays: eq.getDelayBands(),
    feedback: eq.getFeedBack(),
    bands: eq.getBands(),
    bass: eq.getBass(),
    treble: eq.getTreble(),
    bandGains: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0] as number[],
    equalizer: eq,
    Id3: id3,
    counter: 0,

    now: { title: 'title', artist: '', album: '', artwork: defaultArtwork.image }
  },
  mutations: {
    setVolume(state: any, payload: Number) {
      console.log(payload)
      state.player.volume = payload
    },
    updateGains(state: any, payload: number[]) {
      console.log(payload)
      state.bandGains = payload
    },
    updatePlaylist(state: any, payload: SongInfo) {
      state.playlist = [...state.playlist, payload]
      // localStorage.setItem("playlist",JSON.stringify(state:any.playlist));
    },
    loadQueue(state: any, payload: any) {
      state.queue = payload
    },
    setCurrentTime(state: any, payload: number) {
      state.currentTime = payload
    },
    fetchLyrics(state: any, payload: string[]) {
      axios
        .get(`http://15.237.71.190:5054/get/songLyrics/${payload[0].replace(' ', '_')}/${payload[1].replace(' ', '_').split('-')[0]}`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
            "Access-Control-Allow-Headers": "Content-Type",
          },

        })
        .then((response) => {
          state.lyrics = Convert.toLyricsModel(JSON.stringify(response.data)).lyrics
        })
    },
    fetchHot100UgSongs(state: any, payload: any) {

      axios.get(`http://127.0.0.1:5054/get/hot100`).then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          const songs = ConvertHot100.toHot100(JSON.stringify(response.data)).songs;
          console.log(songs)
          state.hot100 = songs;
        } else {
          alert('failed to load Hot 100 Ug Songs')
        }
      });
    },
    loadPlaylist(state: any, payload: SongInfo[]) {
      console.log(payload)
      state.playlist = payload
    },
    nowPlaying(state: any, payload: any) {
      state.now = payload
    },

    changeFeedBack(state: any, payload: number[]) {
      state.feedback[payload[0]].gain.value = payload[1]
    },
    changeDelays(state: any, payload: any) {
      state.delays[payload[0]].delayTime.value = payload[1]
    },
    updateBands(state: any, payload: any) {
      console.log(payload)
      state.bands[payload[0]].gain.value = payload[1]
    },
    tuneBass(state: any, payload: Number) {
      state.bass.gain.value = payload
    },
    tuneTreble(state: any, payload: number) {
      state.treble.gain.value = payload
    },
    incrementCount(state: any, payload: number) {
      state.counter = payload
    },

    playHot100(state: any, payload: String) {
      console.log(payload);
      state.player.src = payload;
      state.player.play()
    },
    decreaseCount(state: any, payload: any) {
      state.reduceCount = payload
    }
  },
  getters: {
    getQueue: (state: any) => state.queue as SongInfo,
    getVolume: (state: any) => state.volume as number,
    getPlaylist: (state: any) => state.playlist as SongInfo[],
    getPlayer: (state: any) => state.player as HTMLAudioElement,
    getBands: (state: any) => state.bandGains as number[],
    getFeedback: (state: any) => state.feedback as number[],
    getDelays: (state: any) => state.delays as number[],
    getEqualiser: (state: any) => state.equalizer as Equalizer,
    getCurrentBass: (state: any) => state.bass,
    getNowPlaying: (state: any) => state.now,
    getId3: (state: any) => state.Id3,
    reduceCount: (state: any) => state.reduceCount,
    getCount: (state: any) => state.counter,
    currentTime: (state: any) => state.currentTime,
    lyrics: (state: any) => state.lyrics,
    hot100: (state: any) => state.hot100 as SongMetaData[],
  }
})
