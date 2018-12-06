function LifeBar (ctx) {
  this.ctx = ctx;

  this.x = 500;
  this.y = 60;

  this.w = 300;
  this.h = 50;


}

LifeBar.prototype.draw = function() {
  this.ctx.save();

  this.ctx.fillStyle = "green";
  this.ctx.fillRect(this.x, this.y, this.w, this.h);
  this.ctx.strokeStyle = "#FF0000"
  this.ctx.restore();
  ;
}

LifeBar.prototype.decrease = function() {
  if (this.w > 0 ){
  this.w -= 15;
  }

}