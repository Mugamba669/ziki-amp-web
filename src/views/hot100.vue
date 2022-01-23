<template>
    <div class="hot100">
      hot 100
      <!-- <div class="container">
         <div class="stream" v-bind:key="stream" v-for="stream in streams">
            <img :src="stream.url" :alt="stream.title">
        </div>
      </div>
         -->
    </div>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
import MediaLibrary from "media-library";
export default {
  name: 'Hot100',
  components:{
    
  },
  data() {
    return{
        siteUrl:"https://www.nowviba.com/music/pages/top100.php",
        streams:[]
    }
  },
  methods:{
    
    },
    mounted(){
        /** axios.defaults.baseURL = 'http://myurl';
  axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; */
  
     axios({
       method:"get",
       baseURL:this.siteUrl,
       responseType:"application/json;charset=utf-8",
       headers:{
         
       }
     }).then((response)=>{
       console.log(response.data);
     })
    console.log("nternet")

   

  }
}
</script>

<style lang="scss" scoped>
    .hot100{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      .container{
        width:600px;
        height:500px;
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(150px,0fr));
        grid-gap: 5px 5px;
        grid-template-rows: auto;
        .stream{
          width: 100%;
          object-fit: contain;
          height: auto;
        }
       }
    }
</style>