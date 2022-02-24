<template lang="html">
    <div>
        <label>{{Number(valueTune).toFixed(2)}} dB</label>
     <input type="range" max="1" step="0.01" min="0" @input="changeTuner" v-model="valueTune"/>
    </div>
</template>
<script>
export default {
    name:'Feedback',
    props:{
        valueTune:Number,
        feedback:Number,
    },

    methods: {
        changeTuner(){
              this.$store.commit('changeFeedBack',[this.feedback,this.valueTune]);
           
        //   this.feedback.gain.value = this.valueTune;
        },
       
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