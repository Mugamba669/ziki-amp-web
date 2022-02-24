<template lang="html">
    <div>
        <label>{{Number(tune).toFixed(2)}} dB</label>
      <input type="range" max="5" step="0.01" min="0" @input="changeTuner" v-model="tune"/>
    </div>
</template>
<script>
export default {
    name:'Tuner',
    props:{
        tune:Number,
        delay:Number,
    },
    methods: {
        changeTuner(){
            this.$store.commit('changeDelays',[this.delay ,this.tune]);
            // this.$store.commit('',{node:this.delay.delayTime.value,value:this.tune});
        },
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
           font:300 12px Arial;
            margin: 8px;
            background:#222;
            color:#fff;
            border-radius: 10px;
            padding: 5px;
             transform:rotate(90deg);
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