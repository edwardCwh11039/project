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

var background = new Background();
var loading = new Loading();

//backgorund constructor
function Background() {
  this.img = new Image();
  this.img.src = "img/bg.jpg";
  this.width = 480;
  this.height = 852;

  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = -this.height;

  //render the background
  this.paint = function () {
    context.drawImage(this.img, this.x1, this.y1);
    context.drawImage(this.img, this.x2, this.y2);
  };

  //move the background.
  this.move = function () {
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

//loading constructor and function
//loading animation
function Loading() {
  this.imgs = [];
  this.imgs[0] = new Image();
  this.imgs[0].src = "img/new/loading1.png";
  this.imgs[1] = new Image();
  this.imgs[1].src = "img/new/loading2.png";
  this.imgs[2] = new Image();
  this.imgs[2].src = "img/loading.png";

  this.length = this.imgs.length;
  this.width = 480;
  this.height = 38;

  this.startIndex = 0;

  this.paint = function () {
    context.drawImage(this.imgs[this.startIndex], 150, HEIGHT - this.height);
  };

  this.step = function () {
    if (this.startIndex < this.length) {
      this.startIndex++;
    }
    if (this.startIndex == this.length) {
      state = RUNNING;
    }
  };
}

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
    } else if (state == RUNNING) {
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
  background.paint();
  background.move();

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
    var text = "Pause";
    context.fillText(
      text,
      WIDTH / 2 - context.measureText(text).width / 2,
      HEIGHT / 2
    );
  } else if (state == GAMEOVER) {
    ply.draw();
    drawEnemies();
    showInfo();
    context.font = "bold 50px Stylus";
    context.fillText("Game Over", 110, 300);
  }
}, 100);
