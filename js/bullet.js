class Bullet {
  constructor(X, Y, sizeX, sizeY, imageSrc) {
    this.x = X - sizeX;
    this.y = Y - sizeY;
    this.imgnode = null;
    this.bulletattac = 1;

    this.width = sizeX;
    this.height = sizeY;

    this.imgnode = document.createElement("img");
    this.imgnode.src = imageSrc;

    this.crash = false;
  }

  draw() {
    context.drawImage(this.imgnode, this.x, this.y);
  }
  move() {
    this.y -= 20;
  }
  hitted() {
    this.crash = true;
  }
}
function drawBullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
}

function BulletsMove() {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move();
  }
}

function removeBullet() {
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].y < -bullets[i].height || bullets[i].crash) {
      bullets.splice(i, 1);
    }
  }
}
