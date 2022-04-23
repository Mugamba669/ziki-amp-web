<template lang="html">

    <div class="container">
       <div class="search">
           <input type="search" name="" v-model="songQuery"/>
           <button class="se">Search</button>

        <!-- <button @click="this.$emit('triggerResize')" class="resize">resize</button> -->
        <button @click="this.$emit('closeHot')" class="close">&times;</button>

           <!-- <p>Hot 100 hits</p> -->

       </div>
       <div class="body">
          <div v-for="(song,index) in songs" :key="index" class="tile">
              <img :src="song.artWork" alt="" srcset="">
          <p>
              {{song.title}}<br/>
             <b> {{song.artist}}</b>
          </p>
        <button class="play" @click="playStream(song.url)">
               <b class="mi mi-play-arrow"></b>
           </button>
          </div>
       </div>
    </div>
</template>
<script>
const { readFileSync } = window.require("fs");

export default {
    name:'Hot100',
    data() {
        return {
            songQuery:"",
            songs:[]
        }
    },
    methods:{
        playStream(audio){
            this.$store.commit('playStream',audio);
        }
    },
      created(){
           this.songs = (JSON.parse(readFileSync("/home/blabs/Desktop/vue/ziki-amp-web/stream.json")));
        }
}
</script>
<style lang="scss" scoped>
    .container{
        width: 1000px;
        height: 600px;
        background: #6b666663;
        box-shadow:inset 0px 0px 10px 0px #eee;
        backdrop-filter: blur(20px);
        border-radius:10px;
            // position: absolute
        .search{
            width: inherit !important;
            height: 100px;
            display: flex;
            flex-direction: row !important;
            justify-content: center;
            padding: 10px;
            .resize{
                  width: 70px;
                height: 40px;
                border: 0.5px solid #eeeeee77;
                background:rgba(145, 139, 139, 0.61);
                cursor: pointer;
                color:#fff;
                transition: 0.3s ease-in-out;
                position: absolute;
                right: 50px;
                top: 0;
                // border-top-right-radius: 10px;
                // border-bottom-left-radius: 10px;
                font-size:18px;
                transform:scale(1);
                &:hover{
                    transform:scale(1.03,1.03);
                    
                }
            }
            .close{
                  width: 50px;
                height: 40px;
                border: 0.5px solid #eeeeee77;
                background:rgba(255, 0, 0, 0.61);
                cursor: pointer;
                color:#fff;
                transition: 0.3s ease-in-out;
                position: absolute;
                right: 0;
                top: 0;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                font-size:30px;
                transform:scale(1);
                &:hover{
                    transform:scale(1.03,1.03);
                    
                }
            }
            .se{
                width: 100px;
                height: 40px;
                border: 0.5px solid #eeeeee77;
                background:none;
                cursor: pointer;
                color:#fff;
                transition: 0.3s ease-in-out;
                &:hover{
                    border: 2px solid #eeeeee;
                }
            }
            input{
                width: 300px;
                background: none;
                border: none;
                border-bottom: 1px solid rgba(238, 238, 238, 0.377);
                outline:none;
                color:#eee;
                transition: 0.3s ease-in-out;
                font:200 16px Arial;
                &:hover{
                border-bottom: 2px solid #eeee;
                }
            }
        }
        .body{
              margin: 20px!important;
        display: grid !important;
        grid-template-columns:repeat(auto-fill,minmax(150px,5fr))!important;
        grid-gap: 15px 15px !important;
        grid-template-rows: auto!important;
        overflow-y: scroll!important;
               backdrop-filter: blur(20px);
        position: absolute;
        top:10px;
        width:95%;
        height:90%;
          &::-webkit-scrollbar{
            appearance:none;
            width:10px;
        }
        &::-webkit-scrollbar-thumb{
            appearance:none;
            background:#656572;
            border-radius:20px;
        }
        .play{
          position: absolute;
          width: 40px;
          height: 40px;
          top: -40px;
          border-radius:50%;
          border: 1px solid #3333;
          cursor: pointer;
          right: 40px;
          z-index: 10 !important;
          background: linear-gradient(30deg,#0705055e,#c7b9b991);
          backdrop-filter: blur(20px);
          transition:0.3s ease-in-out;
          b{color:#eee;}
      }
        .tile{
             background: linear-gradient(-180deg,rgba(0, 0, 0, 0.445),rgba(12, 4, 4, 0));
        display: flex;
        flex-direction:row!important;
        justify-content:space-between!important; 
        align-items: center!important;
         transform:scale(1,1);
         transition:0.3s ease-in-out;
        // margin: 10px;
        border-radius: 5px;
        height: 140px;
         
        // box-shadow: 0px 0px 0px #ddd;
        overflow: hidden;
         &:hover img{
                transform: scale(1.1,1.1);
               box-shadow:0px 0px 0px 0px #eee,0px 0px 0px 0px #eee;
            }
              &:hover .play{
                    top: 50px;
    
        }
        }
         img{
             box-shadow: -5px 0px 0px -5px #ddd;
            // box-shadow:0px 0px 0px 0px #eee,0px 0px 0px 0px #eee;
            object-fit:cover;
            width:100%;
            z-index: -1;
            height:100%;
            transform:scale(1,1);
            transition:0.3s ease-in-out;
           
        }
        p{
            position: absolute;
            backdrop-filter: blur(20px);
            padding:10px;
            background: #2222227a;
            border-radius:10px;
            font: 200 12px Arial;
            white-space: nowrap;
            overflow: hidden;
            width: 140px;
            text-overflow: ellipsis;
            bottom: 0;
        }
     
        }
    }
     
</style>