<template>
    <div class="container">
       <button class="btn" @click="this.$emit('shuffleTrack')"><b class="mi mi-shuffle"></b></button>
       <button class="btn" @click="this.$emit('prevTrack')" ><b class="mi mi-fast-rewind"></b></button>
       <button class="play" v-show="phide" @click="this.$emit('playtrack')"><b class="mi mi-play-arrow"></b></button>
       <button  class="pause" v-show="pshow"  @click="this.$emit('pausetrack')"><b class="mi mi-pause"></b></button>
       <button class="btn" @click="this.$emit('seektrack')"><b class="mi mi-fast-forward"></b></button>
       <button class="btn" @click="this.$emit('looptrack')"><b class="mi mi-repeat"></b></button>
    </div>
</template>

<script>
export default {
    name: 'Control',
    props: {
        pshow:Boolean,
        phide:Boolean,
        togglebtn:String
    }
}
</script>

<style lang="scss" scoped>
    .container {
        display:flex;
        flex-direction:row;
        padding:10px;
        align-items:center;
        margin: 10px;
        justify-content: center;

        button{
            display:block;
            margin: 5px;
            cursor: pointer;
            }
            .btn{
                border-radius: 50%;
                width: 40px;
                height: 40px;
                border: 1px solid #444;
                transition: 0.3s ease-in-out;
                  transform: scale(1,1);
                &:hover{
                      transform: scale(1.05,1.05);
                }
            }
            .play,.pause{
                width:60px;
                height:60px;
                border-radius:50%;
                font-size:42px;
                line-height:20px;
                transition: 0.3s ease-in-out;
                  transform: scale(1,1);
                border: 1px solid #444;
                cursor: pointer;
                  &:hover{
                      transform: scale(1.05,1.05);
                }
            }
        }

</style>