<template lang="html">
  <div>
    <label>{{ Number(valueTune).toFixed(2) }} dB</label>
    <slider class="sslider" :max="2" :step="0.01" :min="0" @change="changeTuner" v-model="value" />
  </div>
</template>
<script>
import Slider from 'primevue/slider'
export default {
  name: 'V-Feedback',
  components: { Slider },
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
