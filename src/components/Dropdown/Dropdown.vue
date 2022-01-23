<template lang="html">
    <div class="dropdown">
        <select ref="select" @change="makeChoice">
            <option>Select your visual</option>
            <option value="1">Bottom Bars</option>
            <option value="2">Dusty Particles</option>
            <option value="3">Histogram visual</option>
            <option value="4">Sine wave visual</option>
            <option value="5">Ripple Tank Visual</option>
            <option value="6">Glass Pills Visual</option>
            <option value="7">Floating Bars</option>
            <option value="8">Color-Stretch Bars</option>

        </select>
    </div>
</template>

<script>
export default {
    name:"Dropdown",
    methods:{
        makeChoice(){
            this.$emit("choice",this.$refs["select"].value);
        }
        },
}
</script>
<style lang="scss">
    .dropdown{
        width: 100%;
        select{
            width:100%;
            padding:10px;
            font:200 17px Ubuntu,Arial;
            border:none;
            border-radius:10px;
            background:#eeeeee3b;
            outline:none;
            cursor:pointer;
            option{
                appearance:none;
                background:#eeeeee3b;
            }
        }
    }
</style>