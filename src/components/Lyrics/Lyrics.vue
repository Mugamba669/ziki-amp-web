<template>
    <div class="container">
        <center ref="center">
            <pre>{{content== ""?"Please wait as we load your lyrics...":content}}</pre>
        </center>
        <button class="count" @click="increaseCount">+</button>
        <button class="dcount" @click="decreaseCount">-</button>
    <button class="close" @click="this.$emit('closeL')">&times;</button>

    </div>
</template>

<script>
export default {
    name:'Lyrics',
    props:{
        content:String
    },
    data() {
        return {
            monitor:0,
            count:0
        }
    },
     created() {
       const player = this.$store.getters.getPlayer;
       player.ontimeupdate = ()=>{
           let val = Math.floor((player.duration) * player.currenTime);
           console.log(val);
           this.$refs['center'].scroll({behavior:'smooth',top:val/40});
       }
   },
    methods:{
        increaseCount(){
            this.$store.commit('incrementCount',this.count+=1);
            this.monitor = this.$store.getters.getCount;
        },
         decreaseCount(){
            this.$store.commit('decreaseCount',this.count+=2);
             this.monitor = this.$store.getters.reduceCount;
        },
    },
   
  
}
</script>
<style lang="scss" scoped>
    .container{
        width: 400px!important;
        height: 500px!important;
        padding: 10px;
        box-shadow:inset 0px 0px 5px 0px #eee;
        background-color: rgba(20, 20, 20, 0.514);
        backdrop-filter: blur(30px);
        word-wrap: break-word;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content:center!important;
        align-items: center!important;
        // border: 0.3px solid #eeeeee67;
        center{
            margin: 5px;
        padding: 10px;

            width:inherit !important;
                height: inherit !important;
            overflow: scroll;
            overflow-x: hidden;
            &::-webkit-scrollbar{
                appearance: none;
                width: 10px;
                border-radius:10px;
                height: inherit !important;
                
                box-shadow:inset 0px 2px 5px 0px #ddd;
                
            }
            &::-webkit-scrollbar-thumb{
                width: 2px;
                // height: inherit !important;
                background:#eee;
                border-radius:10px;
            }
            &::-webkit-scrollbar-corner{
                appearance:none;
            }
            &::-webkit-scrollbar-button{
                appearance:none;
            }
            display: flex;
        flex-direction: column;
        justify-content:center!important;
        align-items: center!important;
            pre{
                        display: flex;
                flex-direction: column!important;
                justify-content:center!important;
                align-items: center!important;
                flex-wrap: nowrap;
                width: inherit!important;
                height: inherit !important;
                word-break: break-all;
                word-wrap: break-word;
                break-inside: auto!important;
                text-justify: inter-word!important;
                text-align: center !important;;
                margin-top: 40px;
                white-space:pre-wrap!important;
                padding:10px;
                color:#eee;
                font: 100 15px Arial!important;
                word-spacing:2px;

            }
        }
        .close{
            position: absolute;
            top: 0;
            right: 0;
            width: 35px;
            height: 35px;
            background: red;
            border-bottom-left-radius: 10px;
            border-top-right-radius: 10px;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 30px;
        }
         .count{
            position: absolute;
            bottom: 10px;
            right: 20px;
            width: 45px;
            // height: 35px;
            padding: 0px;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            background: rgb(109, 96, 96);
            border: none;
            color: white;
            cursor: pointer;
            font-size: 30px;
        }
          .dcount{
            position: absolute;
            bottom: 10px;
            left: 20px;
            width: 45px;
            // height: 35px;
            padding: 0px;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            background: rgb(109, 96, 96);
            border: none;
            color: white;
            cursor: pointer;
            font-size: 30px;
        }
    }
</style>