function Character(ctx){
    this.ctx = ctx;
    
    this.x = 50;
    this.y = this.ctx.canvas.height -100;

    if (this.state = "alive") {
    this.y0 = this.y;  // careful with the y0 before the var y declaration 
    } else {
        this.y = this.y;
    
    }
    this.w = 50;
    this.h = 70;

    this.vx = 0;
    this.vy = 0;
    

    this.img = new Image();
    this.img.src = "./assets/imgs/run.png";
    
    this.img.frames = 6;
    this.img.frameIndex = 0;
    this.frameCounter = 0;

    this.life = 100;
    if (this.life < 0 ){
    this.state = "alive";
    } else{
        this.state = "death";
    }
    
    
};


Character.prototype.draw = function() {
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
    
};

Character.prototype.animate = function() {
    if (++this.frameCounter % 8 === 0 ) {
        this.frameCounter = 0;
        if (this.img.frameIndex === this.img.frames -1){
            this.img.frameIndex = 0;
        } else {
            this.img.frameIndex ++;
        }
    }
};

Character.prototype.move = function() {
    this.animate();

    this.x += this.vx;
    this.vy += 0.5;
    this.y += this.vy;
  
    if (this.y >= this.y0){
        this.y = this.y0;
        this.vy = 0;
      }

      if (this.x >= this.ctx.canvas.width - this.w || this.x - this.w <= 0 ) {
          this.vx *= -2;

      }
       

     
      
      
};

Character.prototype.jump = function() {

    if (!this.inAir()){
        this.vy -= 16;

    }
};
Character.prototype.inAir = function() {
    return this.y < this.y0;
};


Character.prototype.onKeyDown = function(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.jump();
        break;
      case KEY_RIGHT:
        this.vx = 5;  //o solo x
        this.x += this.vx;
        break;
      case KEY_LEFT:
        this.vx = -3;
        break;
    }
    
   };
   Character.prototype.onKeyUp = function(event) {
   console.log(event)
    switch (event.keyCode) {
       
        case KEY_RIGHT:
          this.vx = 0;
          
          break;
        case KEY_LEFT:
          this.vx = 0;
          break;
      }
  };

  Character.prototype.collision = function(thing){
    return this.x < thing.x + thing.w &&
    this.x + this.w > thing.x &&
    this.y < thing.y + thing.h &&
    this.y + this.h > thing.y;
        
    }

    

    Character.prototype.bounce = function() {
        this.vy = -20;
        console.log("hit")
    }

    Character.prototype.inmune = function() {
        console.log("caught");
    }

    

