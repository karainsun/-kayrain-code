export default class VerificationCode {
  constructor(options) {
    this.options = {
      id: "", //容器ID
      canvasId: "", // canvas的ID
      width: "80",
      height: "30",
      code: "",
    };

    if (Object.prototype.toString.call(options) === "[object Object]") {
      for (const i in options) {
        this.options[i] = options[i];
      }
    } else {
      this.options.id = options;
    }
    this._init();
  }
  // 初始化
  _init() {
    const canvas = document.getElementById(this.options.canvasId);

    canvas.id = this.options.canvasId;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "<span style='color: red'>你的浏览器不支持canvas</span>";
    canvas.onclick = () => {
      this.refreshCode();
    };
  }
  // 生成验证码
  refreshCode() {
    const canvas = document.getElementById(this.options.canvasId);
    let ctx = null,
      arr = "0,1,2,3,4,5,6,7,8,9".split(",").concat(this.letters()); // 数字和大小写字母的数组
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
    } else {
      return false;
    }
    ctx.textBaseline = "middle"; // 文字上下居中
    ctx.fillStyle = this.randomColor(180, 240); // 背景填充色随机
    ctx.fillRect(0, 0, this.options.width, this.options.height); // 填充背景

    for (let i = 0; i <= 4; i++) {
      let t = arr[this.randomNum(0, arr.length)]; // 随机字符
      this.options.code += t; // 生成五个随机字符
      ctx.font =
        this.randomNum(this.options.height / 2, this.options.height) +
        "px SimHei";
      ctx.fillStyle = this.randomColor(50, 160); // 字体颜色
      ctx.shadowOffsetX = this.randomNum(-3, 3); // 左右阴影偏移
      ctx.shadowOffsetY = this.randomNum(-3, 3); // 上下阴影偏移
      ctx.shadowBlur = this.randomNum(-3, 3); // 阴影模糊级别
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; // 阴影颜色
      let x = (this.options.width / 5) * i;
      let y = this.options.height / 2;
      ctx.translate(x, y);
      ctx.fillText(t, 0, 0);
      ctx.translate(-x, -y);
    }
  }
  // 校验
  check(code) {
    return code.toLowerCase() === this.options.code.toLowerCase();
  }
  // 大小写字母
  letters() {
    let big = [],
      small = [];
    for (let i = 65; i < 91; i++) {
      big.push(String.fromCharCode(i));
    }
    for (let i = 97; i < 123; i++) {
      small.push(String.fromCharCode(i));
    }
    return small.concat(big);
  }
  // 随机数
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // 随机颜色
  randomColor(min, max) {
    let r = this.randomNum(min, max),
      g = this.randomNum(min, max),
      b = this.randomNum(min, max);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
