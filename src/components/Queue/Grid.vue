<template>
<div class="container">
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
        listTrack:Array
    },
    components:{},
    mounted(){}
}
</script>
<style lang="scss" scoped>
    .container{
        background:#000;
        width: 500px!important;
        height:400px!important;
        display: flex;
        position: absolute;
        flex-direction: column;
        align-items: center;
         button {
             position: absolute;
            width: 40px;
            height: 40px;
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
        display: grid !important;
        grid-template-columns:repeat(auto-fill,minmax(120px,5fr))!important;
        grid-gap: 15px 15px !important;
        grid-template-rows: auto!important;
        overflow-y: scroll!important;
               backdrop-filter: blur(20px);
        position: absolute;
        left: 50px;
        top:50px;
        width:100%;
        height:100%;
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
        background: linear-gradient(-180deg,rgba(0, 0, 0, 0.24),rgba(85, 85, 85, 0.11));
        display: flex;
        flex-direction:row!important;
        justify-content:space-between!important; 
        align-items: center!important;
        // margin: 10px;
        border-radius: 5px;
        height: 140px;
        overflow: hidden;
        // width:100%;
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