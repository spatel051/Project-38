var mandalorian, mandalorianImage, Background, backgroundImage;
var gameState, lightsaber, lightsaberImage, lightsaberGroup;
var score, gameOver, gameOverImage, bullet, bulletCount;
var bulletGroup, hitSound, gameOverSound, time = 5;

function preload(){
  backgroundImage = loadImage("desert.png");
  mandalorianImage = loadImage("Mandalorian.png");
  lightsaberImage = loadImage("Lightsaber.png");
  gameOverImage = loadImage("gameOver.jpeg");
  hitSound = loadSound("Clash.mp3");
  gameOverSound = loadSound("gameOver.wav");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  //Background = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  mandalorian = createSprite(40, displayHeight/2, 20, 20);
  gameOver = createSprite(displayWidth/2, displayHeight/2, 10, 10);
  bullet = createSprite(-100, -100, 20, 5)
  
  mandalorian.addImage(mandalorianImage);
  //Background.addImage(backgroundImage);
  gameOver.addImage(gameOverImage);
  
  mandalorian.scale = 0.3;
  //Background.scale = 10;
  gameOver.scale = 1.6;
  
  gameState = "start"
  
  lightsaberGroup = new Group();
  bulletGroup = new Group();
  
  gameOver.visible = false;
  
  score = 0;
  bulletCount = 0;
}

function draw() {
  background(backgroundImage);
  drawSprites();

  camera.position.y = displayWidth/3;
  camera.position.x = mandalorian.x + 50;

  if(gameState === "start"){
    textSize(50);
    stroke("black")
    text("Press Space to Play", mandalorian.x-200, displayHeight/2);
    textSize(25);
    text("Use the mouse to move the character", mandalorian.x-190, displayHeight/1.8);
    text("Press s to shoot", mandalorian.x-70, displayHeight/1.7);
    text("Press r to reset the game", mandalorian.x-120, displayHeight/1.6)
    mandalorian.visible = false;
    
    if(keyDown("space")){
      gameState = "play";
    }
    
  }
  
  if(gameState === "play"){
    //Background.velocityX = -5;
    
    mandalorian.visible = true;
    
    //mandalorian.y = World.mouseY;
    //mandalorian.x = World.mouseX;
    
    if(keyWentDown("s")){
      shoot();
    }
    
    goDown();
    goUp();
    goRight();
    goLeft();

    score = score + Math.round(getFrameRate()/60);
    
    spawnLightsabers();
    
    textSize(20);
    text("Score: " + score, 390, 50);
    
    /*if(round(millis()/1000) === 5){
      Background.x = Background.width/2;
       
    }*/
    
    if(bulletGroup.isTouching(lightsaberGroup)){
      lightsaberGroup.destroyEach();
      hitSound.play();
      bullet.x = -100;
      bullet.y = -100;
      score += 100;
    }
    
    if(lightsaberGroup.isTouching(mandalorian)){
      gameState = "end";
      //gameOverSound.play();
    }
    
  }
  
  if(gameState === "end"){
    
    background(gameOverImage);
    //Background.velocityX = 0;
    gameOver.visible = true;
    
    lightsaberGroup.destroyEach();
    bulletGroup.setVelocityYEach(0);
    bulletGroup.setVelocityXEach(0);
    
    if(keyDown("r")){
      reset();
    }
    
  }
  
}

function reset(){
  gameState = "play";
  gameOver.visible = false;
  score = 0;
}

function spawnLightsabers(){
  if(World.frameCount % 25 === 0){
    lightsaber = createSprite(mandalorian.x+displayWidth, Math.round(random(displayHeight-displayHeight+50, displayHeight-50)), 10, 10);
    //lightsaber.velocityX = -5;
    lightsaber.addImage(lightsaberImage);
    lightsaber.scale = 0.5;
    //lightsaber.lifetime = displayWidth/5;
    lightsaber.setCollider("rectangle", 0, 0, 75, 150);
    lightsaberGroup.add(lightsaber);
  }
}

function shoot(){
  bulletCount += 1;
  if(bulletCount == 1){
    bullet.shapeColor = "blue";
    bullet.x = mandalorian.x + 30;
    bullet.y = mandalorian.y - 30;
    bullet.velocityX = 10;
    bulletCount = 0;
    bulletGroup.add(bullet);
    /*if(bullet.x > displayWidth){
      bullet.x = -100;
      bullet.y = -100;
    }*/
  }
}

function goUp(){
  if(keyDown(UP_ARROW)){
    mandalorian.y -= 5;
  }
}

function goDown(){
  if(keyDown(DOWN_ARROW)){
    mandalorian.y += 5;
  }
}

function goLeft(){
  if(keyDown(LEFT_ARROW)){
    mandalorian.x -= 5;
  }
}

function goRight(){
  if(keyDown(RIGHT_ARROW)){
    mandalorian.x += 5;
  }
}