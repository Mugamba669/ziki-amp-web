const { Visualizer } = require("./Visualizer");
class Equalizer extends Visualizer{
    /**
     * 
     * @param {HTMLAudioElement} audio 
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     */
    constructor(audio,canvas,context){

        this.audio = audio;
        this.canvas = canvas;
        this.context = context;
        this.audioCtx = new AudioContext();
        this.analyser = new AnalyserNode(this.audioCtx,{maxDecibels:-10,minDecibels:-80,smoothingTimeConstant:0.8});
        super(this.analyser,canvas,context)
       
        this.source = new MediaElementAudioSourceNode(this.audioCtx,{mediaElement:this.audio});
        this.splitter = new ChannelSplitterNode(this.audioCtx,{numberOfOutputs:2});
        this.merger = new ChannelMergerNode(this.audioCtx,{numberOfInputs:2});

        this.delays = [
            new DelayNode(this.audioCtx,{delayTime:0}),
            new DelayNode(this.audioCtx,{delayTime:0}),
            // new DelayNode(this.audioCtx,{delayTime:0}),
        ];

        this.feedback = [
            new GainNode(this.audioCtx,{gain:0}),
            new GainNode(this.audioCtx,{gain:0}),
            // new GainNode(this.audioCtx,{gain:0}),
        ];
        /**
         * 
| Type    | Fc       |    Q | Gain     |
|:--------|:---------|:-----|:---------|
| Peaking | 31 Hz    | 1.41 | -11.9 dB |
| Peaking | 62 Hz    | 1.41 | -4.7 dB  |
| Peaking | 125 Hz   | 1.41 | -4.1 dB  |
| Peaking | 250 Hz   | 1.41 | -1.1 dB  |
| Peaking | 500 Hz   | 1.41 | 2.4 dB   |
| Peaking | 1000 Hz  | 1.41 | 2.3 dB   |
| Peaking | 2000 Hz  | 1.41 | 2.0 dB   |
| Peaking | 4000 Hz  | 1.41 | -3.7 dB  |
| Peaking | 8000 Hz  | 1.41 | 4.8 dB   |
| Peaking | 16000 Hz | 1.41 | -11.1 dB |
         */
        this.bands = [
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:25,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:50,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:85,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:150,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:250,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:500,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:1000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:2000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:4000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:8000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:16000,gain:0}),
        ];

        this.connects = ()=>{
            let size = this.bands.length;
            this.source.connect(this.bands[0]);
            for( let i = 0 ; i < size; i++){
                if(i <  (this.bands.length-1)){
                     this.bands[i].connect(this.bands[i+1]);
                }

            }
            // this.bands[1].connect(this.bands[2]);
            // this.bands[2].connect(this.bands[3]);
            // this.bands[3].connect(this.bands[4]);
            // this.bands[4].connect(this.bands[5]);
            // this.bands[5].connect(this.bands[6]);
            // this.bands[6].connect(this.bands[7]);
            // this.bands[7].connect(this.bands[8]);
            // this.bands[8].connect(this.bands[9]);
            // this.bands[9].connect(this.bands[10]);
            this.bands[size-1].connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);
            this.audioCtx.resume();
            this.roomEffect();

        }
        this.roomEffect = ()=> {
             //** Connect room effect */

             this.source.connect(this.splitter);
             this.splitter.connect(this.delays[0],0);
             this.delays[0].connect(this.feedback[0]);
             this.feedback[0].gain.value = 0;
             this.delays[0].delayTime.value = 0;
 
             this.splitter.connect(this.delays[1],1);
             this.delays[1].connect(this.feedback[1]);
             this.feedback[1].gain.value = 0;
             this.delays[1].delayTime.value = 0;
 
             this.feedback[1].connect(this.merger,0,0);
             this.feedback[1].connect(this.merger,0,1);
 
             this.merger.connect(this.audioCtx.destination);
        }
    }
   
    /**
     * Sample methods
     */
    startEq(){
        this.audio.onplaying = _=> this.connects();
        // this.audio.onplaying = _=> this.roomEffect();
    }
    /***
     * @returns { Array<BiquadFilterNode>}
     */
   
    getBands(){
        return this.bands;
    }
/**
 * 
 * @returns { Array<DelayNode>}
 */
    getDelayBands(){
        return this.delays;
    }
    /**
     * @return { Array<GainNode>}
    */
   getFeedBack(){
        return this.feedback;
   }
}

module.exports = {
    Equalizer
}