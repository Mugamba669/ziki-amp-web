<template>
  <div class="container">
    <!-- <h2>ROOM EFFECTS</h2> -->
    <br />
    <div class="presets">
      <dropdown
        v-model="presetValue"
        @change="getRoomPreset"
        :options="presets"
        optionLabel="name"
        placeholder="Select a preset"
        class="w-40 md:w-14rem"
      />

      <!-- <select ref="choose" @change="getRoomPreset">
        <option value="">Choose Preset</option>
        <option value="auditorium">Auditorium</option>
        <option value="scene">Scene</option>
        <option value="smallroom">Small Room</option>
        <option value="great">Great Hall</option>
        <option value="echo">Echo</option>
        <option value="reset">No preset</option>
      </select>
      <Toast /> -->
      <div>
        <br />
        <v-button
          outlined="true"
          size="2"
          @click="this.$emit('closeRoom')"
          label="Close"
          severity="danger"
        />
        <!-- <v-button
          icon="pi pi-times"
          @click="this.$emit('closeRoom')"
          severity="danger"
          label="Close"
          aria-label="Cancel"
        /> -->
      </div>
    </div>

    <div class="nodes">
      <Tuner v-for="(delay, index) in delays" :key="index" :tune="d[index]" :delay="index" />

      <Feedback
        v-for="(feed, index) in feedback"
        :key="feed"
        :valueTune="f[index]"
        :feedback="index"
      />
    </div>
  </div>
</template>

<script>
import Tuner from './Tuner.vue'
import Feedback from './Feedback.vue'
import { Rooms } from '../../Core/Presets'
import VButton from 'primevue/button'
import Dropdown from 'primevue/dropdown'
// import Toast from 'primevue/toast'
import { mapGetters } from 'vuex'
export default {
  name: 'V-Room',
  components: {
    Tuner,
    VButton,
    Feedback,
    Dropdown
  },
  computed: {
    ...mapGetters(['getDelays', 'getFeedback'])
  },
  props: {
    delays: Array,
    feedback: Array
  },
  data() {
    return {
      text: 'Close',
      presetValue: '',
      presets: [
        { name: 'Select a preset', value: '' },
        { name: 'Auditorium', value: 'auditorium' },
        { name: 'Scene', value: 'scene' },
        { name: 'Small Room', value: 'smallroom' },
        { name: 'Great Hall', value: 'great' },
        { name: 'Echo', value: 'echo' },
        { name: 'No Preset', value: 'reset' }
      ],
      f: [0, 0],
      d: [0, 0]
    }
  },
  methods: {
    /*
     *
     * replay  Array<Number>
     */
    manuplateFeedBack(replay, tuner) {
      this.f = tuner
      for (let index = 0; index < replay.length; index++) {
        replay[index].gain.value = tuner[index]
      }
    },
    manuplateDelay(delay, tuner) {
      this.d = tuner
      for (let index = 0; index < delay.length; index++) {
        delay[index].delayTime.value = tuner[index]
      }
    },
    getRoomPreset() {
      console.log(this.presetValue.value)
      switch (this.presetValue.value) {
        case 'echo':
          this.manuplateFeedBack(this.getFeedback, Rooms.Echo.feedback)
          this.manuplateDelay(this.getDelays, Rooms.Echo.delay)
          break
        case 'scene':
          this.manuplateFeedBack(this.getFeedback, Rooms.Scene.feedback)
          this.manuplateDelay(this.getDelays, Rooms.Scene.delay)
          break
        case 'auditorium':
          this.manuplateFeedBack(this.getFeedback, Rooms.Audit.feedback)
          this.manuplateDelay(this.getDelays, Rooms.Audit.delay)
          break
        case 'great':
          this.manuplateFeedBack(this.getFeedback, Rooms.GtH.feedback)
          this.manuplateDelay(this.getDelays, Rooms.GtH.delay)
          break
        case 'smallroom':
          this.manuplateFeedBack(this.getFeedback, Rooms.Sm.feedback)
          this.manuplateDelay(this.getDelays, Rooms.Sm.delay)
          break

        case 'reset':
          this.manuplateFeedBack(this.getFeedback, Rooms.Preset.feedback)
          this.manuplateDelay(this.getDelays, Rooms.Preset.delay)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  height: 400px;
  z-index: 9 !important;
  backdrop-filter: blur(100px);
  background: #1b1a1a70;
  padding: 15px;
  width: 630px;
  border-radius: 10px;
  border: 3px solid #dddd;
  .presets {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 50%;
    margin: 10px;
    select {
      width: 100px;
      padding: 6px;
      margin: 10px;
      font: 200 16px Arial;
      background: #eeeeee4b;
      border: none;
      border-radius: 10px;
      outline: none;
    }
  }
  .nodes {
    transform: rotate(-90deg);
    // // grid-template-rows: 200px minmax(2px) 3fr;
    // height: 100px;
  }
}
</style>
