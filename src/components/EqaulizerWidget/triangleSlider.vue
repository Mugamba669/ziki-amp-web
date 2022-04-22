<template>
  <div class="triangle_slider">
    <div class="slider_wrapper">
      <input
        @input="this.$emit('updateInput')"
        type="range"
        min="0"
        max="15"
        :value="value"
      />
      <!-- <div
        v-if="filterName == 'VBoost'"
        class="slider_progress"
        :style="{ height: barHeightForVolumeBoost }"
      ></div> -->
      <div  class="slider_progress" :style="{ height: 90 }"></div>
    </div>
    <p>
    
    </p>
  </div>
</template>

<script>
export default {
    name:'TriangleSlider',
    props:{
        value:Number,
        barHeight:Number,
    }
}
</script>

<style lang="scss" scoped>
@import "../../Design/triangleSlider.scss";
</style>