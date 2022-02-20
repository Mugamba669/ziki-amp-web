<template lang="html">
    <div>
        <label>{{(parseFloat(tune)).toFixed(1)}}dB</label>
      <input type="range" max="5" step="0.01" min="0" @input="changeTuner" v-model="tune"/>
    </div>
</template>
<script>
export default {
    name:'Tuner',
    props:{
        tune:Number,
        delay:DelayNode,
    },
    methods: {
        changeTuner(){
            this.delay.delayTime.value = this.tune;
        }
    },
}
</script>
<style lang="scss" scoped>
  div{
     display:flex;
        flex-direction:row-reverse;
        justify-content: center;
        align-items:center;
        label{
            font:100 14px Arial;
            transform:rotate(90deg);
            margin:8px;
        }
    [type="range"]{
        appearance:none;
        margin:30px;
        width:250px;
        background:#736cdd;
        // overflow: hidden;
        border-radius: 10px;
        height: 5px;
        &::-webkit-slider-thumb{
             appearance:none;
            cursor:pointer;
            width:20px;
            background:#1506e7;
            height: 20px;
            border-radius: 10px;
        }
    }
}
</style>