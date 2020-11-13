var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var START = 0;
var STARTING = 1;
var RUNNING = 2;
var PAUSE = 3;
var GAMEOVER = 4;

var state = START;
var WIDTH = 480;
var HEIGHT = 640;

// 1 游戏开始前
// 1.1 加载背景图片
// 1.1.1 背景图片的对象
var bg = new Image(); // 创建一个背景图片
bg.src = "img/bg.jpg";
// 1.1.2 背景图片的数据
var BG = {
  imgs: bg,
  width: 480,
  height: 852,
};

// 1.1.3 背景图片的构造函数
function Bg(config) {
  this.imgs = config.imgs;
  this.width = config.width;
  this.height = config.height;

  // 绘制图片的坐标（两张背景图片进行轮流滑动）
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = -this.height;
  // 背景图片绘制
  this.paint = function () {
    context.drawImage(this.imgs, this.x1, this.y1);
    context.drawImage(this.imgs, this.x2, this.y2);
  };
  // 图片的运动
  this.step = function () {
    this.y1++;
    this.y2++;
    // 判断图片的临界点
    if (this.y1 == this.height) {
      this.y1 = -this.height;
    }
    if (this.y2 == this.height) {
      this.y2 = -this.height;
    }
  };
}
// 1.1.4创建对象
var sky = new Bg(BG);

//animation for loading state
var loadings = [];
loadings[0] = new Image();
loadings[0].src = "img/new/loading1.png";
loadings[1] = new Image();
loadings[1].src = "img/new/loading2.png";
loadings[2] = new Image();
loadings[2].src = "img/loading.png";
// 2.2 开始前加载的动画图片的数据
var LOADINGS = {
  imgs: loadings,
  length: loadings.length,
  width: 480,
  height: 38,
};
// 2.3 开始前动画的构造函数
function Loading(config) {
  this.imgs = config.imgs;
  this.length = config.length;
  this.width = config.width;
  this.height = config.height;
  // 定义一个索引
  this.startIndex = 0;
  // 绘制
  this.paint = function () {
    context.drawImage(this.imgs[this.startIndex], 150, HEIGHT - this.height);
  };

  // 定义一个速度
  this.time = 0;
  this.step = function () {
    this.time++;
    if (this.time % 3 == 0) {
      // 页面加载时下面小飞机运行的速度
      this.startIndex++;
    }

    // 当动画运行完成进入下一个阶段
    if (this.startIndex == this.length) {
      state = RUNNING;
    }
  };
}
// 2.4创建对象
var loading = new Loading(LOADINGS);

canvas.onclick = function () {
  if (state == START) {
    state = STARTING;
  }
};

function showInfo() {
  context.font = "bold 20px Stylus";
  context.fillText("Score: " + ply.score, 10, 30);
  context.fillText("LIFE:" + ply.life, 280, 30);
}

function pause(e) {
  if (e.keyCode == 27) {
    state = PAUSE;
  }
}

function init() {
  loading.paint();
  loading.step();
  ply = new Plane(
    3,
    20,
    20,
    66,
    80,
    0,
    "img/new/me_die1.png",
    "img/new/me.png"
  );
  bullets = [];
  enemies = [];

  window.addEventListener("keydown", pause, true);
}
function handleMouseDown(e){
  var mousex = e.offsetX;
  var mousey = e.offsetY;
  if()
}

function playGame() {
  canvas.onmousemove = function (e) {
    var mousex = e.offsetX;
    var mousey = e.offsetY;
    if (mousex + ply.width < canvas.getBoundingClientRect().width) {
      ply.x = mousex - ply.width / 2;
    }
    if (mousex + ply.width < canvas.getBoundingClientRect().width) {
      ply.y = mousey - ply.height / 2;
    }
    console.log("hi");
  };
  canvas.onmousedown= handleMouseDown;

  ply.draw();
  ply.shoot();

  drawBullets();
  BulletsMove();
  removeBullet();

  createEnemies();
  drawEnemies();
  EnemiesMove();
  hitEnemies();
  removeEnemies();

  showInfo();
}

// 定时器加载，使图片缓慢往下面移动
setInterval(function () {
  sky.paint();
  sky.step();
  if (state == START) {
    context.font = "bold 20px Stylus";
    context.fillText("Aircraft War", 180, 50);
    context.font = "italic 15px Stylus";
    context.fillText("simple click on the screen to start", 130, 450);
  } else if (state == STARTING) {
    init();
  } else if (state == RUNNING) {
    context.globalAlpha = 1;
    playGame();
  } else if (state == PAUSE) {
    pauseBtn = new button(50, 50, 200, 100);
    context.fillStyle = "blue";
    context.globalAlpha = 0.5;
    context.fillRect(pauseBtn.x, pauseBtn.y, pauseBtn.width, pauseBtn.height);
  } else if (state == GAMEOVER) {
    console.log("lose");
    ply.draw();
    drawEnemies();
    showInfo();
    context.font = "bold 50px Stylus";
    context.fillText("Game Over", 110, 300);
  }
}, 100);
