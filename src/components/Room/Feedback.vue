<template lang="html">
    <div>
        <label>{{parseFloat(valueTune).toFixed(2)}}dB</label>
     <input type="range" max="5" step="0.01" min="0" @input="changeTuner" v-model="valueTune"/>
    </div>
</template>
<script>
export default {
    name:'Feedback',
    props:{
        valueTune:Number,
        feedback:GainNode,
    },
    methods: {
        changeTuner(){
            // console.log(this.feedback.gain);
          this.feedback.gain.value = this.valueTune;
        }
    },
}
</script>
<style lang="scss" scoped>
    div{
        // transform: rotate(90deg);
        display:flex;
        flex-direction:row-reverse;
        justify-content:center;
        align-items:center;
        label{
            font:100 14px Arial;
            margin: 8px;
             transform:rotate(90deg);
        }
   [type="range"]{
        appearance:none;
        width:250px;
        background:#736cdd;
        // overflow: hidden;
        border-radius: 10px;
        height: 5px;
        margin:30px;
        &::-webkit-slider-thumb{
             appearance:none;
            width:20px;
            background:#1506e7;
            cursor:pointer;
            height: 20px;
            border-radius: 10px;
        }
    }
    }
</style>