function Octopus(ctx){
  this.ctx = ctx;
  
  this.x = this.ctx.canvas.width; //here it is
  this.y = this.ctx.canvas.height - 400;
  //this.y0 = this.y;  // careful with the y0 before the var y declaration

  this.y = Math.floor(Math.random() * this.ctx.canvas.height/2);

  this.w = 150;
  this.h = 70;

  this.vx = -5;
  this.vy = 0;
  this.gravity = 0.1;
  this.gravitySpeed = 0;
  this.bounce = 1;
  

  this.img = new Image();
  this.img.src = "./assets/imgs/missile.png";
  
  this.img.frames = 4;
  this.img.frameIndex = 0;
  this.frameCounter = 0;

  this.state = "non exploded"
};






Octopus.prototype.draw = function() {
  if (this.state === "non exploded") {
  this.ctx.drawImage(
      this.img,
      this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
      0,
      this.img.width / this.img.frames,
      this.img.height/2,
      this.x,
      this.y,
      this.w,
      this.h);
      
      this.animate();
  } else if (this.state === "exploded" ){
      this.img.src = "./assets/imgs/explosion.png";
      this.img.frames = 8;
      this.w = 170;
      this.h = 170;
      
      this.x -= 3;
      
      this.ctx.drawImage(
          this.img,
          this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
          0,
          this.img.width / this.img.frames,
          this.img.height,
          this.x,
          this.y,
          this.w,
          this.h);
          
          this.animate();
          
   }
};

Octopus.prototype.animate = function() {
  if (++this.frameCounter % 8 === 0 ) {
      this.frameCounter = 0;
      if (this.img.frameIndex === this.img.frames -1){
          this.img.frameIndex = 0;
      } else {
          this.img.frameIndex ++;
      }
  }
};

Octopus.prototype.move = function() {
  this.animate();

  this.gravitySpeed += this.gravity;
  this.x += this.vx;
  this.y += this.vy + this.gravitySpeed;

  if (this.y >= 300  ){
      this.y = 300 ;
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
    
    
};

Octopus.prototype.explode = function() {
  this.state = "exploded";
}