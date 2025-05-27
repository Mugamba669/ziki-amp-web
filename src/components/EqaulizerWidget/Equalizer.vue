<!-- eslint-disable vue/no-reserved-keys -->
<template>
  <div class="eq-widget">
    <div class="eq-card">
      <h2 class="eq-title">Equalizer</h2>
      <div class="eq-bands">
        <Bands
          :key="index"
          :id="index"
          :frequency="band.frequency.value"
          :bandGain="update[index]"
          v-for="(band, index) in bandSet"
          @bandChange="updateBandGain"
        />
      </div>
      <div class="eq-controls">
        <div class="eq-control">
          <label for="bass">Bass</label>
          <knob
            id="bass"
            @change="updateBass"
            :max="15"
            :min="0"
            :step="0.01"
            :size="90"
            :valueTemplate="`${Math.floor((bass / 15) * 100)} dB`"
            v-model="bass"
            rangeColor="#34d399"
            valueColor="#2563eb"
            textColor="#333"
            v-bind:strokeWidth="8"
          />
        </div>
        <div class="eq-control">
          <label for="treble">Treble</label>
          <knob
            id="treble"
            @change="trebleUpdate"
            :size="90"
            :valueTemplate="`${Math.floor((treble / 6) * 100)} dB`"
            :max="6"
            :min="0"
            :step="0.01"
            v-model="treble"
            rangeColor="#f59e42"
            valueColor="#ea580c"
            textColor="#333"
            v-bind:strokeWidth="8"
          />
        </div>
      </div>
      <div class="eq-preset-row">
        <select ref="choice" @change="updateBand" class="eq-select">
          <option v-for="(preset, index) in presets" v-bind:key="index" :value="preset.value">
            {{ preset.name }}
          </option>
        </select>
        <button class="eq-btn" @click="this.$emit('closeEQ')">
          <span class="material-icons">close</span> Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Bands from './Bands.vue'
import Knob from 'primevue/knob'
import { Presets } from '../../Core/Presets'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'V-EQ',
  components: {
    Bands,
    Knob
  },
  computed: {
    ...mapGetters(['getBands']),
    bands() {
      return this.getBands
    }
  },
  data() {
    return {
      bass: 0,
      treble: 0,
      update: this.getBands,
      presets: [
        { name: 'Normal', value: 'normal' },
        { name: 'Bass', value: 'bass' },
        { name: 'BassTreble', value: 'bt' },
        { name: 'Rock', value: 'rock' },
        { name: 'Classic', value: 'classic' },
        { name: 'Soft bass', value: 'soft_b' },
        { name: 'Dance', value: 'dance' },
        { name: 'Pop', value: 'pop' },
        { name: 'Soft Treble', value: 'soft_t' },
        { name: 'Treble', value: 'treble' },
        { name: 'Reggea', value: 'reg' },
        { name: 'Techno', value: 'tec' },
        { name: 'Loud', value: 'loud' },
        { name: 'Live', value: 'live' },
        { name: 'Flat', value: 'flat' },
        { name: 'Folk', value: 'folk' }
      ]
    }
  },
  props: {
    bandSet: Array
  },
  mounted() {
    this.update = this.bands
  },
  methods: {
    ...mapMutations(['updateBands', 'updateGains', 'tuneBass', 'tuneTreble']),
    eqBand(bands, array) {
      this.update = array
      this.updateGains(array)
      for (let index = 0; index < bands.length; index++) {
        bands[index].gain.value = array[index]
        this.out = array[index]
      }
    },
    updateBandGain(gain) {
      this.updateBands([gain[0], gain[1]])
    },
    trebleUpdate() {
      this.tuneTreble(this.treble)
    },
    updateBass() {
      this.tuneBass(this.bass)
    },
    updateBand() {
      switch (this.$refs['choice'].value) {
        case 'normal': this.eqBand(this.bandSet, Presets.Normal); break
        case 'bass': this.eqBand(this.bandSet, Presets.Bass); break
        case 'soft_b': this.eqBand(this.bandSet, Presets.SoftBass); break
        case 'classic': this.eqBand(this.bandSet, Presets.Classic); break
        case 'rock': this.eqBand(this.bandSet, Presets.Rock); break
        case 'pop': this.eqBand(this.bandSet, Presets.Pop); break
        case 'soft_t': this.eqBand(this.bandSet, Presets.SoftTreble); break
        case 'treble': this.eqBand(this.bandSet, Presets.Treble); break
        case 'tec': this.eqBand(this.bandSet, Presets.Techno); break
        case 'reg': this.eqBand(this.bandSet, Presets.Reggae); break
        case 'flat': this.eqBand(this.bandSet, Presets.Flat); break
        case 'folk': this.eqBand(this.bandSet, Presets.Folk); break
        case 'loud': this.eqBand(this.bandSet, Presets.Loud); break
        case 'bt': this.eqBand(this.bandSet, Presets.BassTreble); break
        case 'dance': this.eqBand(this.bandSet, Presets.Dance); break
        case 'live': this.eqBand(this.bandSet, Presets.Live); break
        default: break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.eq-widget {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  background: linear-gradient(135deg, #ece9f7 0%, #a7bfe8 100%);
}
.eq-card {
  background: rgba(255,255,255,0.55);
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.13);
  padding: 2rem 2.5rem 2rem 2.5rem;
  max-width: 410px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.eq-title {
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  color: #27272a;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.03em;
}
.eq-bands {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  background: rgba(250,250,255,0.25);
  padding: 1rem;
  border-radius: 1rem;
}
.eq-controls {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.eq-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  label {
    font-size: .93rem;
    color: #4b5563;
    margin-bottom: 0.3rem;
    font-weight: 600;
  }
}
.eq-preset-row {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
.eq-select {
  font-size: 1rem;
  padding: 0.5em 1.2em;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f8fafc;
  color: #22223b;
  box-shadow: 0 1px 2px 0 rgba(100,100,140,0.05);
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #6366f1;
  }
}
.eq-btn {
  display: flex;
  align-items: center;
  gap: 0.35em;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 0.5em 1.4em;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(96,165,250,0.1);
  cursor: pointer;
  transition: transform 0.13s, box-shadow 0.13s;
  .material-icons {
    font-size: 1.1em;
  }
  &:hover, &:focus {
    transform: scale(1.04);
    box-shadow: 0 4px 12px rgba(96,165,250,0.18);
    background: linear-gradient(90deg, #4338ca 0%, #2563eb 100%);
  }
}
@media (max-width: 600px) {
  .eq-card {
    padding: 1rem 0.7rem;
    max-width: 98vw;
  }
  .eq-bands {
    gap: 0.4rem;
    padding: 0.4rem;
  }
  .eq-controls {
    flex-direction: column;
    gap: 1rem;
  }
  .eq-preset-row {
    flex-direction: column;
    gap: 0.8rem;
    align-items: stretch;
  }
}
</style>