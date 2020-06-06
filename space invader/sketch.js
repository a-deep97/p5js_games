////global  variables////
var snake_speed,dir_x,dir_y;
var food_x,food_y;
var r,g,b;
var img,food_img,heading,brick,game_over;
var score=0;
var block_x=new Array(10),block_y=new Array(10),B=new Array(10);
///////////////////////////
function preload()
{
//  img=loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8QRabrX2imvBtqdvJymqJ3EdyotCdu7_NOPm55jxptZF7f57");
		img=loadImage("https://vignette.wikia.nocookie.net/spaceinvaders/images/d/db/Crab_Invader.png/revision/latest?cb=20180814211211.png");
		food_img=loadImage("https://i.imgur.com/jZxa7sf.jpg");
  	heading=loadImage("https://vignette.wikia.nocookie.net/siivagunner/images/5/5a/Space_Invaders.jpg/revision/latest?cb=20180908191944");
		brick=loadImage("http://bbp.style/PUBLIC/BIM-library/jpg/australbricks/Nubrik/AB-Bricks-NubrikClassicChapelRed230x76-110-240-NAT.jpg");
		explosion=loadImage("data:image/jpeg;base64,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");
  //		game_over=loadImage("https://images.pond5.com/game-over-stacked-spin-down-footage-045768728_iconm.jpeg");
}
//////class definitions////
class food
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
  }
  show(r,g,b)
  {
    this.r=r;
    this.g=g;
    this.b=b;
    food_img.resize(30,25);
    image(food_img,this.x,this.y)
  }
  return_x()
  {
    return this.x;
  }
  return_y()
  {
    return this.y;
  }
}


//////class block///
class block
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
  }
  move(speed,dir_x,dir_y)
  {
    this.x+=speed*dir_x;
    this.y+=speed*dir_y;
  }
  show(size)
  {
		this.size=size;
    img.resize(this.size+5,this.size);
    image(img,this.x,this.y);
  }
/// function to add a node
  return_x()
  {
    return this.x;
  }
  return_y()
  {
    return this.y;
  }
} let snake=new block(100,200);
class blocks
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
  }
  show(bool)
  {
    if(bool==1)
    {
   		imageMode(CENTER);
    	brick.resize(30,40);
   		image(brick,this.x,this.y);
    }
  }
  X()
  {
    return this.x;
  }
  Y()
  {
    return this.y;
  }
} 
///////function setup/////
function setup() 
{
  createCanvas(1200,650);
  snake_speed=2;
  dir_x=1;
  dir_y=0;
  food_x=rand(100,110);
  food_y=rand(160,550);
  snake_size=40;
  r=rand(0,255);
  g=rand(0,255);
  b=rand(0,255);
  x=rand(100,500);
  y=rand(160,350);
  for(var i=0;i<10;i++)
  {
    block_x[i]=rand(50,1100);
    block_y[i]=rand(160,550);
		B[i]=new blocks(0,0);
  }
}
////function draw////
function draw() 
{
  var f= new food(food_x,food_y);
  background(0);
  f.show(r,g,b);
	snake.show(snake_size);
  for(var i=0;i<10;i++)
  {
    if((is_around_alien(block_x[i],block_y[i])==0)&&(is_around_food(block_x[i],block_y[i],f)==0))
    {	 
      B[i]=new blocks(block_x[i],block_y[i]);   
      B[i].show(1);
  //    print(B[i].)
      if(((snake.return_x()>(B[i].X()-30))&&(snake.return_x()<(B[i].X()+30)))&&((snake.return_y()>(B[i].Y()-30))&&(snake.return_y()<(B[i].Y()+30))))
      { print("1");game_over(1);}
  	}
    if(((snake.return_x()>(B[i].X()-30))&&(snake.return_x()<(B[i].X()+30)))&&((snake.return_y()>(B[i].Y()-30))&&(snake.return_y()<(B[i].Y()+30))))
      { print("1");explode();game_over(1);}
  }
  game_over(is_out());
  print_brick();
  heading.resize(430,70);
  image(heading,600,40);
  print_score();
  
  if(((snake.return_x()>(food_x-snake_size/2))&&(snake.return_x()<(food_x+snake_size/2)))&&((snake.return_y()>(food_y-snake_size/2))&&(snake.return_y()<(food_y+snake_size/2))))
  {
    food_x=rand(50,1100);
    food_y=rand(160,550);
    r=rand(0,255);g=rand(0,255);b=rand(0,255);
    score++;
    snake_speed+=0.2;
    for( var j=0;j<10;j++)
  	{
    	block_x[j]=rand(50,1100);
    	block_y[j]=rand(160,550);
  	}
  }
  snake.move(snake_speed,dir_x,dir_y);
}
function keyPressed()
{
  if(keyCode===UP_ARROW) {if(dir_y!=1){dir_y=-1;dir_x=0;}}
  else if(keyCode===DOWN_ARROW) {if(dir_y!=-1){dir_y=1;dir_x=0;}}
  else if(keyCode===LEFT_ARROW) {if(dir_x!=1){dir_x=-1;dir_y=0;}}
  else if(keyCode===RIGHT_ARROW) {if(dir_x!=-1){dir_x=1;dir_y=0;}}
}
////////user defined functions////////
function rand(x,y)
{
  return random(x,y);
}
////////////
function print_brick()
{
  
  for(var i=0;i<13;i++)
  {
    brick.resize(30,40);
    image(brick,30,120+40*i);
    image(brick,1170,120+40*i);
  }
  for(var j=0;j<38;j++)
  {
    brick.resize(30,40);
    image(brick,30+30*j,120);
    image(brick,30+30*j,600);
  }
}
function is_out()
{
  if(snake.return_x()<5||snake.return_x()>1150||snake.return_y()<120||snake.return_y()>600)
    return 1;
  else return 0;
}

function print_score()
{
  fill(255);
  textSize(50);
  text("score:",20,80);
  text(score,200,80);
}
function is_around_alien(x,y)
{
	if((x>(snake.return_x()-40)&&x<(snake.return_x()+40))&&(y>(snake.return_y()-40)&&y<(snake.return_y()+40)))
    return 1;
  else return 0;
}
function is_around_food(x,y,F)
{
	if((x>(F.return_x()-60)&&x<(F.return_x()+60))&&(y>(F.return_y()-60)&&y<(F.return_y()+60)))
    return 1;
  else return 0;
}
function game_over(status)
{
  if(status==1)
  {
    fill(255);
    textSize(50);
    text("GAME - OVER!!",width/2-190,height/2+50);
    textSize(20);
    text("refresh the page to continue",460,430);
    snake_speed=0;
  }
}
function explode()
{
  imageMode(CENTER);
  explosion.resize(100,100);
  image(explosion,snake.return_x(),snake.return_y());
}


