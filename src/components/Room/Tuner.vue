<template lang="html">
    <div>
          <input type="range" @input="changeTuner" v-model="tune" id="">
    </div>
</template>
<script>
export default {
    data() {
        return {
            tune:""
        }
    },
    methods: {
        changeTuner(){
            this.$emit("tuneRoom", this.tune);
        }
    },
}
</script>
<style lang="scss">
    
</style>