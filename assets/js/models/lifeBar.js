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
  this.ctx.strokeStyle = "black";
  this.ctx.restore();
  //this.ctx.stroke(this.x, this.y, this.w, this.h);
  

  ;
}

LifeBar.prototype.decrease = function() {
  if (this.w > 0 ){
  this.w -= 15;
  }

}

LifeBar.prototype.increase = function() {
  if (this.w < 300 ) {
    this.w += 60;
    if (this.w > 300 ){
      this.w = 300;
    }
  }
}