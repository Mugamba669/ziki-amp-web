<template>
<div class="widget">
    <!-- <Presets/> -->
    <div class="conatiner">
        <div class="equalizer">
            <Bands 
                :filter="band"
                :key="band" 
                :frequency="band.frequency.value"
                :bandValue="band.gain.value"
                v-for="band in bandSet"/>
        </div>
    </div>

<button class="closeEQ" @click="this.$emit('closeEQ')">Close</button>
</div>

</template>

<script>
import Bands from "./Bands.vue";
import Presets from "./Presets.vue"
export default {
    name: 'EQ',
    components:{
        Bands,
        Presets,
    },
    props: {
        bandSet:Array,
    }
}
</script>

<style lang="scss" scoped>
.widget{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
 .conatiner {

    //  overflow: scroll;
    .equalizer {
         background: #1111115D;
        backdrop-filter: blur(20px);
        margin: 10px;
        padding: 15px;
        border-radius:5px;
         z-index: 8;
         border: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:300px;
        height: 650px;
        transform:rotate(-90deg);
    }
  }
  .closeEQ{
      border:1px solid #eee;
      width:100px;
      background:transparent;
      position: absolute;
      color:#ddd;
      right:50px;
      padding:10px;
      border-radius:10px;
      transform: scale(1,1);
      font:300 16px Ubuntu,Arial;
      transition:0.3s ease-in-out;
      cursor:pointer;
  }
  .closeEQ:hover{
      transform: scale(1.1,1.1);
  }
}
@media(max-width:910px) {
    
.widget{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
 .conatiner {
    
    //  overflow: scroll;
    .equalizer {
         background: #1111115D;
        backdrop-filter: blur(20px);
        // margin: 10px;
        // padding: 15px;
        border-radius:5px;
        //  z-index: 8;
         border: 1px solid #ddd;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // overflow-y: scroll;
        // overflow-x: hidden;
        width:270px;
        height: 350px;
        // pointer-events: none;
        // transform:rotate(-90deg);
    }
  }
  .closeEQ{
      border:1px solid #eee;
      width:100px;
      background:transparent;
      color:#ddd;
      padding:10px;
      border-radius:10px;
      transform: scale(1,1);
      font:300 16px Ubuntu,Arial;
      transition:0.3s ease-in-out;
      cursor:pointer;
      bottom: 10px;
  }
  .closeEQ:hover{
      transform: scale(1.1,1.1);
  }
}
}
</style>