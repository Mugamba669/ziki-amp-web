<template>
<div class="image">
     <div class="container">
        <img ref="images" :src="source" alt="coverArt" srcset="">
    </div>
</div>
   
</template>

<script>
  const image = document.querySelector("img");

export default {
    name: 'Cover',
  props:{
      source:String,
      audio:HTMLAudioElement,
  },
  methods:{},
  mounted(){
    
    this.audio.onplay = ()=>{

       image.style.animationPlayState = this.audio.paused? "paused":"running";
    }
  }
}
</script>

<style lang="scss" scoped>
 @keyframes spin {
        0%{
            transform:rotate(0deg);
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
        // perspective: 200px;
        // transform-style: preserve-3d;
        
    .container {
        width:400px;
        // transform: ;
        height:400px;
         transform-style: preserve-3d;
        border-radius: 50%;
        box-shadow: 0px -2px 3px 2px gray;
         overflow:hidden;
        img{ 
          cursor: no-drop;
          width:100%;
          height:100%;
          position: relative;
          // transform: translate3d(200px);
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