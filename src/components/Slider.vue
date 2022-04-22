<template>
<div class="slider">
  <span class="label">{{currentValue}}</span>
  <input type="range"
   @input="updateSlider" 
    v-model="output" 
     min="0"
    step="0.01"
    :max="Number(max)"
    />

    <!-- <progress  :max="max" :value="value"></progress> -->
  <span class="label">-{{duration}}</span>
</div>
</template>

<script>
export default {
  name:'Slider',
  props:{
    max:Number,
    currentValue:String,
    output:Number,
    duration:String,
    
  },
  methods:{
    updateSlider(){
      this.$emit("updateChange",this.output);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slider{
     display:flex;
     flex-direction:row;
     justify-content:center;
     .label{
       font:300 14px Arial;
       background:#000;
       border-radius:5px;
       padding: 10px;
       margin:8px;
     }
     input{
       width:500px;
       appearance:none;
      //  overflow: hidden;
       border-radius:10px;
       height: 10px;
       background: #eee;
       box-shadow:inset 0px 0px 5px 2px #111111;
       &::-webkit-slider-thumb{
          appearance:none;
          overflow: visible;
          width:25px;
          border-radius: 50%;
          height:25px;
          background: rgba(109, 109, 92, 0.986);
         box-shadow:inset -3px 0px 5px -2px #e0cb06,inset -4px 0px 5px -2px #dfdc1f ,inset -3px 0px 10px 2px #27270c;
       }
      //  &::-webkit-slider-runnable-track{
      //    background:#bd1010;
      //    width: 30px;
      //    height: 4px;
      //    transform: translateX(-90px);
      //  }
     }
    }
@media(max-width:910px){
  .slider{
     display:flex;
     flex-direction:row;
     justify-content:center;
     .label{
       font:300 15px Ubuntu,Arial;
       margin:8px;
       background:#222;
       border-radius:5px;
     }
     input{
       width:300px;
       appearance:none;
       height: 4px;
       background: #B3A1A1;
       
       &::-webkit-slider-thumb{
          appearance:none;
          width:20px;
          border-radius: 50%;
          height:20px;
          background: #bd1010;
       }
       &::-webkit-slider-runnable-track{
         background: #9090;
         width: 20px;
         height: 20px;
       }
     }
    }
}
  
@media (max-width:480px) {
  .slider{
     display:flex;
     flex-direction:row;
     justify-content:center;
     .label{
       font:300 15px Ubuntu,Arial;
       margin:8px;
       background:#222;
       border-radius:5px;
     }
     input{
       width:200px;
       appearance:none;
       margin:10px;
       height: 4px;
       background: #B3A1A1;
       
       &::-webkit-slider-thumb{
          appearance:none;
          width:20px;
          border-radius: 50%;
          height:20px;
          background: #554E4E;
       }
     }
    }
}
</style>
