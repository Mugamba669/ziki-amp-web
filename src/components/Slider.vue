<template>
  <div class="slider">
    <span class="label">{{ currentTime }}</span>
    <input
      type="range"
      @input="updateSlider"
      v-model="progress"
      min="0"
      step="0.01"
      :max="Number(progMax)"
    />

    <!-- <progress  :max="max" :value="value"></progress> -->
    <span class="label">-{{ duration }}</span>
  </div>
</template>

<script>
import Slider from "primevue/slider";
import { mapGetters } from "vuex";
import { audio } from "../store";
export default {
  name: "Slider",
  components: {
    Slider,
  },

  data() {
    return {
      currentTime: "",
      progMax: 0,
      progress: 0,
      duration: "",
    };
  },
  mounted() {
    // console.log(localStorage);
    setInterval(() => {
      this.progress = audio.currentTime;
      this.progMax = audio.duration;
    }, 500);

    audio.ontimeupdate = () => {
      /**Display the track's current time */
      const min = Math.floor((audio.currentTime / 60) % 60);
      const sec = Math.floor(audio.currentTime % 60);
      this.currentTime = sec < 10 ? min + ":0" + sec : min + ":" + sec;

      /**Display the track duration */
      const dmin = Math.floor(((audio.duration - audio.currentTime) / 60) % 60);
      const dsec = Math.floor((audio.duration - audio.currentTime) % 60);
      this.duration = dsec < 10 ? dmin + ":0" + dsec : dmin + ":" + dsec;
    };
  },
  methods: {
    updateSlider() {
      this.$emit("updateChange", this.position);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .label {
    font: 300 14px Arial;
    background: #000;
    border-radius: 5px;
    padding: 10px;
    margin: 8px;
  }
  input {
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
      box-shadow: inset -3px 0px 5px -2px #e0cb06,
        inset -4px 0px 5px -2px #dfdc1f, inset -3px 0px 10px 2px #27270c;
    }
    //  &::-webkit-slider-runnable-track{
    //    background:#bd1010;
    //    width: 30px;
    //    height: 4px;
    //    transform: translateX(-90px);
    //  }
  }
}
@media (max-width: 910px) {
  .slider {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .label {
      font: 300 15px Ubuntu, Arial;
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
      font: 300 15px Ubuntu, Arial;
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
