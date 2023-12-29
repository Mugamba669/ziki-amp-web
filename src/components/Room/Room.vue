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
                <option value="reset">No preset</option>
            </select>

            <div>
                <button @click="this.$emit('closeRoom')">Close</button>
            </div>
        </div>
         <div class="nodes">
        <Tuner
        v-for="(delay,index) in delays"
        :key="index"
        :tune="d[index]"
        :delay="index"
        />


         <Feedback
        v-for="(feed,index) in feedback"
        :key="feed"
        :valueTune="f[index]"
        :feedback="index"
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
        f:[0,0],
        d:[0,0]
    }
},
    methods:{
        /*
         * 
         * replay  Array<Number>
        */
        manuplateFeedBack(replay,tuner){
            this.f = tuner;
                for (let index = 0; index < replay.length; index++) {
                     replay[index].gain.value = tuner[index];
                    
                }
        },
        manuplateDelay(delay,tuner){
            this.d = tuner;
              for (let index = 0; index < delay.length; index++) {
                     delay[index].delayTime.value = tuner[index];
                }
        },
        getRoomPreset(){
            // console.log()
            switch(this.$refs['choose'].value){
                case 'echo':
                    this.manuplateFeedBack(this.$store.getters.getFeedback, Rooms.Echo.feedback);
                    this.manuplateDelay(this.$store.getters.getDelays, Rooms.Echo.delay);
                    break;
                 case 'scene':
                    this.manuplateFeedBack(this.$store.getters.getFeedback, Rooms.Scene.feedback);
                    this.manuplateDelay(this.$store.getters.getDelays, Rooms.Scene.delay);
                    break;
                 case 'auditorium':
                    this.manuplateFeedBack(this.$store.getters.getFeedback, Rooms.Audit.feedback);
                    this.manuplateDelay(this.$store.getters.getDelays, Rooms.Audit.delay);
                    break;
                 case 'great':
                   this.manuplateFeedBack(this.$store.getters.getFeedback, Rooms.GtH.feedback);
                    this.manuplateDelay(this.$store.getters.getDelays, Rooms.GtH.delay);
                    break;
              case 'smallroom':
                   this.manuplateFeedBack(this.$store.getters.getFeedback, Rooms.Sm.feedback);
                    this.manuplateDelay(this.$store.getters.getDelays, Rooms.Sm.delay);
                    break;

            case 'reset':
                this.manuplateFeedBack(this.$store.getters.getFeedback, Rooms.Preset.feedback);
                    this.manuplateDelay(this.$store.getters.getDelays, Rooms.Preset.delay);
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