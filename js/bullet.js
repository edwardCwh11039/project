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

function Bullet(X, Y) {
  this.x = X;
  this.y = Y;
  this.imgnode = document.createElement("img");
  this.imgnode.src = "img/cartridge.png";
  this.width = 9;
  this.height = 21;
}
Bullet.prototype.draw = function () {
  context.drawImage(this.imgnode, this.x, this.y);
};
Bullet.prototype.move = function () {
  this.y -= 20;
};
Bullet.prototype.hitted = function () {
  this.crash = true;
};
