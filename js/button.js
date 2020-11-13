class button {
  constructor(X, Y, Width, Height) {
    this.x = X;
    this.y = Y;
    this.width = Width;
    this.height = Height;
    canvas.addEventListener(
      "click",
      function (e) {
        var mouseX = e.offsetX;
        var mouseY = e.offsetY;
        if (
          mouseX > this.x &&
          mouseX < this.x + this.width &&
          mouseY < this.y + this.height &&
          this.y > this.y
        ) {
          console.log("hi");
        }
      },
      false
    );
  }
}
