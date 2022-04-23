<template>
  <div class="queue">
    <center>Your WishList </center>
      <div ref='scrolls' class="conatiner">
         
          <p @click="this.$emit('queuePlay',[list,index])"  v-bind:key="index" v-for="(list,index) in queueList">
             <!-- <b class="material-icons mi-dehaze"></b> -->
              <!-- <img :src="list.artwork" class="cover"/> --:class="[list.data.active == true?'active':''
            -- <b class="material-icons mi-music-note"></b> {{(list.data.name).replace(".mp3","")}} -->
            <span>{{list.title}}</span>
            <b class="material-icons mi-play-circle"></b> 
            <!-- <b class="material-icons mi-more-vert"></b> -->
          </p>
      </div>
          <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button>
         

  </div>
      
</template>

<script>
import GridView from "@/components/Queue/Grid.vue";
export default {
  name: "Queue",
  components:{
    GridView,
  },
  props: {
    queueList:Array,
  },mounted(){
    // this.$refs['scrolls'].scrollTo = 16;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.queue {
  width: 100%;
  height: 100%;
  background: #07060648;
  backdrop-filter: blur(90px);
  border-radius: 7px;
   padding: 10px;
   .cover{
     width:40px;
     height: 40px;
     border-radius:10px;
     box-shadow: -3px -2px 1px 0px #eee;
   }
.conatiner {
    padding: 10px;
      width: 400px;
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content:flex-start;
      position: relative;
      align-items: center;
      overflow-x: hidden;
      // overflow-y: scroll;
      margin: 3px;
    p{
      width: 390px;
      line-height: -20px;
      // box-shadow: -4px -0px 0px 0px #eeee;
      background:rgba($color: #948E8E, $alpha:0.4);
      padding: 4px;
      border-radius:5px;
      
      display: flex;
      cursor: pointer;
      margin:5px;
      flex-direction:row;
      transition:0.3s ease-in-out;
      transform:scale(1,1);
      justify-content: space-around!important;
      align-items: center;
     
     span{
        width: 300px;
        text-align: left;
        font:300 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    p.active {
       transform:scale(1.02,1.02);
        background:rgba($color: #CABCBC, $alpha:0.6);
    }
    p:hover{
       box-shadow: -4px 0px 0px 0px #eeee,
                   4px 0px 0px 0px #eeee;
                          // transform:scale(1.01,1.01);
        background:rgba($color: #CABCBC, $alpha:0.3);
     }
  }
  .conatiner::-webkit-scrollbar{
    appearance: none;
    background: #948e8e00;
    // width: px;
    // height:5px;
    border-radius:10px;
  }
   .conatiner::-webkit-scrollbar-thumb{
    appearance: none;
    border-radius:10px;
    // margin: 10px;
    backdrop-filter: blur(90px);
    // box-shadow: 0px -2px 0px 0px #dddd;
    background:#f8f5f554;
      width: 4px;
      //  height:px;
  }
      button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #3333;
        background: #dddd;
        transform: scale(1,1);
        cursor: pointer;
        transition:0.3s ease-in-out;
      }
       button:hover{
         transform: scale(1.1,1.1);
       }
    }

@media(max-width:480px){
  .queue {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #07060648;
.conatiner {
     padding: 6px;
      width: 200px;
      height: 170px;
      display: flex;
      flex-direction: column;
      justify-content:flex-start;
      align-items: center;
      // overflow-x: hidden;
      margin: 3px;
    p{
      width: 100%;
      height: 30px;
      background:rgba($color: #948E8E, $alpha:0.4);
      padding: 4px;
      border-radius:5px;
      display: flex;
      cursor: pointer;
      margin:1px;
      flex-direction:row;
      justify-content: space-evenly!important;
      align-items: center;
     
     span{
        width: 300px;
        text-align: left;
        font:300 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
      p.active {
       transform:scale(1.02,1.02);
        background:rgba($color: #CABCBC, $alpha:0.6);
    }
    p:hover{
        background:rgba($color: #CABCBC, $alpha:0.6);
     }
  }
  .conatiner::-webkit-scrollbar{
    appearance: none;
    background: #05050500;
    width: 2px;
  }
      button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #3333;
        background: #dddd;
        transform: scale(1,1);
        cursor: pointer;
        transition:0.3s ease-in-out;
      }
       button:hover{
         transform: scale(1.1,1.1);
       }
    }
}

@media(max-width: 906px){
.queue {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #07060648;
.conatiner {
    // padding: 10px;
      width: 230px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      overflow-x: hidden;
      margin: 10px;
    p{
      width: 100%;
      height: 50px;
      background:rgba($color: #948E8E, $alpha:0.4);
      padding: 6px;
      border-radius:5px;
      display: flex;
      cursor: pointer;
      margin:1px;
      flex-direction:row;
      justify-content: space-evenly!important;
      align-items: center;
     
     span{
        width: 300px;
        text-align: left;
        font:300 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
      p.active {
       transform:scale(1.02,1.02);
        background:rgba($color: #CABCBC, $alpha:0.6);
    }
    p:hover{
        background:rgba($color: #CABCBC, $alpha:0.6);
     }
  }
  .conatiner::-webkit-scrollbar{
    appearance: none;
    background: #948E8E;
    width: 2px;
  }
      button {
        width: 40px;
        height: 40px;
        float: right;
        border-radius: 50%;
        border: 1px solid #3333;
        background: #dddd;
        transform: scale(1,1);
        cursor: pointer;
        transition:0.3s ease-in-out;
      }
       button:hover{
         transform: scale(1.1,1.1);
       }
    }
}
</style>
