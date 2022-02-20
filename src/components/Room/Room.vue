<template>
    <div class="container">
        <div class="presets">
            <select ref="choose" @change="getRoomPreset" >
                <option value="">Choose Preset</option>
                <option value="auditorium">Auditorium</option>
                <option value="scene">Scene</option>
                <option value="smallroom">Small Room</option>
                <option value="great">Great Hall</option>
                <option value="echo">Echo</option>
            </select>

            <div>
                <button @click="this.$emit('closeRoom')">Close</button>
            </div>
        </div>
         <div class="nodes">
        <Tuner
        v-for="(delay,index) in delays"
        :key="index"
        :tune="replay[index]"
        :delay="delay"
        />


         <Feedback
        v-for="(feed,index) in feedback"
        :key="feed"
        :valueTune="power[index]"
        :feedback="feed"
        />
    </div>
    </div>
   
</template>

<script>
import Tuner from "./Tuner.vue";
import Feedback from "./Feedback.vue";
import { Rooms } from "../../Core/Presets"
export default {
    name:"Room",
    components:{
        Tuner,
        Feedback
    },
    props:{
        delays:Array,
        feedback:Array
    },
    data(){
        return{
            power:[0,0],
            replay:[0,0]
        }
    },
    methods:{
        getRoomPreset(){
            // console.log()
            switch(this.$refs['choose'].value){
                case 'echo':
                    this.power = Rooms.Echo.feedback;
                    this.replay = Rooms.Echo.delay;
                    break;
                 case 'scene':
                    this.power = Rooms.Scene.feedback;
                    this.replay = Rooms.Scene.delay;
                    break;
                 case 'auditorium':
                    this.power = Rooms.Audit.feedback;
                    this.replay = Rooms.Audit.delay;
                    break;
                 case 'great':
                    this.power = Rooms.GtH.feedback;
                    this.replay = Rooms.GtH.delay;
                    break;
              case 'smallroom':
                    this.power = Rooms.Sm.feedback;
                    this.replay = Rooms.Sm.delay;
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        display:flex;
        flex-direction:row;
        justify-content: baseline;
        align-items: center;
        height:400px;
        z-index: 9!important;
        backdrop-filter: blur(100px);
        background: #1b1a1a70;
        padding: 15px;
        width: 630px;border-radius: 10px;
        border: 3px solid #dddd;
        .presets{
            display:flex;
            flex-direction: column;
            justify-content:center;
            align-content: center;
            align-items: center;
            width: 50%;
            margin: 10px;
            select{
                width:100px;
                padding: 6px;
                margin: 10px;
                font: 200 16px Arial;
                background: #eeeeee4b;
                border:none;
                border-radius:10px;
                outline:none;
            }
        }
        .nodes{
            width: 100%;
            transform:rotate(-90deg);
            display:flex;
            flex-direction:column;
            justify-content: space-between;
            height: 100px;

        }
    }
</style>