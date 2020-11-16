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

var bg = new Image();
bg.src = "img/bg.jpg";

var BG = {
  imgs: bg,
  width: 480,
  height: 852,
};

function Bg(config) {
  this.imgs = config.imgs;
  this.width = config.width;
  this.height = config.height;

  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = -this.height;

  this.paint = function () {
    context.drawImage(this.imgs, this.x1, this.y1);
  };

  this.step = function () {
    this.y1++;
    this.y2++;

    if (this.y1 == this.height) {
      this.y1 = -this.height;
    }
    if (this.y2 == this.height) {
      this.y2 = -this.height;
    }
  };
}

var sky = new Bg(BG);

//animation for loading state
var loadings = [];
loadings[0] = new Image();
loadings[0].src = "img/new/loading1.png";
loadings[1] = new Image();
loadings[1].src = "img/new/loading2.png";
loadings[2] = new Image();
loadings[2].src = "img/loading.png";
var LOADINGS = {
  imgs: loadings,
  length: loadings.length,
  width: 480,
  height: 38,
};

function Loading(config) {
  this.imgs = config.imgs;
  this.length = config.length;
  this.width = config.width;
  this.height = config.height;

  this.startIndex = 0;
  this.paint = function () {
    context.drawImage(this.imgs[this.startIndex], 150, HEIGHT - this.height);
  };

  this.time = 0;
  this.step = function () {
    this.time++;
    if (this.time % 3 == 0) {
      this.startIndex++;
    }

    if (this.startIndex == this.length) {
      state = RUNNING;
    }
  };
}
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
function handleMouseDown(e) {
  var mousex = e.offsetX;
  var mousey = e.offsetY;
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
  canvas.onmousedown = handleMouseDown;

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
    ply.draw();
    drawEnemies();
    showInfo();
    context.font = "bold 50px Stylus";
    context.fillText("Game Over", 110, 300);
  }
}, 100);
