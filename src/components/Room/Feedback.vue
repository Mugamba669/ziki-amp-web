<template lang="html">
  <div>
    <label>{{ Number(valueTune).toFixed(2) }} dB</label>
    <knob max="1" step="0.01" min="0" @change="changeTuner" v-model="value" />
  </div>
</template>
<script>
import Knob from 'primevue/knob'
export default {
  name: 'V-Feedback',
  components: { Knob },
  props: {
    valueTune: Number,
    feedback: Number
  },
  data() {
    return {
      value: this.valueTune
    }
  },
  methods: {
    changeTuner() {
      this.$store.commit('changeFeedBack', [this.feedback, this.value])

      //   this.feedback.gain.value = this.valueTune;
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  // transform: rotate(90deg);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  label {
    font: 300 12px Arial;
    margin: 8px;
    background: #222;
    color: #fff;
    border-radius: 10px;
    padding: 5px;
    transform: rotate(90deg);
  }
  [type='range'] {
    appearance: none;
    width: 250px;
    background: #736cdd;
    // overflow: hidden;
    border-radius: 10px;
    height: 5px;
    margin: 30px;
    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      background: #1506e7;
      cursor: pointer;
      height: 20px;
      border-radius: 10px;
    }
  }
}
</style>
