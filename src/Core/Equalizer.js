class Equalizer{
    /**
     * 
     * @param {HTMLAudioElement} audio 
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     */
         constructor(audio){

        this.audio = audio;
        this.audioCtx = new AudioContext();
        this.analyser = new AnalyserNode(this.audioCtx,{maxDecibels:-15,minDecibels:-75,smoothingTimeConstant:0.8});
        // super(this.analyser,canvas,context)
       
        this.source = new MediaElementAudioSourceNode(this.audioCtx,{mediaElement:this.audio});

        this.merger = this.audioCtx.createChannelMerger(2);
        this.splitter = this.audioCtx.createChannelSplitter(2);
        this.delays = [
            new DelayNode(this.audioCtx,{delayTime:0}),
            new DelayNode(this.audioCtx,{delayTime:0}),
        ];

        this.feedback = [
            new GainNode(this.audioCtx,{gain:0}),
            new GainNode(this.audioCtx,{gain:0}),
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
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:55,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:80,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:150,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:250,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:400,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:1000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:2000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:8000,gain:0}),
            new BiquadFilterNode(this.audioCtx,{type:'peaking',frequency:16000,gain:0}),
        ];
        // base nknob
        this.bass = new BiquadFilterNode(this.audioCtx, {type:'lowpass',frequency:80,gain:0});
        this.bassBooster = new GainNode(this.audioCtx,{gain:0});
        /**
         * Stereo band boost
         */
        this.treble = new BiquadFilterNode(this.audioCtx,{type:'highpass',frequency:3000,gain:0});
        this.trebleBooster = new GainNode(this.audioCtx,{gain:0});
            /**
             * Room effects
             */
             this.roomEffect = ()=> {
                /** Connect room effect */
                this.source.connect(this.splitter);
                this.splitter.connect(this.delays[0],0);
                this.delays[0].connect(this.feedback[0]);
                this.feedback[0].connect(this.delays[1]);

                this.splitter.connect(this.delays[1],1);
                this.delays[1].connect(this.feedback[1]);
                this.feedback[1].connect(this.delays[0]);
    
                this.feedback[0].connect(this.merger,0,0);
                this.feedback[1].connect(this.merger,0,1);
    
                this.merger.connect(this.audioCtx.destination);
           }
    /******************************************************* */
        this.connects = ()=>{
            let size = this.bands.length;
            this.source.connect(this.bands[0]);
            for( let i = 0 ; i < size; i++){
                if(i < (this.bands.length-1)){
                     this.bands[i].connect(this.bands[i+1]);
                }
            }
            /* solved on 22nd jan 2022 */
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
            //**bass connections */
            this.source.connect(this.bass);
            this.bass.connect(this.bassBooster)
            this.bassBooster.connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);

             //**treble connections */
             this.source.connect(this.treble);
             this.treble.connect(this.trebleBooster)
             this.trebleBooster.connect(this.analyser);
             this.analyser.connect(this.audioCtx.destination);
             
            this.roomEffect();
            this.audioCtx.resume();
        }
    }
   
    /**
     * Sample methods
     */
    startEq () {this.audio.onplaying = _=> this.connects()};
    
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
   /**
    * Get bass knob control
    */
   getBass(){
       return this.bassBooster;
   }
   getTreble(){
       return this.trebleBooster;
   }
}

module.exports = {
    Equalizer
}