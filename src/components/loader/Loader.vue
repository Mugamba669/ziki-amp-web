<template>
    <div class="loader">
        <button id="addMusic" v-show="viewDes" @click="triggerLoader"><b class="material-icons mi-post-add" title="Add music playlist"></b></button>
        <button id="addMusic" v-show="viewMob" @click="triggerSingle"><b class="material-icons mi-add" title="Add music playlist"></b></button>
        <button id="playlist" @click="this.$emit('showQueue')"><b class="material-icons mi-rounded mi-queue-music" title="Open playlist"></b></button>
        <button id="eq" class="btn" @click="this.$emit('toggleEQ')"><b class="mi mi-tune mi-rounded" title="Open Equalizer" ></b></button>
        <button id="player" @click="this.$emit('showRoom')"> <b class="material-icons mi-meeting-room mi-rounded" title="show Room Effects"></b> </button>
        <button id="volume" @click="this.$emit('showVol')"> <b class="material-icons mi-volume-up mi-rounded" title="Volume control"></b> </button>
        <button id="vis" @click="this.$emit('showVisual')"> <b class="material-icons mi-graphic-eq mi-rounded" title="Visual effects control"></b> </button>
      
       <input type="file" class="loadMusic" webkitdirectory multiple @change="track" >
       <input type="file" class="singleMusic" accept="audio/*" @change="trackSingle" >
    </div>
    <!-- <v-tour name="guide" :steps="steps"></v-tour> -->
</template>

<script>
export default {
    name: 'Loader',
    data(){
        return{
            viewMob:false,
            viewDes:false,
            steps:[
                 {
                    target: '#addMusic',  // We're using document.querySelector() under the hood
                    content: `Discover <strong>Vue Tour</strong>!`
                },
                {
                    target: '#vs',
                    content: 'An awesome plugin made with Vue.js!'
                },
            ]
        }
    },
    methods: {
      chooseDevice(){
            const ua = navigator.userAgent;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                return "tablet";
            }
            else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                return "mobile";
            }
            return "desktop";

        },
        triggerLoader(){
            document.querySelector(".loadMusic").click();
        },
        track(value){
            const file =  value.target.files;
            this.$emit("trackLoader",file)
        },
        triggerSingle(){
            document.querySelector(".singleMusic").click();
        },
        trackSingle(track){
            this.$emit('loadSingle',track.target.files[0]);
        }
    },
    mounted(){

       const device = this.chooseDevice();
       switch (device) {
           case "tablet":
           case "mobile":
                this.viewMob = true;
               break;
       
           default:
             this.viewDes = true;
            break;
       }
    },
    computed(){
        //  this.$tours['guides'].start();

    }
}
</script>

<style lang="scss" scoped>
    .loader{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button{
            margin: 10px;
            border: 1px solid #ddd;
            background: rgba(0, 0, 0, 1);
            color:#ddd;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            transform: scale(1,1);
            transition: 0.3s ease-in-out;
            cursor: pointer;
            &:hover{
                transform: scale(1.05,1.05);
            }
        }
        input{
            display: none;
        }
    }
@media (max-width:480px) {
     .loader{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        button{
            margin: 10px;
            border: 1px solid #ddd;
            background: rgba(0, 0, 0, 1);
            color:#ddd;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            transform: scale(1,1);
            transition: 0.3s ease-in-out;
            cursor: pointer;
            &:hover{
                transform: scale(1.05,1.05);
            }
            b{
                font-size: 16px;
            }
        }
        input{
            display: none;
        }
     }
}
</style>