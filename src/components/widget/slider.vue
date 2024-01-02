<template>
  <div class="slider_wrapper">
    <input
      type="range"
      @input="this.$emit('update')"
      :max="max"
      :min="min"
      step="0.01"
      v-model="val"
    />
  </div>
</template>

<script>
export default {
  name: 'v-sider',
  props: {
    value: Number,
    max: Number,
    min: Number
  },
  data() {
    return {
      val: 0
    }
  }
}
</script>

<style></style>
