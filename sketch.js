var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var over,overImage
var survivalTime = 1
var score=0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  overImage = loadImage("unnamed.png");
}



function setup() {
  createCanvas(600, 600)
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //console.log(monkey.velocityY)
  FoodGroup = new Group()
  obstacleGroup = new Group()
  over = createSprite(300,170,20,20)
   over.addImage(overImage)
  over.visible = false;
  score = 0;
}


function draw() {
  background(255);
  stroke("black")
  textSize(20)
  fill("black")
  text("Score:" + score, 100, 100);
  
  if (gameState===PLAY){
    if (monkey.isTouching(FoodGroup)) {
    score = score + 1
    FoodGroup.destroyEach();
  }
  
  if(keyDown("space") && monkey.y >= 220) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    console.log(ground.x);
  if(ground.x<150) {
    
    ground.x=ground.width/2;
    }
    monkey.collide(ground);  
  
  food()
  obstacles()

  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.round(frameCount / frameRate())
  text("Survival Time:" + survivalTime, 100, 50)
  }
  else if (gameState === END){
     over.visible = true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.visible = false;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    //obstacleGroup.setLifetimeEach(-1);
    //FoodGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach();
    //FoodGroup.visible = false
    obstacleGroup.destroyEach();
    score =0;
    //FoodGroup.visible = false
    //ground.destroy()
    //monkey.destroy()
   
    
  }
    drawSprites();
}

function food() {
  if (frameCount % 160 === 0) {
    banana = createSprite(600, 200, 20, 20)
    banana.addImage("ba", bananaImage)
    banana.scale = 0.1
    banana.velocityX = -3
    banana.y = Math.round(random(120, 200));
    //console.log(banana.y)
    FoodGroup.add(banana)
    banana.lifetime = 200
  }
  
}
 
function obstacles() {
 if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 328, 20, 20)
    obstacle.addImage("ob", obstacleImage)
    obstacle.scale = 0.1;
    //obstacle.debug = true;
    obstacle.setCollider("rectangle",0,0,20,20);
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -3
  }

}