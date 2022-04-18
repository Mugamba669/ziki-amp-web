<template lang="html">
    <div>
        <div class="next">

            <b>Next track  <b class="">></b></b>
        </div>
      
        <div class="art">
        <button @click="this.$emit('closeB')"><b>&times;</b></button>

            <img :src="[playlist.image]"/>
        </div>

        <div class="content">
            <p>{{playlist.title}}</p>
            <b>{{playlist.artist}}</b>
        </div>
    </div>
</template>
<script>

export default {
    name:'BottomSheet',
    props:{
       
        playlist:Object,
    },
    data() {
       
        return {
           
            player:this.$store.getters.getPlayer
        }
    },
    methods:{

    },
    mounted(){
        this.art = this.$store.getters.getNowPlaying;
       
        
    }
}
</script>

<style lang="scss" scoped>
div{
    display: flex;
    flex-direction: row;
    width: 200px!important;
    height: 200px!important;
    position: fixed;
    // left: 0px;
    // opacity: 0;
    transition: 0.3s ease-in-out;
    button{
        width:40px;
        top: 10px;
        right: 10px;
        color: #fff;
        border-radius:50%;
        border:1px solid #eeeeee50;
        font: 200 25px Ubuntu,Arial;
        height:40px;
        backdrop-filter: blur(20px);
        cursor: pointer;
        background:#0c0c0b46;
        position: absolute;
    z-index: 16!important;

    }
    .art{
        width: 100%;
        height: 100%;
        width: inherit !important;
        img{
            width: 100%;
            height:100%;
            object-fit: cover !important;
            border-radius:10px;
        }
    }
    .content{
         width: 180px!important;
    height: 50px!important;
    margin: 10px;
    background: #22222291;
    left: 10px;
    border-radius: 20px;
    top: 150px;
    backdrop-filter: blur(20px);
    position: absolute;
        padding:10px;
        display: flex;
        flex-direction:column;
        justify-content: center;
        b{margin: 3px; color: aliceblue;width: 150px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
        p{margin: 3px; color: aliceblue;width: 130px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    }
     .next{
        width: 130px!important;
        height: 40px!important;
        transition:0.3s ease-in-out;
        background: #0c0c0b46;
        border-radius:20px;
        backdrop-filter: blur(20px);
        left: -30px;
        z-index: 2!important;
        position: absolute;
         display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        b{margin:5px; color:#fff;font: 300 14px Ubuntu,Arial;}
    }

}
    
</style>