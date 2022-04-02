<template>
<div class="image">
    <center :class="[playing == true?'active':'']"></center>
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
$dur : 50s;
 @keyframes spin {
        0%{
            transform:rotate(0deg);
            
        }
        100%{
            transform:rotate(359deg);
        }
    }

    @keyframes bounce{
        0%{
           width: 50px;
          height: 50px;
        }
        50%{
           width: 120px;
          height: 120px;
        }
        100%{
           width: 50px;
          height: 50px;
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
        center{
            &::after{
         content:'';
        position: absolute!important;
        width: 80%;
        height:20px;
        z-index: 13!important;
        border-radius: 5px;
        background: linear-gradient(-90deg,#555,#000);
        transform: rotate(360deg) translateY(57px);
      }
          width: 130px;
          height: 130px;
          box-shadow: inset 0px 0px 0px 20px rgb(152, 221, 152),
                      // inset 00px 0px 0px 40px rgb(108, 83, 177),
                       0px 0px 0px 50px rgba(112, 112, 71, 0.514);
          border-radius:50%;
          z-index: 10!important;
          transition: $transdur cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background:black;
          position: absolute;
          //  animation: bounce 1.5s infinite linear;
          &:hover{
            
            width: 100px;
            
            height: 100px;
          }
        }

           center.active{
              &::after{
                content:'';
                position: absolute!important;
                width: 200px;
                height:18px;
                z-index: 13!important;
                border-radius: 10px;
                background: linear-gradient(-90deg,#555,#000);
                transform: rotate(360deg) translateY(37px);
              }
            width: 100px;
            
            height: 100px;
          }
    .container {
       
         transform-style: preserve-3d;

        width:200px;
        // transform: translate3d(90px,0px ,0px);
         transition:0.3s ease-in-out;
        height:200px;
        border-radius: 50%;
       
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
        box-shadow: 7px 0px 0px 0px gray,-7px 0px 0px 0px #ddd;
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
           box-shadow: 2px 0px 0px 2px gray;
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