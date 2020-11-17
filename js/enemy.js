function enemy(hp, X, Y, sizeX, sizeY, Score, boomimage, imagesrc) {
  this.x = X;
  this.y = Y;

  this.width = sizeX;
  this.height = sizeY;

  this.crashImg = boomimage;
  this.imagenode = null;

  this.crash = false;
  this.life = hp;

  this.score = Score;

  this.imgnode = document.createElement("img");
  this.imgnode.src = imagesrc;

  this.draw = function () {
    context.drawImage(this.imgnode, this.x, this.y);
  };
  this.move = function () {
    this.y += 2;
  };
  this.checkHit = function (object) {
    return (
      object.y + object.height > this.y &&
      object.x + object.width > this.x &&
      object.y < this.y + this.height &&
      object.x < this.x + this.width
    );
  };
  this.hitted = function () {
    this.life--;
    if (this.life == 0) {
      this.imgnode.src = this.crashImg;
      this.crash = true;
    }
  };
}

function createEnemies() {
  var i = Math.floor(Math.random() * 100);
  switch (i) {
    case 1:
      enemies.push(
        new enemy(
          1,
          Math.floor(
            Math.random() * (canvas.getBoundingClientRect().width - 49)
          ),
          -51,
          49,
          35,
          10,
          "img/new/plain1_die1.png",
          "img/new/plain1.png"
        )
      );
      break;
    case 50:
      enemies.push(
        new enemy(
          2,
          Math.floor(
            Math.random() * (canvas.getBoundingClientRect().width - 69)
          ),
          -51,
          69,
          88,
          20,
          "img/new/plain2_die1.png",
          "img/new/plain2.png"
        )
      );
      break;
    case 99:
      enemies.push(
        new enemy(
          3,
          Math.floor(
            Math.random() * (canvas.getBoundingClientRect().width - 165)
          ),
          -51,
          165,
          250,
          30,
          "img/new/plain2_die1.png",
          "img/new/plain2.png"
        )
      );
      break;
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
        ply.score += enemies[i].score;
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
      console.log(enemies.length);
      enemies.splice(i, 1);
    }
  }
}
