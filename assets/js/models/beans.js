function Bean(ctx){
  this.ctx = ctx;
  
  this.x = this.ctx.canvas.width; //here it is
  this.y =  Math.floor(Math.random()*(this.ctx.canvas.height -50 - 200 +1) + 200 );
  this.y0 = this.y;  // careful with the y0 before the var y declaration

  this.w = 40;
  this.h = 40;

  this.vx = -3 * ACCELERATION;
  this.vy = 0;
  

  this.img = new Image();
  this.img.src = "./assets/imgs/senzu.png";
  
  this.img.frames = 1;
  this.img.frameIndex = 0;
  this.frameCounter = 0;

  this.state = "not taken";
};






Bean.prototype.draw = function() {
 if (this.state === "not taken"){
  this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h);
      
      //this.animate();
 }
};

// Bean.prototype.animate = function() {
//   if (++this.frameCounter % 20 === 0 ) {
//       this.frameCounter = 0;
//       if (this.img.frameIndex === this.img.frames -1){
//           this.img.frameIndex = 0;
//       } else {
//           this.img.frameIndex ++;
//       }
//   }
// };

Bean.prototype.move = function() {
  //this.animate();

  this.x += this.vx;
  this.vy += 0.5;
  this.y += this.vy;

  if (this.y >= this.y0){
      this.y = this.y0;
      this.vy = 0;
    }
    
    
};

Bean.prototype.collision = function(thing){
  return this.x < thing.x + thing.w &&
  this.x + this.w > thing.x &&
  this.y < thing.y + thing.h &&
  this.y + this.h > thing.y;
      
  }