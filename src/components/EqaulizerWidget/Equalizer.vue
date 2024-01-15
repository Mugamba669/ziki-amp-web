<!-- eslint-disable vue/no-reserved-keys -->
<template>
  <div class="widget">
    <!-- <tab-view>
      <TabPanel header="Room effects" />
      <TabPanel header="Equalizer" />
      <TabPanel header="Compressor" />
    </tab-view>
    <TabMenu></TabMenu> -->
    <div class="equalizer">
      <Bands
        :key="index"
        :id="index"
        :frequency="band.frequency.value"
        :bandGain="update[index]"
        v-for="(band, index) in bandSet"
        @bandChange="updateBandGain"
      />
    </div>
    <!-- </div> -->
    <div class="side">
      <button class="closeEQ" @click="this.$emit('closeEQ')">Close</button>

      <select ref="choice" @change="updateBand">
        <option v-for="(preset, index) in presets" v-bind:key="index" :value="preset.value">
          {{ preset.name }}
        </option>
      </select>
    </div>

    <div class="more">
      <p>
        <b>Bass </b>
        <knob
          @change="updateBass"
          :max="15"
          :min="0"
          :step="0.01"
          :size="150"
          :valueTemplate="`${Math.floor((bass / 15) * 100)} dB`"
          v-model="bass"
          rangeColor="#232323"
          valueColor="orange"
          textColor="#fff"
          v-bind:strokeWidth="10"
        />
      </p>

      <p>
        <b>Treble</b>
        <knob
          @change="trebleUpdate"
          :size="150"
          :valueTemplate="`${Math.floor((treble / 6) * 100)} dB`"
          :max="6"
          :min="0"
          :step="0.01"
          v-model="treble"
          rangeColor="#000"
          valueColor="orange"
          textColor="#fff"
          v-bind:strokeWidth="10"
        />
        <!-- <input type="range"  max="6" min="0" step="0.01" v-model="treble" /> -->
      </p>
    </div>
  </div>
</template>

<script>
import Bands from './Bands.vue'
import Knob from 'primevue/knob'
import TabView from 'primevue/tabview'

// import slider from "../widget/slider.vue";
import { Presets } from '../../Core/Presets'
import { mapGetters, mapMutations } from 'vuex'
import TabPanel from 'primevue/tabpanel'
import TabMenu from 'primevue/tabmenu'
export default {
  name: 'V-EQ',
  components: {
    Bands,
    Knob
    // TabPanel, TabView, TabMenu
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
        {
          name: 'Normal',
          value: 'normal'
        },
        {
          name: 'Bass',
          value: 'bass'
        },
        {
          name: 'BassTreble',
          value: 'bt'
        },
        {
          name: 'Rock',
          value: 'rock'
        },
        {
          name: 'Classic',
          value: 'classic'
        },
        {
          name: 'Soft bass',
          value: 'soft_b'
        },
        {
          name: 'Dance',
          value: 'dance'
        },
        {
          name: 'Pop',
          value: 'pop'
        },
        {
          name: 'Soft Treble',
          value: 'soft_t'
        },
        {
          name: 'Treble',
          value: 'treble'
        },
        {
          name: 'Reggea',
          value: 'reg'
        },
        {
          name: 'Techno',
          value: 'tec'
        },
        {
          name: 'Loud',
          value: 'loud'
        },
        {
          name: 'Live',
          value: 'live'
        },
        {
          name: 'Flat',
          value: 'flat'
        },
        {
          name: 'Folk',
          value: 'folk'
        }
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
        // bands[index].Q.value = array[index] / 2
        this.out = array[index]
      }
    },
    updateBandGain(gain) {
      console.log(gain)
      this.updateBands([gain[0], gain[1]])
    },
    trebleUpdate() {
      //   console.log(e.value);
      this.tuneTreble(this.treble)
    },
    updateBass() {
      // console.log(this.bass);
      this.tuneBass(this.bass)
    },
    updateBand() {
      switch (this.$refs['choice'].value) {
        case 'normal':
          this.eqBand(this.bandSet, Presets.Normal)
          break

        case 'bass':
          this.eqBand(this.bandSet, Presets.Bass)
          break
        case 'soft_b':
          this.eqBand(this.bandSet, Presets.SoftBass)
          break
        case 'classic':
          this.eqBand(this.bandSet, Presets.Classic)
          break
        case 'rock':
          this.eqBand(this.bandSet, Presets.Rock)
          break
        case 'pop':
          this.eqBand(this.bandSet, Presets.Pop)
          break
        case 'soft_t':
          this.eqBand(this.bandSet, Presets.SoftTreble)
          break

        case 'treble':
          this.eqBand(this.bandSet, Presets.Treble)
          break
        case 'tec':
          this.eqBand(this.bandSet, Presets.Techno)
          break

        case 'reg':
          this.eqBand(this.bandSet, Presets.Reggae)
          break

        case 'flat':
          this.eqBand(this.bandSet, Presets.Flat)
          break

        case 'folk':
          this.eqBand(this.bandSet, Presets.Folk)
          break

        case 'loud':
          this.eqBand(this.bandSet, Presets.Loud)
          break

        case 'bt':
          this.eqBand(this.bandSet, Presets.BassTreble)
          break

        case 'dance':
          this.eqBand(this.bandSet, Presets.Dance)
          break

        case 'live':
          this.eqBand(this.bandSet, Presets.Live)
          break

        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.widget {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  .side {
    display: flex;
    flex-direction: column;
    justify-content: space-around !important;
    align-items: center !important;
  }
  .equalizer {
    background: #1111115d;
    backdrop-filter: blur(20px);
    margin: 10px;
    padding: 15px;
    border-radius: 5px;
    z-index: 8;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 650px;
    transform: rotate(-90deg);
  }
}
//   .closeEQ{
//       border:1px solid #eee;
//       width:100px;
//       background:transparent;
//       position: absolute;
//       color:#ddd;
//       right:50px;
//       padding:10px;
//       border-radius:10px;
//       transform: scale(1,1);
//       font:300 16px Ubuntu,Arial;
//       transition:0.3s ease-in-out;
//       cursor:pointer;
//   }
//   .closeEQ:hover{
//       transform: scale(1.1,1.1);
// }
@media (max-width: 910px) {
  .widget {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .equalizer {
      background: #1111115d;
      backdrop-filter: blur(20px);
      // margin: 10px;
      // padding: 15px;
      border-radius: 5px;
      //  z-index: 8;
      border: 1px solid #ddd;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      // overflow-y: scroll;
      // overflow-x: hidden;
      width: 270px;
      height: 350px;
      // pointer-events: none;
      // transform:rotate(-90deg);
    }

    .closeEQ {
      border: 1px solid #eee;
      width: 100px;
      background: transparent;
      color: #ddd;
      padding: 10px;
      border-radius: 10px;
      transform: scale(1, 1);
      font:
        300 16px Ubuntu,
        Arial;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      bottom: 10px;
    }
    .closeEQ:hover {
      transform: scale(1.1, 1.1);
    }
  }
}
</style>
