<template>
    <div class="slider_wrapper">
            <input type="range" @input="this.$emit('update')" :max="max" :min="min" step="0.01" v-model="value"/>
    </div>
</template>

<script>
export default {
    name:'slider',
    props:{
        value:Number,
        max:Number,
        min:Number,
    },
    data() {
        return {
            max:6,
            min:0,
            value:0
        }
    },
}
</script>

<style>

</style>