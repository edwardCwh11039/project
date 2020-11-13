class enemy {
  constructor(hp, X, Y, sizeX, sizeY, boomimage, imagesrc) {
    this.x = X;
    this.y = Y;

    this.width = sizeX;
    this.height = sizeY;

    this.crashImg = boomimage;
    this.imagenode = null;

    this.crash = false;
    this.life = hp;

    this.imgnode = document.createElement("img");
    this.imgnode.src = imagesrc;
    this.time = 0;
  }
  draw() {
    context.drawImage(this.imgnode, this.x, this.y);
  }
  move() {
    this.y += 2;
  }
  checkHit(object) {
    return (
      object.y + object.height > this.y &&
      object.x + object.width > this.x &&
      object.y < this.y + this.height &&
      object.x < this.x + this.width
    );
  }
  hitted(object) {
    this.life--;
    if (this.life == 0) {
      this.crash = true;
    }
  }
}

function createEnemies() {
  var num = Math.random();
  if (num < 0.1) {
    enemies.push(
      new enemy(
        1,
        Math.floor(Math.random() * (canvas.getBoundingClientRect().width - 57)),
        -51,
        57,
        51,
        "img/new/plain1_die1.png",
        "img/new/plain1.png"
      )
    );
  }
}

function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}
function EnemiesMove() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].move();
  }
}
function hitEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].checkHit(ply)) {
      enemies[i].hitted();
      ply.hitted();
    }
    for (var j = 0; j < bullets.length; j++) {
      if (enemies[i].checkHit(bullets[j])) {
        enemies[i].hitted();
        bullets[j].hitted();
        ply.score+=10;
      }
    }
  }
}
function removeEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    if (
      enemies[i].y > canvas.getBoundingClientRect().height ||
      enemies[i].crash
    ) {
      enemies.splice(i, 1);
    }
  }
}
