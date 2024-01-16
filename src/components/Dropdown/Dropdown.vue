<template lang="html">
  <div class="dropdown">
    <select ref="select" @change="makeChoice">
      <option>Select your visual</option>
      <option value="1">Bottom Bars</option>
      <option value="2">Dusty Particles</option>
      <option value="3">Histogram visual</option>
      <option value="4">Sine wave visual</option>
      <option value="5">Ripple Tank Visual</option>
      <option value="6">Glass Pills Visual</option>
      <option value="7">Floating Bars</option>
      <option value="8">Color-Stretch Bars</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Drop-down',
  methods: {
    makeChoice() {
      this.$emit('choice', this.$refs['select'].value)
    }
  }
}
</script>
<style lang="scss">
.dropdown {
  width: 100%;
  background: transparent;
  select {
    width: 50%;
    padding: 10px;
    font: 100 15px Arial;
    border: 0.1px solid#EEEEEE66;
    border-radius: 2px;
    background: transparent;
    outline: none;
    color: #eeeeee66;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      border: 0.1px solid #eee;
      color: #eee;
    }
    option {
      appearance: none;
      background: #eeeeee3b;
    }
  }
}
</style>
