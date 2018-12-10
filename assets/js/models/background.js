function Background(ctx){
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;

    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.acceleration = 1;
    this.vx = - 3;
    

    this.img = new Image();
    this.img.src = "./assets/imgs/ruins.jpg"
}

Background.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
};

Background.prototype.move = function() {
    this.x += this.vx;
if (this.x + this.w <= 0 ){
    this.x = 0;

}
};

Background.prototype.accelerate = function() {
    this.acceleration += 0.05;
    this.vx = -3 * this.acceleration;
}