/**
 * @2021 Mugamba Bruno
 * This library introduces audio visualization by converting audio signals into
 * animated-2d graphics with the help of WebAudioApi and Canvas Api
 */
// const $ = require('jquery');
export class Visualizer {
  analyser: AnalyserNode
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  bufferLength: any
  freqDomain: Uint8Array
  /**
   *
   * @param {AnalyserNode } analyser
   * @param { HTMLCanvasElement } canvas
   * @param { CanvasRenderingContext2D } context
   *
   */
  constructor(
    analyser: AnalyserNode,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.analyser = analyser
    this.canvas = canvas
    this.context = context

    this.bufferLength = this.analyser.frequencyBinCount
    this.freqDomain = new Uint8Array(this.bufferLength)
    // setup = true;
  }
  // bufferLength
  /**
   *
   * @param {Number} cancel
   */
  barsVisualiser(cancel: number) {
    const renderCanvas = () => {
      const anime = window.requestAnimationFrame(renderCanvas)
      this.analyser.getByteFrequencyData(this.freqDomain)

      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }
      /**
       *Lets start by clearing the canvas
       */
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // set visual Color:
      this.context.fillStyle = '#FDDD74'
      /**
       * draw visual bars
       */
      for (let index = 0; index < this.bufferLength; index++) {
        const value = this.freqDomain[index] / 300
        const barX = index * 3 //This works on bar spacing
        const barWidth = 2 //This handles the barWidth
        const height = this.canvas.height * value
        const barHeight = this.canvas.height - height - 1
        /**
         * Now lets draw the bars basing on the array length
         * following this format CanvasRect.fillRect(x: number, y: number, w: number, h: number): void
         *              */
        this.context.fillRect(barX, barHeight, barWidth, height)
      }
      return anime
    }

    const anime = renderCanvas()

