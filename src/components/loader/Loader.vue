<template>
    <div class="loader">
        <button @click="triggerLoader"><b class="material-icons mi-add-to-queue"></b></button>
       <button @click="this.$emit('showQueue')"><b class="material-icons mi-queue-music"></b></button>
       <button class="btn" @click="this.$emit('toggleEQ')"><b class="mi mi-equalizer"></b></button>
       <button @click="this.$emit('showVol')"> <b class="material-icons mi-volume-up"></b> </button>
       <input type="file" class="loadMusic" webkitdirectory multiple @change="track" >
    </div>
    
</template>

<script>
export default {
    name: 'Loader',
    
    mounted(){

    },
    methods: {
        triggerLoader(){
            document.querySelector(".loadMusic").click();
        },
        track(value){
            const file =  value.target.files;
            this.$emit("trackLoader",file)
        }
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
                transform: scale(1.1,1.1);
            }
        }
         
        input{
            display: none;
        }
    }
</style>