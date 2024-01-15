<template>
  <div class="slider">
    <span class="label" v-text="currentTime" />
    <!-- <input
      type="range"
      @input="updateSlider"
      v-model="progress"
      min="0"
      step="0.01"
      :max="Number(progMax)"
    /> -->
    <br />
    <slider
      class="track-slider"
      rangeColor="#000"
      valueColor="orange"
      @change="updateSlider"
      show-stops="true"
      show-input="true"
      v-model="progress"
      :min="0"
      v-bind:step="0.01"
      :max="Number(progMax)"
    />
    <!-- <progress  :max="max" :value="value"></progress> -->
    <span class="label" v-text="duration" />
  </div>
</template>

<script>
import Slider from 'primevue/slider'
import Knob from 'primevue/knob'

import { mapGetters } from 'vuex'

export default {
  name: 'V-SSlider',
  components: {
    Slider
  },

  data() {
    return {
      currentTime: '',
      progMax: 0,
      progress: 0,
      duration: '',
      player: null
    }
  },
  computed: {
    ...mapGetters(['getPlayer'])
  },
  created() {
    this.player = this.getPlayer
  },
  mounted() {
    setTimeout(() => {
      // console.log(localStorage);
      setInterval(() => {
        this.progress = this.player.currentTime
        this.progMax = this.player.duration
      }, 500)

      this.player.ontimeupdate = () => {
        /**Display the track's current time */
        let min = Math.floor((this.player.currentTime / 60) % 60)
        let sec = Math.floor(this.player.currentTime % 60)
        this.currentTime = sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`
        // console.log(this.currentTime)

        /**Display the track duration */
        let dmin = Math.floor(((this.player.duration - this.player.currentTime) / 60) % 60)
        let dsec = Math.floor((this.player.duration - this.player.currentTime) % 60)
        this.duration = dsec < 10 ? dmin + ':0' + dsec : dmin + ':' + dsec
        // console.log(this.duration)
      }
    }, 500)
  },
  methods: {
    updateSlider() {
      this.$emit('updateChange', this.progress)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  .track-slider {
    width: 400px;
    height: 2px;
    padding: 1px;
    margin: 10px;
    color: #000;
  }
  .label {
    font: 300 14px Arial;
    background: #000;
    border-radius: 5px;
    padding: 10px;
    margin: 8px;
  }
  /* input {
    width: 500px;
    appearance: none;
    //  overflow: hidden;
    border-radius: 10px;
    height: 10px;
    background: #eee;
    box-shadow: inset 0px 0px 5px 2px #111111;
    &::-webkit-slider-thumb {
      appearance: none;
      overflow: visible;
      width: 25px;
      border-radius: 50%;
      height: 25px;
      background: rgba(109, 109, 92, 0.986);
      box-shadow: inset -3px 0px 5px -2px #e0cb06, inset -4px 0px 5px -2px #dfdc1f,
        inset -3px 0px 10px 2px #27270c;
    }*/
  //  &::-webkit-slider-runnable-track{
  //    background:#bd1010;
  //    width: 30px;
  //    height: 4px;
  //    transform: translateX(-90px);
  //  }
  //}
}
@media (max-width: 910px) {
  .slider {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .label {
      font:
        300 15px Ubuntu,
        Arial;
      margin: 8px;
      background: #222;
      border-radius: 5px;
    }
    input {
      width: 300px;
      appearance: none;
      height: 4px;
      background: #b3a1a1;

      &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        border-radius: 50%;
        height: 20px;
        background: #bd1010;
      }
      &::-webkit-slider-runnable-track {
        background: #9090;
        width: 20px;
        height: 20px;
      }
    }
  }
}

@media (max-width: 480px) {
  .slider {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .label {
      font:
        300 15px Ubuntu,
        Arial;
      margin: 8px;
      background: #222;
      border-radius: 5px;
    }
    input {
      width: 200px;
      appearance: none;
      margin: 10px;
      height: 4px;
      background: #b3a1a1;

      &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        border-radius: 50%;
        height: 20px;
        background: #554e4e;
      }
    }
  }
}
</style>
