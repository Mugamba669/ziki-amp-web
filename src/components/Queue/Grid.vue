<template>
<div class="container"> <center>Your WishList ({{listTrack.length}}) songs</center>
    <div class="grid">
         
       <div @click="this.$emit('gridPlay',[a,index])" class="tile" v-for="(a,index) in listTrack" :key="index">
           <img :src="a.artwork"/>
           <div class="data">
            <b>{{a.title}}</b>
            <b>{{a.artist}}</b>
          </div>
       </div>
    </div>
    <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button>

</div>
    

</template>

<script>
export default {
    name:'GridView',
    props:{
        total:0,
        listTrack:Array
    },
    components:{},
    mounted(){}
}
</script>
<style lang="scss" scoped>
    .container{
        padding:0;
        margin: 20px!important;
        background:#000;
        // width: 500px!important;
        // height:500px!important;
        display: flex;
        // position: absolute;
        flex-direction: column;
        align-items: center;
    center{
          position: fixed;
        top: 10px;
        z-index: 10!important;
        padding:14px;
        border-radius: 5px;
        background: #000;
    }
         button {
             position: absolute;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 1px solid #3333;
            background: #dddd;
            bottom:30px;
            left: 100px;
            // right: 0px;
            transform: scale(1,1);
            cursor: pointer;
            transition:0.3s ease-in-out;
            &:hover{
         transform: scale(1.1,1.1);
       }
      }
      
  
    .grid{
        margin: 20px!important;
        display: grid !important;
        grid-template-columns:repeat(auto-fill,minmax(150px,5fr))!important;
        grid-gap: 15px 15px !important;
        grid-template-rows: auto!important;
        overflow-y: scroll!important;
               backdrop-filter: blur(20px);
        position: absolute;
        // left: 20px;
        // right: 20px;
        top:10px;
        width:100%;
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
        // width:100%;
         &:hover{
              box-shadow: -5px 0px 0px -5px #ddd;
            background: linear-gradient(-180deg,rgba(0, 0, 0, 0.719),rgba(85, 85, 85, 0.603));
          }
        .data{
            padding: 0;
            margin: 5px;
            height:50px;
            z-index: 15!important;
            backdrop-filter: blur(0px);
            background: #000;
            position:absolute;
            display: flex;
            border-radius: 4px;
            flex-direction: column;
            margin-top: 80px;
            justify-content: space-evenly!important;
            transform:scale(1,1);
            transition:0.3s ease-in-out;
            b{
                width: 120px;
                white-space: nowrap;
                overflow: hidden;
                padding: 0;
                text-overflow: ellipsis;
               
            }
          
        }
        
        // height:100%;
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
         &:hover img{
                transform: scale(1.1,1.1);
               box-shadow:0px 0px 0px 0px #eee,0px 0px 0px 0px #eee;
            }
             &:hover .data{
                transform: scale(1.05,1.05);
            //    box-shadow:0px 0px 0px 0px #eee,0px 0px 0px 0px #eee;
            }
      
      }
      
    }
      }
</style>