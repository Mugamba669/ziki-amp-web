<template>
  <div class="queue">
    <center>Now Playing</center>
      <div class="conatiner">
          <p @click="this.$emit('queuePlay',list)" v-bind:key="list" v-for="list in queueList">
            <span>{{(list.name).replace(".mp3","")}}</span>
            <b class="material-icons mi-play-circle"></b>
          </p>
      </div>
          <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button>

  </div>
      
</template>

<script>
export default {
  name: "Queue",
  props: {
    queueList:Array,
  },
  methods: { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.queue {
  width: 100%;
  height: 100%;
  background: #07060648;
  border-radius: 7px;
   padding: 10px;
.conatiner {
    padding: 10px;
      width: 400px;
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      overflow-x: hidden;
      margin: 3px;
    p{
      width: 100%;
      // height: 50px;
      background:rgba($color: #948E8E, $alpha:0.4);
      padding: 6px;
      border-radius:5px;
      display: flex;
      cursor: pointer;
      margin:0.7px;
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
    p:hover{
        transform:scale(1.02,1.02);
        background:rgba($color: #CABCBC, $alpha:0.6);
     }
  }
  .conatiner::-webkit-scrollbar{
    appearance: none;
    background: #948E8E;
    width: 4px;
    border-radius:10px;
  }
   .conatiner::-webkit-scrollbar-thumb{
    appearance: none;
    background: #0E0808;
    width: 4px;
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
@media(max-width: 910px){
.queue {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #07060648;
.conatiner {
    padding: 10px;
      width: 300px;
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      overflow-x: hidden;
      margin: 3px;
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
