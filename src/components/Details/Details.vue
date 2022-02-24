<template>
    <div class="container">
            <p class="title">{{(title).replace(".mp3","")}}</p>
            <!-- <div class="more"> -->
                <marquee direction="left" behavior="slow"  class="more">
                    {{artist}}
                    <span>|</span>
                    {{album}}
                    <span>|</span>
                    {{(Number(size).toFixed(2))+" MB"}}
                </marquee>
            <!-- </div> -->
            <!-- <marquee behavior="slow" direction="alternate"></marquee> loop='3'-->
    </div>
</template>

<script>
import * as mi from "material-icons"
export default {
    name: 'Details',
    props: {
        title:{
            type:String,
            default:"Track title"
        },
        artist:{
            type:String,
            default:"Artist"
        },
        album:{
            type:String,
            default:"Album"
        },
        size:{
            type:Number,
            default:0
            },
    },
}
</script>

<style lang="scss" scoped>
 .container{
        display:flex;
        margin: 10px;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .title{
            width:300px;
            text-align:center;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font:100 32px Ubuntu,Arial;
        }
        .more{
            margin: 4px;
            width: 300px;
        }
        
    }
@media(max-width:810px){
     .container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .title{
            width:300px;
            text-align:center;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font:100 17px Ubuntu,Arial;
        }
        
    }
}
   @media(max-width:480px){
        .container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin: 0;
        padding: 0;
        .title{
            width:300px;
            text-align:center;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        p{
            font:300 17px Ubuntu;
            span{
            font-size: 20px;
           }
        }
        
    }
   }
</style>