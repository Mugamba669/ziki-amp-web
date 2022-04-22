<template>
<div class="image">
    <center :class="[playing == true?'active':'']"></center>
     <div :class="[playing == true?'active':'','container']">
        <img 
        ref="images" 
        :src="[source]"
         alt="coverArt" 
         srcset="" 
         @wheel="wheelUpdate" 
         @touchmove="updateTouch"/>
    </div>

      <div :class="[playing == true?'active':'','dj']">
        <div class="needle"></div>
      </div>

</div>
 
</template>

<script>

export default {
    name: 'Cover',
  props:{
      playing:Boolean,
      source:String
  },
  data() {
    return {
      
    }
  },
  methods:{
    wheelUpdate(e){
      e.preventDefault();
       console.log( this.$refs['images']);
    },
    touchUpdate(){
      console.log( this.$refs['images'].value)
    }
  },
  created(){
    // this.source = this.$store.getters.getNowPlaying.artwork;

  }
  ,mounted(){
    // this.source = this.$store.getters.getNowPlaying.artwork;
    
  }
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
 @keyframes disc{
    0%{
      filter:hue-rotate(0deg);
    }
    100%{
    
      filter:hue-rotate(365deg);
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

        .dj{
          transition: 0.93s ease-in-out;
          width: 50px;
          height: 50px;
            animation: disc 0.3s infinite linear;

          border-radius: 50%;
          background: rgb(10, 10, 10);
          position: absolute;
          right: -160px;
          top: 50px;
          display: flex;
          transform: translateZ(0px) translate(-80px ,-100px) rotate(40deg) scale(1);
          flex-direction: column;
          justify-content:center!important;
          align-items: center!important;
            //  box-shadow:inset 0px 0px 5px 0px #f1e1e1,inset -2px 0px 8px 4px #c2bbbb;
          // box-shadow: 0px 0px 2px 1px #dddd ,inset -2px 0px 15px 0px #494646;
           &::after{
                content:'';
                width: 10px;
                height:10px;
              position: absolute;
              border-radius: 50%;
                background: #070707fd;
            //  box-shadow:inset -2px 0px 5px 0px #e4d8d8,inset 0px 1px 0px 10px #f1e2e2;

              }
          .needle{
            width: 30px;
            height: 30px;
            background: #eeeeee;
            position: absolute;
            border-radius:50%;
          box-shadow:inset -2px 0px 5px 0px #494646,inset -4px 0px 6px 0px #494646;
              &::after{
                content:'';
                width: 20px;
              cursor:grabbing;

                height: 50px;
              position: absolute;
             box-shadow:inset -2px 0px 5px 0px #494646,inset -2px 0px 8px 0px #494646;
                transform: translate(-200px,105px) rotate(60deg);
                background: #afa9a9;
                border-radius: 5px;
              }
            &::before{
              content:'';
             box-shadow:inset -2px 0px 3px 0px #1b1a1a,inset -2px 0px 8px 0px #494646;
            border-radius:20px;
              position: absolute;
              width: 8px!important;
              cursor:grabbing;
              background: #eee;
              height: 200px;
              // top:-20px;
              // right: 2px;
              transform:translateX(-70px) perspective(200px) translateY(-29px) translateZ(50px) rotate(60deg);
            }
          }
          // &:hover{
          //   transform: scale(1.1,1.1) rotate(0deg) translateZ(30px);
          // }
        }
         .dj.active{
           transition-delay: 2s;
            transform: scale(1.03,1.03) rotate(0deg) translateZ(10px);
          }
        // transform-style: preserve-3d;
        center{
          width: 20px;
          height: 20px;
          box-shadow: inset 0px 0px 0px 10px rgb(152, 221, 152),
                      // inset 00px 0px 0px 40px rgb(108, 83, 177),
                       0px 0px 0px 30px rgba(54, 54, 51, 0.514);
          border-radius:50%;
          z-index: 10!important;
          transition: $transdur 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background:black;
          position: absolute;
          //  animation: bounce 1.5s infinite linear;
         
        }

           center.active{
            width: 80px;
            height: 80px;
          }
    .container {
         transform-style: preserve-3d;
        // width:200px;
        // transform: translate3d(90px,0px ,0px);
         transition:0.3s ease-in-out;
        width:400px;
        height:400px;
        border-radius: 50%;
        animation: spin $dur infinite linear;
         animation-play-state: paused;

         overflow:hidden;
        img{ 
        
          cursor:grab;
          width:100%;
          height:100%;
          transform: rotate3d(70deg);

          position: relative;
           object-fit:contain!important;

        }
   }
    .container.active{
        box-shadow: 7px 0px 0px 0px gray,-7px 0px 0px 0px #ddd;
       width:400px;
        height:400px;
       animation-delay: 5s;
        animation-play-state: running;
    }
    .container.shrink{
       width:400px;

    }
}
@media(max-width:900px){
 
    .image{
        margin: 15px;
       display:flex;
        flex-direction:column;
        justify-content:center!important;
        align-items:center!important;
        .dj{
          transition: 0.93s ease-in-out;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgb(10, 10, 10);
          position: absolute;
          right: -100px;
          top: 10px;
          display: flex;
          transform: translateZ(0px) translate(0px ,-100px) rotate(70deg) scale(1);
          flex-direction: column;
          justify-content:center!important;
          align-items: center!important;
           &::after{
                content:'';
                width: 10px;
                height:10px;
              position: absolute;
              border-radius: 50%;
                background: #070707fd;
            //  box-shadow:inset -2px 0px 5px 0px #e4d8d8,inset 0px 1px 0px 10px #f1e2e2;

              }
          .needle{
            width: 30px;
            height: 30px;
            background: #ca3e3e;
            animation: disc 0.3s infinite linear;
            position: absolute;
            border-radius:50%;
          box-shadow:inset -2px 0px 5px 0px #494646,inset -4px 0px 6px 0px #494646;
              &::after{
                content:'';
                width: 20px;
                height: 30px;
            animation: disc 0.3s infinite linear;

              position: absolute;
             box-shadow:inset -2px 0px 5px 0px #494646,inset -2px 0px 8px 0px #494646;
                transform: translate(-80px,50px) rotate(60deg);
                background: #afa9a9;
                border-radius: 5px;
              }
            &::before{
              content:'';
             box-shadow:inset -2px 0px 3px 0px #1b1a1a,inset -2px 0px 8px 0px #494646;
            border-radius:20px;
              position: absolute;
            animation: disc 0.3s infinite linear;

              width: 8px!important;
              background: #eee;
              height: 100px;
              // top:-20px;
              // right: 2px;
              transform:translateX(-20px) perspective(200px) translateY(-10px) translateZ(50px) rotate(60deg);
            }
          }
          // &:hover{
          //   transform: scale(1.1,1.1) rotate(0deg) translateZ(30px);
          // }
        }
         .dj.active{
          //  z-index: 5!important;
            transform: scale(1.1,1.1) rotate(0deg) translateZ(0px);
          }
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