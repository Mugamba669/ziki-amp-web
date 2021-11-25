import Visualizer from "./Visualizer";


export default class Equalizer extends Visualizer{
    /**
     * 
     * @param {HTMLAudioElement} audio 
     * @param {HTMLCanvasElement} canvas
     */
    constructor(audio,canvas){
        this.canvas = canvas;
        this.audio = audio;
        this.audioCtx = new AudioContext();
        this.analyser = new AnalyserNode(this.audioCtx,{maxDecibels:-10,minDecibels:-80,smoothingTimeConstant:0.8});
        this.source = new MediaElementAudioSourceNode(this.audioCtx,{mediaElement:this.audio});
        super(this.analyser,this.canvas);

        /**
         * | Type    | Fc       |    Q | Gain     |
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
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:31,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:62,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:125,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:250,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:500,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:1000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:2000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:4000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:8000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:16000,gain:0}),
        ];

        this.connects = ()=>{
            this.source.connect(this.bands[0]);
            this.bands[0].connect(this.bands[1]);
            this.bands[1].connect(this.bands[2]);
            this.bands[2].connect(this.bands[3]);
            this.bands[3].connect(this.bands[4]);
            this.bands[4].connect(this.bands[5]);
            this.bands[5].connect(this.bands[6]);
            this.bands[6].connect(this.bands[7]);
            this.bands[7].connect(this.bands[8]);
            this.bands[8].connect(this.bands[9]);
            this.bands[9].connect(this.analyser)
            this.analyser.connect(this.audioCtx.destination);
            this.audioCtx.resume();

        }
    }
    /**
     * Sample methods
     */
    startEq(){
        this.audio.onplaying = _=> this.connects();
        
    }
    /***
     * @returns { Array<BiquadFilterNode>}
     */
    getBands(){
        return this.bands;
    }
}