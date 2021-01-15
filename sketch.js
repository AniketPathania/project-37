var gameState = "PLAY";

var bg,obstacleIMG,monkey,monkeyIMG,ground,bananaIMG;
var bg1,invisible;

var FoodGroup,ObstacleGroup ; 

var score = 0;
var HI = 0;
var life = 50;

function preload(){
  bg = loadImage("jungle.jpg");
  monkeyIMG = loadAnimation("Monkey_01.png","Monkey_02.png",
  "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
  "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaIMG = loadImage("banana.png");
  obstacleIMG = loadImage("stone.png");

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  
if(gameState == "PLAY"){

  
   //bg1 = createSprite(0,0,displayWidth*20,displayHeight);
   //bg1.addImage(bg);

  monkey =createSprite(0,620);
  monkey.addAnimation("running",monkeyIMG)
  monkey.scale = 0.2;
  
  
  invisible = createSprite(400,690,800000000,10);
  invisible.visible = false;

  FoodGroup = new Group();
  ObstacleGroup = new Group();
  }
}

function draw() {
  background(0);

  image(bg,-700,0,displayWidth*7,displayHeight+10);
  
  console.log(mouseX);


   if(monkey.x > 7200){
       gameState = "WIN";
   }

  
 if(gameState == "PLAY"){ 
   if(keyDown("space") && monkey.y >= 600) {
    monkey.velocityY = -16;
  }
  
  camera.position.x = monkey.x;

  if(keyDown(RIGHT_ARROW)){
    monkey.x+=10;
  }

 
   monkey.velocityY = monkey.velocityY + 0.8
  
  spawnBanana()
  spawnObstacles()
  
   if(ObstacleGroup.isTouching(monkey)){
     life = life - 20;
     ObstacleGroup.destroyEach();
   }
 

    if (FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score = score + 10;
     life = life + 10;
   }
  
   if(life<50){
     monkey.scale = 0.1
   }
  
   if(life<0){
     gameState = "END";
   
   }
  

 }  
  
  
  if (gameState == "END"){

  monkey.velocityY = 0;
  if (HI < score){
    HI = score;
  }
   FoodGroup.setVelocityXEach(0);
   FoodGroup.setLifetimeEach(-1);
   ObstacleGroup.setVelocityXEach(0);
   ObstacleGroup.setLifetimeEach(-1);
 
    
    if(keyDown("r")){
       reset();
    }
  }
  
  if (gameState == "WIN"){

    monkey.velocityY = 0;
      if (HI < score){
      HI = score;
    }
     FoodGroup.setVelocityXEach(0);
     FoodGroup.setLifetimeEach(-1);
     ObstacleGroup.setVelocityXEach(0);
     ObstacleGroup.setLifetimeEach(-1);
   
    }





  monkey.collide(invisible);
  
  drawSprites();
  fill("red");
  textSize(15);
  text("score :" + score ,monkey.x-180,350)
  text("HI :" + HI ,monkey.x-180,370)
  text("Life Points :" + life ,monkey.x-180,390)
  fill("white");
  text("press right arrow to move",0,400);
  if(gameState == "END"){
  fill("red");
  textSize(45);
  text("GAME OVER",monkey.x-80,monkey.y-300);
  text("press 'r' to restart",monkey.x-110,monkey.y-260);


  

  }
  if(gameState == "WIN"){
    fill("cyan");
    textSize(45);
    text("YOU WIN",monkey.x-50,monkey.y-300);
    }
  
}


function spawnBanana(){
  if (frameCount % 90 === 0){
    var banana = createSprite(monkey.x+700,460,40,10);
   banana.addImage(bananaIMG);
   banana.scale = 0.08;
   banana.velocityX = -(6+(score/100));
    banana.lifetime = 200;
   FoodGroup.add(banana);
  }
}







function spawnObstacles(){
  if (frameCount % 70 === 0){
    var obstacle = createSprite(monkey.x+700,660);
   obstacle.addImage(obstacleIMG);
   obstacle.scale = 0.18;
   obstacle.velocityX = -(8+(score/100));
    obstacle.lifetime = 200;
  ObstacleGroup.add(obstacle);
  }
}


function reset(){
  gameState = "PLAY";
  
  score = 0;
  life = 50;

  monkey.scale = 0.2;
  
  ObstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.x = 0;   
  
}

