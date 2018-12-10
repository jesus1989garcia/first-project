function Game( canvas ) {
    this.ctx = canvas.getContext("2d");

    this.intervalId = undefined;
    this.bg = new Background(this.ctx);
    this.character = new Character(this.ctx);
    this.setListener();

    this.items = [];
    this.beans = [];

    
    this.enemies = [];
    
    this.octops = [];

    this.drawCount = 0;

    this.panels = new Panels(this.ctx);

    this.lifeBar = new LifeBar(this.ctx);


}
    Game.prototype.setListener = function(){
        document.addEventListener("keydown", this.character.onKeyDown.bind(this.character));
        document.addEventListener("keyup", this.character.onKeyUp.bind(this.character));
}

Game.prototype.start = function() {
this.intervalId = setInterval(function() {
    
    this.clear();
    this.drawAll();
    this.moveAll();
    this.checkGameOver();
    if (this.isHit()){
        explosion.play();
        
        this.character.bounce();
        if (this.character.life > 0 ){
        this.damage = 5;
        this.character.life -= this.damage;
        this.lifeBar.decrease();
        
        }
        //this.lifeBar.decrease();
        console.log("life " + this.character.life)
    }
    if (this.missileHit()){
        explosion.play();
        if(this.character.life > 0 ){
            this.damage = 5;
            this.character.life -= this.damage;
            this.lifeBar.decrease();
        }
    }
    this.octops.forEach(function(miss){
        if (this.character.collision(miss)) {
            miss.state = "exploded";
            setInterval( function(){
                miss.state = "vanish";
            },1000);
        }
    }.bind(this));

    this.enemies.forEach(function(bomb){
        if (this.character.collision(bomb)) {
            bomb.state = "exploded";
            setInterval( function(){
                bomb.state = "vanish";
            },1000);
        }
    }.bind(this));

    this.items.forEach(function(item){
      if (this.character.collision(item)) {
        item.state = "taken";
        points += 200;
        coinSound.play();
      }
     }.bind(this)); 

     this.beans.forEach(function(bean){
        if (this.character.collision(bean)) {
          bean.state = "taken";
          yummy.play();
          
          if (this.character.life <= 100 ){
            this.character.life += 20;
            this.lifeBar.increase();
            if (this.character.life > 100){
                this.character.life = 100;
            }
          }
        }
       }.bind(this)); 

}.bind(this),1000/60);
};


Game.prototype.stop = function() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
}

 

Game.prototype.isHit = function() {
    return this.enemies.some(function(enem){
        return this.character.collision(enem);
    }.bind(this));

}

Game.prototype.missileHit = function() {
    return this.octops.some(function(miss){
        return this.character.collision(miss);
    }.bind(this));
}
Game.prototype.getItem = function() {
    return this.items.some( function(item){
        return this.character.collision(item);
    }.bind(this));
}


Game.prototype.addEnemy = function() {
    var singleEnemy = new Enemy( this.ctx);
    this.enemies.push(singleEnemy);
}
Game.prototype.addOctopus = function() {
    var singleOctopus = new Octopus( this.ctx);
    this.octops.push(singleOctopus);
}

Game.prototype.addItem = function() {
    var star = new Star (this.ctx);
    this.items.push(star);
}
Game.prototype.addBean = function() {
    var bean = new Bean (this.ctx);
    this.beans.push(bean);
}

Game.prototype.drawAll = function( element ) {
    this.bg.draw();
    this.panels.draw();
    this.lifeBar.draw();
    this.character.draw();

    this.enemies.forEach(function(enem){
        enem.draw();
    });

    this.items.forEach(function(item){
        item.draw();
    });

    this.octops.forEach(function(octo){
        octo.draw();
    });

    this.beans.forEach( function(bean) {
        bean.draw();
    });

    this.ctx.fillText("Life " + this.character.life + "%", this.ctx.canvas.width - 800, 60);
    this.drawCount++;
    var beanAppear = Math.floor(Math.random()*1000 + 400 )
    var enemyWave = Math.floor(Math.random()* 2000);
    var octopWave = Math.floor(Math.random() * 2000);
    var itemAppear = Math.floor(Math.random()*1000 + 100 );

    if (this.drawCount % 100 === 0){
        levelUp();
        this.bg.accelerate();
        console.log("bg speed" + this.bg.acceleration)
        console.log("enemies speed" + ACCELERATION)
    }

    if (this.drawCount % beanAppear === 0) {
        this.addBean();
        console.log("bean added");
    }
    if (this.drawCount % itemAppear === 0){
        this.addItem();
        console.log(this.items.length)
    }
    if (this.drawCount % octopWave === 0){
        this.addOctopus();
        console.log("octopus added");
    }

    if (this.drawCount % enemyWave === 0 ){
        this.addEnemy();
        this.drawCount = 0;
        console.log(this.enemies.length)
        console.log(this.drawCount)
    }
    this.enemies = this.enemies.filter( function(enem){
        return enem.x + enem.w > 0 ;
    });
    this.octops = this.octops.filter( function (missile){
        return missile.x + missile.w > 0;
    })
    this.octops = this.octops.filter( function(missile){
        return missile.state != "vanish";
    })
    this.enemies = this.enemies.filter(function(bomb){
        return bomb.state != "vanish";
    });
    this.items = this.items.filter( function(star){
        return star.x + star.w > 0;
    });
    this.items = this.items.filter( function(star){
        return star.state != "taken";  //doesnt work with != "not taken" for some reason
    });
    this.beans = this.beans.filter( function(bean) {
        return bean.x + bean.w > 0;
    });
    this.beans = this.beans.filter( function(bean) {
        return bean.state != "taken";
    })

};
Game.prototype.checkGameOver = function() {
    if (this.character.life <= 0 ) {
        this.character.state = "death";
        if (this.character.state === "death"){
            
            this.img = new Image();
            this.img.src = "./assets/imgs/game-over.png";
            this.ctx.drawImage(this.img, this.ctx.canvas.width/4, this.ctx.canvas.height/4,700,250);
            //this.character.death();
        
        setTimeout(function(){
            this.stop(); 
    }.bind(this),1500);
         setTimeout (function(){
             location.reload();
         },4000)
            }
        }
    }
 

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};


Game.prototype.moveAll = function( element) {
    this.bg.move();
    this.character.move();
    this.enemies.forEach( function(enem){
        enem.move();  
});
this.items.forEach(function(item){
    item.move();
});
this.octops.forEach(function(octo){
    octo.move();
});
this.beans.forEach( function(bean) {
    bean.move();
})
}


Game.prototype.music = function() {
    heMan.play();
    setTimeout( function(){
        barbie.play();

    },130000)
    setTimeout( function(){
        takeOnMe.play();
    },323000)
}