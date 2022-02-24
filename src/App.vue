<template>

  <router-view></router-view>
  <!-- <b>Footer here</b> -->
</template>
<script>
export default {
  data(){
    return{
      steps:[
        {
          target:'#view',
          content:"Content description"
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'Ubuntu';
  src: url("./writing/Ubuntu-Medium.ttf");
}
* {
  font-family:Ubuntu Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
