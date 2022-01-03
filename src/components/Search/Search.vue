<template lang="html">
    <div class="searchComp">
        <input type="search" @input="liveSearch" placeholder="Type artist, name, title" v-model="finder"/>
    </div>
</template>

<script>
export default {
    name:'Search',
    data(){
        return{
            finder:"",
        }
    },
    methods:{
        liveSearch(){
            this.$emit("live",this.finder);
        },
        mounted() {},
    }
}
</script>

<style lang="scss" scoped>
    .searchComp{
        display:flex;
        flex-direction: column;
        background:none;

        input{
            appearance:none;
            outline:none;
            border:none;
            width:300px;
            padding:10px;
            border-radius:10px;
            box-shadow: inset 0px 2px 2px 0px #ddd, 0px 2px 2px 0px #ddd;
            font: 100 15px Ubuntu,Arial;
            color:#fff;
            background:rgba($color: #030303F6, $alpha: 0.1);
            &::-webkit-input-placeholder{
                color:#ddd;
                font: 100 12px Arial;
            }
        }

    }
</style>