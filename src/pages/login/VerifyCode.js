class VerifyCode {
  constructor (options) {
    this.code = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]
    // this.code = [
    //   '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    //   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    //   'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    //   'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    //   'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    //   'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    //   'Y', 'Z'
    // ]

    this.verifyCodeLenth = 4
    this.verifyCode = ''
    this.options = options
    this.init()
    this.refresh()
  }

  init () {
    let canvasWrapper = document.getElementById(this.options.wrapperId)
    let canvas = document.createElement('canvas')
    this.options.width = canvasWrapper.offsetWidth > 0 ? canvasWrapper.offsetWidth : '100'
    this.options.height = canvasWrapper.offsetHeight > 0 ? canvasWrapper.offsetHeight : '30'
    canvas.id = 'verifyCodeCanvas'
    canvas.width = this.options.width
    canvas.height = this.options.height
    canvas.style.cursor = 'pointer'
    canvas.innerHTML = '您的浏览器版本不支持canvas'
    canvasWrapper.appendChild(canvas)
    let parent = this
    canvas.onclick = () => {
      parent.refresh()
    }
  }

  /**
   * 生成验证码
   */
  refresh () {
    this.verifyCode = ''
    let canvas = document.getElementById('verifyCodeCanvas')
    let ctx
    if (canvas.getContext) {
      ctx = canvas.getContext('2d')
    } else {
      return
    }
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.randomColor(180, 240)
    ctx.fillStyle = 'rgba(61,104,195,0.5)'
    ctx.fillRect(0, 0, this.options.width, this.options.height)
    for (let i = 1; i <= this.verifyCodeLenth; i++) {
      let txt = this.code[this.randomNum(0, this.code.length)]
      this.verifyCode += txt
      // 随机生成字体大小
      ctx.font = this.randomNum(this.options.height / 1, this.options.height) + 'px SimHei'
      // 随机生成字体颜色
      ctx.fillStyle = this.randomColor(100, 255)
      ctx.shadowOffsetX = this.randomNum(-3, 3)
      ctx.shadowOffsetY = this.randomNum(-3, 3)
      ctx.shadowBlur = this.randomNum(-3, 3)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      let x = this.options.width / (this.verifyCodeLenth + 1) * i
      let y = this.options.height / 2
      let deg = this.randomNum(-30, 30)
      // 设置旋转角度和坐标原点
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复旋转角度和坐标原点
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    }
    // 绘制干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(40, 180)
      ctx.beginPath()
      ctx.moveTo(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height))
      ctx.lineTo(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height))
      ctx.stroke()
    }
    // 绘制干扰点
    for (let i = 0; i < this.options.width / 4; i++) {
      ctx.fillStyle = this.randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  /**
   * 验证验证码
   * @param code
   * @returns {boolean}
   */
  validate (code) {
    let lowerCode = code.toLowerCase()
    let verifyLowerCode = this.verifyCode.toLowerCase()
    if (verifyLowerCode === lowerCode) {
      return true
    } else {
      this.refresh()
      return false
    }
  }

  /**
   * 生成一个随机色
   */
  randomColor (min, max) {
    let r = this.randomNum(min, max)
    let g = this.randomNum(min, max)
    let b = this.randomNum(min, max)
    return `rgb(${r},${g},${b})`
  }

  /**
   * 生成一个随机数
   */
  randomNum (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
}

export default VerifyCode
