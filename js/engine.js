var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//game state type
var START = 0;
var STARTING = 1;
var RUNNING = 2;
var PAUSE = 3;
var GAMEOVER = 4;

//declare current game state && window width,height
var state = START;
var WIDTH = 480;
var HEIGHT = 640;

//setup background as a image componet and declare the source
var bg = new Image();
bg.src = "img/bg.jpg";

//declare the background size
var BG = {
  imgs: bg,
  width: 480,
  height: 852,
};

//backgorund class
function Bg(config) {
  this.imgs = config.imgs;
  this.width = config.width;
  this.height = config.height;

  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = -this.height;

  //render the background
  this.paint = function () {
    context.drawImage(this.imgs, this.x1, this.y1);
    context.drawImage(this.imgs, this.x2, this.y2);
  };

  //move the background.
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
    if (state == PAUSE) {
      state = RUNNING;
    } else {
      state = PAUSE;
    }
  }
}

function init() {
  loading.paint();
  loading.step();
  ply = new Plane(
    3,
    20,
    20,
    98,
    122,
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
    if (
      mousex + ply.width / 2 < canvas.getBoundingClientRect().width &&
      mousex >= ply.width / 2
    ) {
      ply.x = mousex - ply.width / 2;
    }
    if (
      mousey + ply.height / 2 < canvas.getBoundingClientRect().height &&
      mousey >= ply.height / 2
    ) {
      ply.y = mousey - ply.height / 2;
    }
  };
  canvas.onmousedown = handleMouseDown;

  ply.draw();
  ply.shoot();

  drawBullets();
  BulletsMove();
  removeBullet();

  createEnemies(ply);
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
    ply.draw();
    drawBullets();
    drawEnemies();
    showInfo();
    context.font = "bold 50px Stylus";
    context.fillText("Paused", 110, 300);
  } else if (state == GAMEOVER) {
    ply.draw();
    drawEnemies();
    showInfo();
    context.font = "bold 50px Stylus";
    context.fillText("Game Over", 110, 300);
  }
}, 100);
