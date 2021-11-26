<template>
    <div class="loader">
        <button v-show="viewDes" @click="triggerLoader"><b class="material-icons mi-add-to-queue"></b></button>
        <button v-show="viewMob" @click="triggerSingle"><b class="material-icons mi-add"></b></button>
        <button @click="this.$emit('showQueue')"><b class="material-icons mi-queue-music"></b></button>
        <button class="btn" @click="this.$emit('toggleEQ')"><b class="mi mi-equalizer"></b></button>
        <button @click="this.$emit('showVol')"> <b class="material-icons mi-volume-up"></b> </button>
      
       <input type="file" class="loadMusic" webkitdirectory multiple @change="track" >
       <input type="file" class="singleMusic" accept="audio/*" @change="trackSingle" >
    </div>
</template>

<script>
export default {
    name: 'Loader',
    data(){
        return{
            viewMob:false,
            viewDes:false
        }
    },
    methods: {
      chooseDeivce(){
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
       const device = this.chooseDeivce();
        
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
</style>