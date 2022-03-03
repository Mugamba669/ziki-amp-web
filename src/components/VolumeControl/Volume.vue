<template>
<!-- <div class="panel"> -->
    <div class="volume">
    <!-- <button @click="this.$emit('closeVol')"> <b class="material-icons mi-close"></b> </button> -->

       <label for="">Volume
             <span class="val">
            {{Math.floor(Number(volume)*100)}} %
            </span> --
           </label> 
       <v-slider
  hint="Im a hint"
  max="50"
  min="-50"
></v-slider>
        <input type="range" @input="adjustVolume" max="1" min="0" step="0.01" v-model="volume"/>
        
    </div>
<!-- </div> -->
    
</template>

<script>

import { mapActions } from 'vuex';
export default {
    name: 'Volume',
    data(){
        return{
            volume:this.$store.getters.getVolume,
        }
    },
     methods:{
       adjustVolume(){
           this.$store.commit('setVolume',this.volume);
       }
     },
    
}
</script>

<style lang="scss" scoped>
       
        .volume{
             width:300px;
             height:100px;
             padding:10px;
             background: #5555554D;
             backdrop-filter: blur(20px);
             border: 1px solid #ddd;
             border-radius:10px;

            z-index: 8;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content:center;
            button{
                position:absolute;
                top:10px;
                right:10px;
                width:40px;
                border: 1px solid #eee;
                color: #fff;
                height:40px;
                border-radius:50%;
                background:#3631316B;
                transform: scale(1,1);
                transition:0.3s ease-in-out;
                cursor:pointer;
                &:hover{
                    transform: scale(1.04,1.04);
                }
            }
                label{
                    font:400 18px Ubuntu,Arial;
                    margin:15px;
                    span{
                        margin:10px;
                    }
                }
            input{
                appearance:none;
                height:4px;
                background:#C09917;
                border-radius: 6px;
                width:80%;
                margin:15px;
                transform: scale(1,1);
                transition:0.3s ease-in-out;
                &::-webkit-slider-thumb{
                    appearance:none;
                    cursor: pointer;
                    height:20px;
                    background:#C09917;
                    border-radius: 50%;
                    width:20px;
                }
            }
            // input:hover{
            //     transform: scale(1.04,1.04);
            // }
        }
    
</style>