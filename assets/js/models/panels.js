function Panels (ctx) {
  this.ctx = ctx;
  
  this.x = points,this.ctx.canvas.width - 600;
  this.y = 30;

  this.img = new Image();
  this.img.src = "./assets/imgs/panel.png";
}

Panels.prototype.draw = function() {
this.ctx.drawImage(this.img, this.x, this.y, 400, 150);
this.ctx.font = "30px Georgia black";
    this.ctx.save();
    this.ctx.fillStyle = "#996633"
    this.ctx.fillText("Points: " + points, 100 , 140);
    this.ctx.restore();
    
}