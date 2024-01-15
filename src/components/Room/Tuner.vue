<template lang="html">
  <div>
    <label>{{ Number(tune).toFixed(2) }} dB</label>
    <slider class="sslider" :max="5" :step="0.01" :min="0" @change="changeTuner" v-model="value" />
  </div>
</template>
<script>
import Slider from 'primevue/slider'
export default {
  name: 'V-Tuner',
  components: { Slider },
  props: {
    tune: Number,
    delay: Number
  },
  data() {
    return {
      value: this.tune
    }
  },
  methods: {
    changeTuner() {
      this.$store.commit('changeDelays', [this.delay, this.value])
      // this.$store.commit('',{node:this.delay.delayTime.value,value:this.tune});
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin: 10px;
  align-items: center;
  .sslider {
    width: 200px;
    height: 2px;
  }
  label {
    font: 300 12px Arial;
    margin: 15px;
    background: #222;
    color: #fff;
    border-radius: 10px;
    padding: 5px;
    transform: rotate(90deg);
  }
}
</style>
