<template>

    <div  class="container">
       
        <h2>Welcome to Lw-Amp Web</h2>
                <img :src="[image]" alt="" srcset="">
              <p v-show="!btn">Loading....</p>
         <progress ref="progress" v-show="!btn" value="0" max="100" min="0"></progress>
         <p></p>
         <button v-show="btn" @click="loadPlayer">
             <span class="mi mi-play-arrow"></span>
             Play Now</button>
        <br>
        <div id="demo"></div>

    </div>

         <VueParticle domId="demo" :config="particleConfig"/>
        
</template>


<script>
import { image } from '@/Core/default';
import VueParticle from "vue-particlejs";

export default {
    name:'Intro',
    components:{
        VueParticle,
    },
    data() {
        return {
          image:image,
            btn:false,
        particleConfig: {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 290 } },
          color: { value: "#63cdff" },
          shape: {
            type: "cicle",
            stroke: { width: 13, color: "#000000" },
            polygon: { nb_sides: 6 },
            image: { src: "img/github.svg", width: 300, height: 100 }
          },
          opacity: {
            value: 0.9,
            random: false,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 10, size_min: 0.1, sync: true }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 90,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            
             // nice wobble movement
      wobble:{
         enable:true,
         distance:10,
         speed:10
      },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      }
    
        }
    },
    methods: { 
        loadPlayer(){
            this.$router.push('/player');
        },
    },
    mounted(){
        var lead = 0;
       var timer = setInterval(()=>{
           if(lead == 100) {
                clearInterval(timer);

                this.btn = !this.btn;
                console.log("done");
           }else{
            lead += 5;
            this.$refs['progress'].value = lead;
           }
        },500);
    }
}
</script>

<style lang="scss" scoped>
    @keyframes fazing {
        0%{
            opacity: 0;
            color: #3333;
        }
        100%{
            opacity: 1;
            color: #ddd;
        }
    }

    @keyframes color{
        0%{
            filter:hue-rotate(0deg);
        }
         100%{
            filter:hue-rotate(365deg);
        }
    }
    

    /**Main Container for intro window */
           #demo {
  width: 100%;
  height: 100%;
  position:absolute;
  z-index:-1;
  background: #570808fb;
  animation: color 3s 0s infinite alternate forwards;
}
    div.container{
        z-index: 10!important;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column!important;
        justify-content: center!important;
        align-items: center!important;
        // backdrop-filter:blur(50px);
        background: rgba(7, 7, 7, 0.493);
        p{
            text-align: center;
            
            font: 200 17px Ubuntu,Arial;
            animation: fazing 2s 0s infinite alternate forwards;
        }
         progress{
        width: 60%;
        // appearance:none;
        // height: 8px;
        // border:2px solid green;
        // background:#81054e!important;
        // border-radius: 15px;
    }
    button{
        display: flex;
        flex-direction: row!important;
        justify-content: space-evenly!important;
        align-items: center!important;
        width: 200px;
        height:45px;
        text-shadow:1px 2px #000,2px 1px #000,1px 1px #000,2px 3px #000;
        border-radius: 5px;
        background:#111;
        outline: none;
        border-top:1px solid #fff;
        border-left:1px solid #fff;
         border-bottom:1px solid #333;
        border-right:1px solid #333;
        cursor: pointer;
        // background: transparent;
        color:#fff;
        transition: 0.1s ease-in-out;
        transform: scale(1,1);
        font: 100 15px Ubuntu,Arial;
   &:hover{
        transform: scale(1.05,1.05);
        border-bottom:1px solid #fff;
        border-right:1px solid #fff;
         border-top:1px solid #333;
        border-left:1px solid #333
   }
   }
   img{
       width:20%;
       box-shadow: 0px -1px 2px 0px #555,inset 0px -1px 2px 0px #555;
       border-radius:10px;
   }
     h2{
         text-shadow:1px 2px #5555,2px 1px #5555,1px 1px #5555,2px 3px #5555;
        text-orientation:sideways-right;
        color: #ddd;
        font: 100 35px Ubuntu,Arial;
    }
   
    }
   
</style>