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
  <span class="label">{{duration}}</span>
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
  created(){
  }
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
          background: #554E4E;
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
