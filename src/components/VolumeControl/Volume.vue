<template>
  <!-- <div class="panel"> -->
  <div class="volume">
    <button @click="this.$emit('closeVol')"><b class="material-icons mi-close"></b></button>

    <label for=""
      >Volume : <span class="val"> {{ Math.floor(Number(volume) * 100) }} % </span>
    </label>
    <slider class="slider" @change="adjustVolume" :max="1" :min="0" :step="0.01" v-model="volume" />
  </div>
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Slider from 'primevue/slider'
export default {
  name: 'V-Volume',
  computed: {
    ...mapGetters(['getVolume'])
  },
  components: {
    Slider
  },
  data() {
    return {
      volume: 0.17
    }
  },
  methods: {
    ...mapMutations(['setVolume']),
    adjustVolume() {
      this.setVolume(this.volume)
    }
  },
  mounted() {
    this.volume = this.getVolume
  }
}
</script>

<style lang="scss" scoped>
.volume {
  width: 300px;
  height: 100px;
  padding: 10px;
  background: #5555554d;
  backdrop-filter: blur(20px);
  border: 1px solid #ddd;
  border-radius: 10px;

  z-index: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    border: 1px solid #eee;
    color: #fff;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 0%;
    background: #f30808;
    transform: scale(1, 1);
    transition: 0.3s ease-in-out;
    cursor: pointer;
    b {
      font-size: 12px;
      text-align: center;
    }
    &:hover {
      transform: scale(1.04, 1.04);
    }
  }
  label {
    font:
      400 18px Ubuntu,
      Arial;
    margin: 15px;
    span {
      margin: 10px;
    }
  }

  input {
    width: 100%;
    appearance: none;
    //    overflow: hidden;
    border-radius: 50px;
    height: 10px;
    background: #8d2828;
    box-shadow: inset 0px 0px 5px 2px #111111;
    &::-webkit-slider-thumb {
      appearance: none;
      overflow: visible;
      width: 15px;
      transform: rotate(0deg);
      border-radius: 5px;
      height: 25px;
      clip-path: stroke-boxl;
      background: rgba(221, 221, 221, 0.986);
      box-shadow:
        inset -3px 0px 5px -2px #030303,
        inset -4px 0px 5px -2px #353232,
        inset -3px 0px 10px 2px #030303;
    }
  }
}
</style>
