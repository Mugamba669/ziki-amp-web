<template>
<div class="container"> <center>Your WishList  ({{listTrack.length}}) songs</center>
   
    <div class="grid">
         
       <div @click="this.$emit('gridPlay',[a,index])" class="tile" v-for="(a,index) in listTrack" :key="index">
           <img :src="a.artwork"/>
           <button class="play">
               <b class="mi mi-play-arrow"></b>
           </button>
           <div class="data">
            <b>{{a.title}}</b>
            <b>{{a.artist}}</b>
          </div>
       </div>
    </div>
    <div :class="[(listTrack.length < -1 || listTrack.length < 10)?'active':'','loader']">
        <div class="progress"></div>
        <p>Please wait..</p>
    </div>
    <button class="btn" @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button>

</div>
    

</template>

<script>
export default {
    name:'GridView',
    props:{
        total:0,
        listTrack:Array
    },
    data() {
        return {
            showProgress:false,
        }
    },
    components:{},
    
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
@keyframes spin {
    0%{
        transform: rotate(0deg);
        filter: hue-rotate(0deg);
    }

     100%{
        transform: rotate(365deg);
        filter: hue-rotate(365deg);

    }
}
    .loader{
        position: absolute;
        width: 200px;
        height: 200px;
        background: #50484841;
        border: 1px solid rgba(56, 42, 42, 0.39);
        backdrop-filter: blur(20px);
        display: flex;
        flex-direction: column;
        visibility: hidden;
        top: -40%;
        align-items: center;
        transition:0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045);
        border-radius: 10px;
        z-index: 10!important;
        justify-content: center;
        .progress{
            width: 80px;
            height: 80px;
            border-radius:50%;
            animation: spin 0.8s infinite linear;
            border-top: 5px solid #b45c0a;
            border-bottom:5px solid #b68a10;
        }
       
    }
     .loader.active{
        visibility: visible;

            top: 100%;
        }
    .container{
        padding:0;
        margin: 20px!important;
        background:rgba(0, 0, 0, 0.082);
        display: flex;
        // position: absolute;
        flex-direction: column;
        align-items: center;
    center{
          position: fixed;
        top: 10px;
        z-index: 10!important;
        padding:14px;
        backdrop-filter: blur(20px);
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.801);
    }
         .btn {
             position: absolute;
            width: 50px;
            height: 50px;
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
      .play{
          position: absolute;
          width: 40px;
          height: 40px;
          top: 20px;
          border-radius:50%;
          border: 1px solid #3333;
          cursor: pointer;
          right: -40px;
          z-index: 10 !important;
          background: linear-gradient(30deg,#0705055e,#c7b9b991);
          backdrop-filter: blur(20px);
          transition:0.3s ease-in-out;
          b{color:#eee;}
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
            backdrop-filter: blur(20px);
            background: rgba(0, 0, 0, 0.678);
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
        &:hover{
            cursor: pointer;
        box-shadow: -20px 0px 0px -20px #ddd;
        }
        &:hover .play{

        right: 50px;
    
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