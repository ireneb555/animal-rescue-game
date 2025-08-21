//Use the mouse to move the paddle from left to right. Keep the ball in the air. If it touches the ground, you lose.

/* VARIABLES */
let paddle, ball, boneToy, ropeToy, painting, plant;
let backgroundImg, boneToyImg, ropeToyImg, paintingImg, plantImg;
let surface1, surface2;
let girl,dog,cat;
let score = 0;
let lives = 3;
let screen = 0

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage("assets/backgroundImg.webp");
  boneToyImg = loadImage("assets/boneImg.png");
  ropeToyImg = loadImage("assets/ropeToyImg.png");
  paintingImg = loadImage("assets/paintingImg.jpg");
  plantImg = loadImage("assets/plantImg.png");
  girlImg = loadImage("assets/girlImg.png");
  catImg = loadImage("assets/catImg.webp")
  dogImg = loadImage("assets/dogImg.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  //draw background image;
  image(backgroundImg,0,0);
  
  //resize images
  backgroundImg.resize(400,435);
  boneToyImg.resize(45,0);
  ropeToyImg.resize(80,0);
  paintingImg.resize(80,0);
  plantImg.resize(150,0);
  
  girlImg.resize(200,0);
  catImg.resize(130,0);
  dogImg.resize(130,0);

  //create home screen start button and writing
  enterButton = new Sprite(width/2,height/2+100);
  playAgain = new Sprite(-100,-100);

  playAgain.w = 100;
  playAgain.h = 50;
  playAgain.collider = "k";
  playAgain.color = "plum";
  playAgain.text = "Play Again";
  
  //Create paddle 
  paddle = new Sprite(-200,-380,100,20);
  paddle.color = color(95,158,160);
  paddle.rotationLock = true;
  
  //Create ball
  ball = new Sprite(-1000, -1000, 20);
  ball.color = color(0,128,128);
  ball.direction = 'down';
  ball.speed = 5;
  ball.bounciness = 1;
  ball.friction = 0;
  
  //create steps or surfaces
  surface1 = new Sprite(-300,-180,90,7,"s");
  surface1.color = color("grey");
  surface2 = new Sprite(-100,-100,90,7, "s");
  surface2.color = color("grey");

  //create person and cat and dog
  girl = new Sprite(girlImg,-300,-130,30,"s");
  cat = new Sprite(catImg,-300,-130,30,"s");
  dog = new Sprite(dogImg,-300,-130,30,"s");
  
  //create toys and paintings
  boneToy = new Sprite(boneToyImg,-300,-130,30,"s");
  ropeToy = new Sprite(ropeToyImg, -100,-90,40,"s");
  painting = new Sprite (paintingImg,-100,-200,90,"s");
  plant = new Sprite (plantImg,-270,-300,50,"s");
  
  //Create walls
  walls = new Group();
	walls.w = 10;
	walls.h = 400;
  walls.collider = "static";
  walls.visible = false;

  // left and right walls
	new walls.Sprite(0, height / 2);
	new walls.Sprite(width, height / 2);
  
  //top wall
	let wallTop = new walls.Sprite(width / 2, 0);
	wallTop.rotation = 90;
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  //draw background image;
  image(backgroundImg,0,0);
  
  //display enter button
  enterButton.w = 100;
  enterButton.h = 50;
  enterButton.collider = "k";
  enterButton.color = "plum";
  enterButton.text = "Start";

  //What happens when you press enter
  if (enterButton.mouse.presses()){

    //background
    image(backgroundImg, 0, 0);

    //get rid of enter button
    enterButton.pos = {x:-100,y:-100};
    
    //draw main game sprites to game
    boneToy.pos = {x:300, y:130};
    boneToy.collider = "static";
    
    ropeToy.pos = {x:100, y:90};
    ropeToy.collider = "static";
    
    painting.pos = {x:100, y:200};
    painting.collider = "static";
    
    plant.pos = {x:270, y:300};
    plant.collider = "static";
    
    surface1.pos = {x:300, y:180};
    surface1.collider = "static";
    
    surface2.pos = {x:100, y:100};
    surface2.collider = "static";
    
    paddle.pos = {x: 200, y:380};
    paddle.rotationLock = true;
    
    ball.pos = {x:200, y:50};

    screen = 1;
    
  }

  if (screen == 0){
    textSize(20);
    text("ANIMAL RESCUE", width/2-15, height/2 - 140);
    textSize(13);
    text("Welcome to the animal shelter.\nThese animals are waiting to get \nadopted. Can you help make their \nlives better at the shelter? \n \n \n \nUse the mouse to move the paddle \naround and collect the different items \nfor the animals!", width/2-20, height/2 -100);
    girl.pos = {x:120,y:205};
    dog.pos = {x:50, y:350};
    cat.pos = {x:300,y:330};
  }

  if (screen == 1){

    playAgain.pos = {x:-100,y:-100};
    girl.pos = {x:-100,y:-350};
    dog.pos = {x:-50, y:-300};
    cat.pos = {x:-300,y:-300};
    
    //Move the paddle
    paddle.moveTowards(mouse.x, 380,1);
  
    //When ball collides with paddle bounce off
    if (ball.collides(paddle)){
      ball.speed = 8;
      ball.direction = ball.direction + random(-10,10);
    
    }

    //when ball collides with objects, increase score
    if (ball.collides(boneToy)){
      boneToy.x =500;
      boneToy.y = 500;
      score = score +1;
    }
  
    if (ball.collides(ropeToy)){
      ropeToy.x = 500;
      ropeToy.y =500;
      score = score +1;
    }

    if (ball.collides(painting)){
      painting.x = 500;
      painting.y = 500;
      score = score +1;
    }

    if (ball.collides(plant)){
      plant.x = 500;
      plant.y = 500;
      score = score + 1;
    }

    //When ball hits ground you lose a life
    if (ball.y > 390) {
      ball.x = 200;
      ball.y = 50;
      ball.speed = 5;
      ball.direction = "down";
      lives = lives - 1;
    }
    
    if (score > 3){
      boneToy.pos = {x:500, y:500};
      ropeToy.pos = {x:500, y:500};
      painting.pos = {x:500, y:500};
      plant.pos = {x:500, y:500};
      surface1.pos = {x:2000, y:500};
      surface2.pos = {x:2000, y:500};
      paddle.pos = {x: 600, y:200};
      ball.pos = {x:600, y:200};
      screen = 2;
      }   
    
    if (lives < 1){
      // Draw you lose to screen
      lives = 0
      image(backgroundImg,0,0)
      fill(0);
      textSize(20);
      paddle.pos = {x: 500, y:500};
      ball.pos = {x:500, y:500};
      boneToy.pos = {x:500, y:500};
      ropeToy.pos = {x:500, y:500};
      painting.pos = {x:500, y:500};
      plant.pos = {x:500, y:500};
      surface1.pos = {x:500, y:500};
      surface2.pos = {x:500, y:500};
      screen = 3;
    }

  }

  if (screen == 2){
    fill("black");
    textSize(13);
    text("You have collected all the items! \nNow the animals have more toys \nto play with. The decorations have \nhelped create an inviting place \nfor the public and can promote \nadoption. Thanks for giving the\nanimals hope as they wait to find \ntheir forever homes!", width/2-10, height/2 -150);
    painting.pos = {x:60, y:60};
    plant.pos = {x:360, y:300};
    girl.pos = {x:150,y:230};
    dog.pos = {x:50, y:350};
    cat.pos = {x:240,y:330};
    boneToy.pos = {x:155, y:380};
    ropeToy.pos = {x:340, y:370};
    playAgain.pos = {x: width/2+90,y: height/2+15};
  }

  if (playAgain.mouse.presses()){
      //background
      image(backgroundImg, 0, 0);

      score = 0
      lives = 3
      
      //draw main game sprites to game
      boneToy.pos = {x:300, y:130};
      boneToy.collider = "static";
    
      ropeToy.pos = {x:100, y:90};
      ropeToy.collider = "static";
    
      painting.pos = {x:100, y:200};
      painting.collider = "static";
    
      plant.pos = {x:270, y:300};
      plant.collider = "static";
    
      surface1.pos = {x:300, y:180};
      surface1.collider = "static";
    
      surface2.pos = {x:100, y:100};
      surface2.collider = "static";
    
      paddle.pos = {x: 200, y:380};
      paddle.rotationLock = true;
    
      ball.pos = {x:200, y:50};
    
      screen = 1;
    }

  if (screen == 3){
    textSize(15);
    text("         You lost all your lives! \n\n       Try again to see if you can \ncollect all the items for the shelter!", width/2-30, height/2 -120); 
    girl.pos = {x:120,y:205};
    dog.pos = {x:50, y:350};
    cat.pos = {x:300,y:330};
    playAgain.pos = {x: width/2+90,y: height/2+15};
  }
    
  if (screen == 1){
    fill("grey");
    textAlign(LEFT);
    textSize(20);
    text(' Remaining lives: ' + lives , 10, 30); 
  }
}	