<template>
  <div class="bands">
    <!-- {{ bandGain }} -->
    <span class="label">
      {{ frequency > 500 ? frequency.toString().replace('000', 'k') : frequency }}Hz
    </span>
    <slider
      class="band-slider"
      v-model="value"
      @change="bandChange"
      :max="15"
      :min="-15"
      :step="0.01"
    />
    <span class="label">{{ Number(value).toFixed(1) }}</span>
  </div>
</template>

<script>
import Slider from 'primevue/slider'
import { mapGetters } from 'vuex'
export default {
  name: 'Eq-Bands',
  components: {
    Slider
  },
  computed: {
    ...mapGetters(['getBands'])
  },
  props: {
    id: Number,
    frequency: Number,
    bandGain: Number
  },
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.value = this.getBands[this.id]
    }, 500)
  },
  methods: {
    bandChange() {
      this.$emit('bandChange', [this.$props.id, this.value])
    }
  }
}
</script>

<style lang="scss" scoped>
.band-slider {
  width: 400px;
  height: 2px;
}
.bands {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 18px;
  width: 300px;
  .label {
    transform: rotate(90deg);
    margin: 5px;
  }
  .label:last-child {
    font: 300 14px Ubuntu;
  }

  .label:first-child {
    font: 500 14px Ubuntu;
    color: #ddd;
  }
  input {
    appearance: none;
    height: 2px;
    width: 230px;
    &::-webkit-slider-thumb {
      width: 23px;
      height: 18px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #ddd;
      appearance: none;
      background: #3739b4;
    }
  }
  //   &::-webkit-slider-thumb
}
@media (max-width: 910px) {
  .bands {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 7px;
    width: 300px;
    margin: 0px;
    .label {
      transform: rotate(90deg);
      margin: 5px;
    }
    .label:last-child {
      font: 300 12px Ubuntu;
    }

    .label:first-child {
      font: 300 11px Ubuntu;
      color: #ddd;
    }
    input {
      appearance: none;
      height: 2px;
      width: 130px;
      &::-webkit-slider-thumb {
        width: 23px;
        height: 18px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #ddd;
        appearance: none;
        background: #3739b4;
      }
    }
    //   &::-webkit-slider-thumb
  }
}
</style>