    cancel == 1 ? window.cancelAnimationFrame(anime) : null
  }

  /**
   * This method outputs the dirty particles visualiser.
   * @param {Number} cancel
   */
  dustyParticles(cancel: number) {
    const renderDusty = () => {
      const close = window.requestAnimationFrame(renderDusty)
      // this.analyser.getByteTimeDomainData(this.freqDomain)
      this.analyser.getByteFrequencyData(this.freqDomain)
      /**
       * Canvas props
       */
      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }
      /**
       *Lets start by clearing the canvas
       */
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // set visual Color:
      this.context.fillStyle = '#66D9EE'
      /**
       * draw visual bars
       */
      for (let index = 0; index < this.bufferLength; index++) {
        const value = this.freqDomain[index] / 200
        const barX = index * 3 //This works on bar spacing
        const height = this.canvas.height * value
        const barHeight = this.canvas.height - height - 1
        /**
         * Now lets draw the bars basing on the array length
         * following this format CanvasRect.fillRect(x: number, y: number, w: number, h: number): void
         *              */
        this.context.fillRect(barX, barHeight, 4, 4)
      }
      return close
    }
    const closeAnime = renderDusty()
    cancel == 1 ? cancelAnimationFrame(closeAnime) : null
  }
  sineWaveVisualiser() {
    const renderSineWave = () => {
      window.requestAnimationFrame(renderSineWave)

      this.analyser.getByteTimeDomainData(this.freqDomain)

      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }
      /**
       *Lets start by clearing the canvas
       */
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      /**
       * draw visual bars
       */
      const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength
      const start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
      this.context.lineWidth = 2.9
      this.context.strokeStyle = '#60EEE7'
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.beginPath()
      let x = 0
      for (let index = 0; index < this.bufferLength; index++) {
        const v = this.freqDomain[index] / 125.0
        const y = (v * this.canvas.height) / 2

        if (index === 0) {
          this.context.moveTo(x, y)
        } else {
          this.context.lineTo(x, y)
        }

        x = index * sliceWidth //frequencyBins/analyser.sampleRate;
      }
      this.context.lineTo(
        this.canvas.width,
        ((this.freqDomain[0] / 128.0) * this.canvas.height) / 2
      )
      this.context.stroke()
    }
    renderSineWave()
  }

  histogramVisualiser() {
    const barHistogram = () => {
      window.requestAnimationFrame(barHistogram)

      this.analyser.getByteFrequencyData(this.freqDomain)

      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      for (let i = 0; i < this.bufferLength; i++) {
        const barWidth = i * 6
        const barX = 30
        const percent = this.freqDomain[i] / 400
        const height = this.canvas.height * percent
        const barHeight = this.canvas.height - height - 1
        this.context.fillStyle = '#FC78C9'
        this.context.fillRect(barWidth, barHeight, barX, height)
      }
    }
    barHistogram()
  }

  rippleWaveVisualiser() {
    const rippleWaves = () => {
      window.requestAnimationFrame(rippleWaves)
      this.analyser.getByteFrequencyData(this.freqDomain)
      const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength

      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }
      // ripple circle
      let radius = this.canvas.height < this.canvas.width ? this.canvas.height : this.canvas.width
      radius = (radius * 0.65) / 3
      const WIDTH = this.canvas.width / 2 // default 700
      const HEIGHT = this.canvas.height / 2 // default 300
      const start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
      this.context.lineWidth = 1.6
      this.context.strokeStyle = '#FFC964'
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.beginPath()
      let x = 0
      for (let i = start; i < 20; i++) {
        const v = this.freqDomain[i] / 880.0
        let y = (v * this.canvas.height) / 20
        if (i === 0) {
          this.context.arc(WIDTH, HEIGHT, (x *= i) / (y * i), 0, Math.PI * 2, false)
        } else {
          this.context.arc(WIDTH, HEIGHT, (y /= i) / (x * i), 0, Math.PI * 2, false)
        }
        this.context.arc(WIDTH, HEIGHT, y / i / (x * i), 0, Math.PI * 2, false)
        this.context.arc(WIDTH, HEIGHT, ++i / (x * i), 0, Math.PI * 2, false)
        this.context.arc(WIDTH, HEIGHT, (y * i) / (x * y * i), 0, Math.PI * 2, false)
        this.context.arc(WIDTH, HEIGHT, radius / i / ((x / i) * y), 0, Math.PI * 2, false)
        this.context.arc(WIDTH, HEIGHT, (y * i) / ((x / radius) * i), 0, Math.PI * 2, false)

        x = i * sliceWidth //frequencyBins/analyser.sampleRate;
      }
      this.context.stroke()
      this.context.closePath()
    }
    rippleWaves()
  }

  /**
   *
   * @param {*}
   * This method renders the spiral visualiser
   *
   */
  spiralVisualiser(selector: any) {
    const spiralVisual = () => {
      window.requestAnimationFrame(spiralVisual)
      // var freqDomain = new Uint8Array(this.bufferLength);
      this.analyser.getByteFrequencyData(this.freqDomain)

      const visuals = document.querySelectorAll(selector)
      // creating spiral visualizer
      visuals.forEach((elem) => {
        elem.setAttribute('width', window.innerWidth)
        elem.setAttribute('height', window.innerHeight / 2)
        window.onresize = () => {
          elem.setAttribute('width', window.innerWidth)
          elem.setAttribute('height', window.innerHeight / 2)
        }

        const WIDTH = elem.width
        const HEIGHT = elem.height
        const context = elem.getContext('2d')
        //    console.log(context)
        context.clearRect(0, 0, WIDTH, HEIGHT)

        context.fillStyle = '#FFB28F'
        for (let index = 0; index < WIDTH; index++) {
          const barX = index * 3
          const barWidth = 2
          const element = this.freqDomain[index] / 220
          const offset = HEIGHT * element
          const height = HEIGHT - offset - 1
          context.fillRect(barX, height, barWidth, offset)
        }
      })
    }
    spiralVisual()
  }
  /**
   * This method illustrates glass pills visualisation
   */
  glassTilesVisualiser() {
    const glassPills = () => {
      window.requestAnimationFrame(glassPills)
      this.analyser.getByteFrequencyData(this.freqDomain)

      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }
      /**
       *
       * @returns Update canvas on resize
       */

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.strokeStyle = '#85EE8A'
      for (let i = 0; i < this.bufferLength / 3; i++) {
        const barWidth = i * 12
        const barX = 7.5
        const percent = this.freqDomain[i] / 327
        const height = this.canvas.height * percent
        const barHeight = this.canvas.height - height - 1
        this.context.strokeRect(barWidth, barHeight, barX, height)
      }
    }
    glassPills()
  }

  floatingBars() {
    const floatingPills = () => {
      window.requestAnimationFrame(floatingPills)
      this.analyser.getByteFrequencyData(this.freqDomain)

      this.canvas.setAttribute('width', window.innerWidth.toString())
      this.canvas.setAttribute('height', window.innerHeight.toString())
      window.onresize = () => {
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
      }
      /**
       *
       * @returns Update canvas on resize
       */
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.strokeStyle = '#99C437'
      for (let i = 0; i < this.bufferLength / 3; i++) {
        this.context.strokeRect(100 + i * 4, 200 + 256 - this.freqDomain[i] * 4, 3, 100)
      }
    }
    floatingPills()
  }
  /**
   * This method renders a stretched image on the canvas
   */
  colorstetchVisualiser() {
    const w = window.innerWidth
    const h = window.innerHeight

    let rtick = 0
    let gtick = 0
    let btick = 0
    let buffer1: HTMLCanvasElement
    let buffer2: HTMLCanvasElement
    // const setup = false

    /**
     *
     * @returns responsible for updating the canvas image
     */
    const update = () => {
      try {
        window.requestAnimationFrame(update)
        /**
         * Canvas props
         */
        this.canvas.setAttribute('width', window.innerWidth.toString())
        this.canvas.setAttribute('height', window.innerHeight.toString())
        window.onresize = () => {
          this.canvas.setAttribute('width', window.innerWidth.toString())
          this.canvas.setAttribute('height', window.innerHeight.toString())
        }
        this.analyser.getByteFrequencyData(this.freqDomain)

        // if(!setup) return;

        if (!buffer1) {
          buffer1 = document.createElement('canvas') as HTMLCanvasElement
          buffer1.setAttribute('width', `${w}`)
          buffer1.setAttribute('height', `${h}`)
          buffer2 = document.createElement('canvas') as HTMLCanvasElement

          buffer2.setAttribute('width', `${w}`)
          buffer1.setAttribute('height', `${h}`)
        }
        //    console.log(this.canvas)
        window.onresize = () => {
          buffer1.setAttribute('width', `${w}`)
          buffer1.setAttribute('height', `${h}`)

          /**responsive for buffer 2 */
          buffer2.setAttribute('width', `${w}`)
          buffer1.setAttribute('height', `${h}`)
        }
        const bctx1 = buffer1.getContext('2d') as CanvasRenderingContext2D
        const bctx2 = buffer2.getContext('2d') as CanvasRenderingContext2D

        //copy buffer1 to buffer2
        bctx2.drawImage(buffer1, 0, 0)

        //draw music into buffer 2
        rtick = (rtick + 1) % 10
        gtick = (gtick + 2) % 200
        btick = (btick + 3) % 90

        bctx2.strokeStyle = 'rgba(' + rtick + ',' + gtick + ',' + btick + ')'
        bctx2.beginPath()

        const s = (this.freqDomain.length / 2) * 4
        console.log(s)

        const l = w / 2 - s / 2
        const t = h / 2 - 256 / 2
        bctx2.moveTo(l, t + 128 - this.freqDomain[0] + 100)

        for (let i = 0; i < this.freqDomain.length / 2; i++) {
          bctx2.lineTo(l + i * 4, t + 128 - this.freqDomain[i] + 10)
        }

        for (let i = this.freqDomain.length / 2 - 1; i >= 0; i--) {
          const max = this.freqDomain.length / 2 - 1
          bctx2.lineTo(l + (max - i) * 4, t + 128 - this.freqDomain[i] + 100)
        }
        bctx2.stroke()

        //copy buffer2 to buffer1, stretched
        //draw more onto buffer
        bctx1.drawImage(buffer2, 0, 0, w, h, -5, -5, w + 10, h + 10)
        //draw buffer1 back to screen
        this.context.drawImage(buffer1, 0, 0)
      } catch (e) {
        console.log(e)
      }
    }
    update()
  }
}
