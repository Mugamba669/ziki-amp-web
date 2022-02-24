<template>
<div class="image">
     <div :class="[playing == true?'active':'','container']">
        <img ref="images" :src="[source]" alt="coverArt" srcset="">
    </div>
</div>
   
</template>

<script>

export default {
    name: 'Cover',
  props:{
      source:String,
      playing:Boolean,
  },
}
</script>

<style lang="scss" scoped>
/**Variables */
$transdur :0.3s;
$dur : 30s;
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
         transform-style: preserve-3d;
      transform-origin: right;
        
        perspective: 200px;
        // transform-style: preserve-3d;
        
    .container {
         transform-style: preserve-3d;

        width:200px;
        // transform: translate3d(90px,0px ,0px);
         transition:0.3s ease-in-out;
        height:200px;
        border-radius: 50%;
        box-shadow: 0px -2px 3px 2px gray;
        animation: spin $dur infinite linear;
         animation-play-state: paused;

         overflow:hidden;
        img{ 
          cursor: no-drop;
          width:100%;
          height:100%;
          transform: rotate3d(70deg);

          position: relative;
          
           object-fit:contain!important;

        }
   }
    .container.active{
       width:400px;
        height:400px;
        animation-play-state: running;

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
        width:50px;
        height:50px;
          border-radius: 50%;
           box-shadow: 0px -2px 3px 2px gray;
           overflow:hidden;
           animation: spin $dur infinite linear;
            transition: $transdur ease-in-out;
           animation-play-state: paused;
        img{ 
          width:100%;
          height:100%;
        //    box-shadow: 0px -2px 3px 2px gray;
           object-fit:contain!important;
        }
   }
    .container.active{
       width:200px;
        height:200px;
           animation-play-state: running;

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
        width:50px;
        height:50px;
          border-radius: 50%;
           box-shadow: 0px -2px 3px 2px gray;
           overflow:hidden;
           animation: spin $dur infinite linear;
           transition:$transdur ease-in-out;
           animation-play-state: paused;
        img{ 
          width:100%;
          height:100%;
        //    box-shadow: 0px -2px 3px 2px gray;
           object-fit:contain!important;
        }
   }
    .container.active{
       width:170px;
        height:170px;
           animation-play-state: running;

    }
}
}
.img.active{
  animation-play-state: paused;

}
</style>