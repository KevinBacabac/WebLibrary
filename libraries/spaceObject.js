class SpaceObject {
  basicDraw(colour) {
    const cx = this.rect.centerx();
    const cy = this.rect.centery();

    ctx.strokeStyle = colour;
    ctx.lineWidth = this.LINE_WIDTH;
    ctx.beginPath();

    ctx.moveTo(this.pointList[0].x + cx, this.pointList[0].y + cy);
    for (var point of this.pointList) {
      ctx.lineTo(point.x + cx, point.y + cy);
    }

    ctx.closePath();
    ctx.stroke();
  }

  move(dTime) {
    this.dx = Math.min(this.dx, this.SPEED);
    this.dx = Math.max(this.dx, -this.SPEED);

    this.dy = Math.min(this.dy, this.SPEED);
    this.dy = Math.max(this.dy, -this.SPEED);

    this.rect.x += this.dx * dTime;
    this.rect.y += this.dy * dTime;
  }
}
