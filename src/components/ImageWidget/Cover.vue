<template>
<div class="image">
     <div class="container">
        <img :src="source" alt="coverArt" srcset="">
    </div>
</div>
   
</template>

<script>
export default {
    name: 'Cover',
  props:{
      source:String,
  }
}
</script>

<style lang="scss" scoped>
 @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform:rotate(359deg);
        }
    }
.image{
        margin: 15px;
        display:flex;
        flex-direction:column;
        justify-content:center!important;
        align-items:center!important;
    .container {
        width:350px;
        height:350px;
        img{ 
          width:100%;
          position: relative;
          border-radius: 50%;
          animation: spin 15s infinite linear;
           box-shadow: 0px -2px 3px 2px gray;
           object-fit:contain!important;
        }
   }
}
@media(max-width:910px){
   
    .image{
        margin: 15px;
       display:flex;
        flex-direction:column;
        justify-content:center!important;
        align-items:center!important;
    .container {
        width:200px;
        height:200px;
        animation: spin 15s infinite linear;
        img{ 
          width:100%;
          height:100%;
          border-radius: 50%;
           box-shadow: 0px -2px 3px 2px gray;
           object-fit:contain!important;
        }
   }
}
}

</style>