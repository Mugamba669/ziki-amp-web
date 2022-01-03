<template>
<div class="image">
     <div class="container">
        <img :src="source" alt="coverArt" srcset="">
    </div>
</div>
   
</template>

<script>
export default {
    name: 'Cover',
  props:{
      source:String,
      playState:String,
  },
  data(){
    return{
        playState:false
    } 
},
  methods:{ 
     
  }
}
</script>

<style lang="scss" scoped>
 @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform:rotate(359deg);
        }
    }
.image{
        margin: 15px;
        display:flex;
        flex-direction:column;
        justify-content:center!important;
        align-items:center!important;
    .container {
        width:400px;
        height:400px;
        border-radius: 50%;
        box-shadow: 0px -2px 3px 2px gray;
         overflow:hidden;
        img{ 
          width:100%;
          height:100%;
          position: relative;
          animation: spin 20s infinite linear;
        //    animation-play-state: paused;
           object-fit:contain!important;

        }
   }
}
@media(max-width:910px){
    .image{
        margin: 15px;
       display:flex;
        flex-direction:column;
        justify-content:center!important;
        align-items:center!important;
    .container {
        width:200px;
        height:200px;
          border-radius: 50%;
           box-shadow: 0px -2px 3px 2px gray;
           overflow:hidden;
           animation: spin 20s infinite linear;
        //    animation-play-state: paused;
        img{ 
          width:100%;
          height:100%;
        //    box-shadow: 0px -2px 3px 2px gray;
           object-fit:contain!important;
        }
   }
}
}

@media(max-width:480px){
    .image{
        margin: 10px;
       display:flex;
        flex-direction:column;
        justify-content:center!important;
        align-items:center!important;
    .container {
        width:170px;
        height:170px;
          border-radius: 50%;
           box-shadow: 0px -2px 3px 2px gray;
           overflow:hidden;
           animation: spin 20s infinite linear;
        //    animation-play-state: paused;
        img{ 
          width:100%;
          height:100%;
        //    box-shadow: 0px -2px 3px 2px gray;
           object-fit:contain!important;
        }
   }
}
}
.img.active{
  animation-play-state: paused;

}
</style>