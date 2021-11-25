<template>
    <div class="container">
            <p class="title">{{(title).replace(".mp3","")}}</p>
            <!-- <div class="more"> -->
                <div class="more">
                    {{artist}}
                    <span>|</span>
                    {{album}}
                    <span>|</span>
                    {{(Number(size).toFixed(2))+" MB"}}
                </div>
            <!-- </div> -->
    </div>
</template>

<script>
import * as mi from "material-icons"
export default {
    name: 'Details',
    props: {
        title:String,
        artist:String,
        album:String,
        size:Number,
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
        }
        .more{
            margin: 4px;
        }
        p{
            font:300 17px Ubuntu;
            margin:0;
            span{
            font-size: 20px;
           }
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