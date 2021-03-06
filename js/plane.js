function Plane(hp, X, Y, sizeX, sizeY, score, boomimage, imagesrc) {
  this.x = X;
  this.y = Y;

  this.width = sizeX;
  this.height = sizeY;

  this.planscore = score;

  this.planboomimage = boomimage;
  this.imagenode = null;

  this.life = hp;

  this.imgnode = document.createElement("img");
  this.imgnode.src = imagesrc;
  this.time = 0;

  this.score = 0;

  this.draw = function () {
    context.drawImage(this.imgnode, this.x, this.y);
  };
  this.hitted = function () {
    this.life--;
    if (this.life <= 0) {
      this.imgnode.src = this.planboomimage;
      state = GAMEOVER;
    }
  };
  this.shoot = function () {
    this.time++;
    if (this.time % 4 == 0) {
      bullets.push(
        new Bullet(this.x + this.width / 2, this.y + this.height / 2)
      );
    }
  };
}
