


/////////global variable
var speed=5;
var length=1;
var count=0;
var food_x;
var food_y;
var score=0;
var game_status=1;
var blocks_x=new Array(10);
var blocks_y=new Array(10);
//////////////////////////
class snake
{
  constructor(x,y,x_dir,y_dir)
  {
    this.x=x;
    this.y=y;
    this.x_dir=x_dir;
    this.y_dir=y_dir;
  }
  show(c,s)
  {
    this.c=c;
    rectMode(CENTER);
    noStroke();
    if(this.c==0) fill(255);
    else	fill(this.c,this.c,0);
    rect(this.x,this.y,10+s/2,10+s/2);
  }
  move(speed)
  {
    this.speed=speed;
    this.x+=this.speed*this.x_dir;
    this.y+=this.speed*this.y_dir;
  }
  update_x_dir(dir1)
  {
    this.x_dir=dir1;
  }
  update_y_dir(dir2)
  {
    this.y_dir=dir2;
  }
  update_x(X)
  {
    this.x=X;
  }
  update_y(Y)
  {
    this.y=Y;
  }
  get_x_dir()
  {
    return this.x_dir;
  }
  get_y_dir()
  {
    return this.y_dir;
  }
  get_x()
  {
    return this.x;
  }
  get_y()
  {
    return this.y;
  }
}
///////////////////
var tail=new Array();    
tail[0]=new snake(100,100,1,0);
///////////////////

function update_snake()
{
  
  for(var i=length-1;i>0;--i)
  {
   	tail[i].update_x(tail[i-1].get_x());
    tail[i].update_y(tail[i-1].get_y());
    tail[i].update_x_dir(tail[i-1].get_x_dir());
    tail[i].update_x_dir(tail[i-1].get_y_dir());
  }
  tail[0].move(speed);
}


//////////////////////////////////////////////////////////
function setup() 
{
  var cnv = createCanvas(600, 400);
  var x=(windowWidth-width)/2;
  var y=(windowHeight-height)/2;
  cnv.position(x,y);
	food_x=rand(20,580);
  food_y=rand(40,380);
  for(var i=0;i<10;i++)
  {
    blocks_x[i]=rand(50,width-50);
    blocks_y[i]=rand(70,height-50);
  }
}
function draw() 
{
  background(0);
  fill(255);
  textSize(35);
  text(" Snake Game ",170,30);
  print_score();
  blocks(blocks_x,blocks_y);
  food();
  for(var j=0;j<length;++j)
  {
    var c=0;
    if(j%2!=0)c=255
    tail[j].show(c,speed-1);
  }
  game_over(is_out());
  game_over(did_collide());
  if(game_status==0)game_over();
  if(count%10==0)
  {
    update_snake();
  }
  
  if(did_ate()==1)
  {
  	length++;
    tail.push(new snake(0,0,0,0));
    food_x=rand(50,580);
  	food_y=rand(70,380);
    speed+=1;
    score++;
   	for(var i=0;i<10;i++)
  		{
    		blocks_x[i]=rand(50,width-50);
    		blocks_y[i]=rand(70,height-50);
  		}
  }
  count++;
}

function keyPressed()
{
  if(keyCode===UP_ARROW)
  {
    if(tail[0].get_y_dir()!=1){tail[0].update_y_dir(-1);tail[0].update_x_dir(0);}
  }
  else if(keyCode===DOWN_ARROW)
  {
    if(tail[0].get_y_dir()!=-1){tail[0].update_y_dir(1);tail[0].update_x_dir(0);}
  }
  else if(keyCode===LEFT_ARROW)
  {
    if(tail[0].get_x_dir()!=1){tail[0].update_x_dir(-1);tail[0].update_y_dir(0);}
  }
  else if(keyCode===RIGHT_ARROW)
  {
    if(tail[0].get_x_dir()!=-1){tail[0].update_x_dir(1);tail[0].update_y_dir(0);}
  }
  
}
//////////////////////////////////////////////////////////
function is_out()
{
  if((tail[0].get_x()>width-10)||(tail[0].get_x()<10)||(tail[0].get_y()<50)||(tail[0].get_y()>height-10))
    return 1;
}
function print_score()
{
  fill(255);
  textSize(20);
  text("Score:",30,40);
  text(score,100,40);
}
function game_over(bool)
{
  if(bool==1)
  {
    speed=0;
  	fill(255);
  	textSize(40);
  	text("GAME - OVER",150,200);
  }
}
function did_ate()
{
  if(((tail[0].get_x()>(food_x-10-speed/2))&&(tail[0].get_x()<(food_x+10+speed/2)))&&((tail[0].get_y()>(food_y-10-speed/2))&&(tail[0].get_y()<(food_y+10+speed/2))))
    return 1;
}
function food()
{
  ellipseMode(CENTER);
  fill(0,255,0);
  ellipse(food_x,food_y,10+speed/4);
}
function blocks(b_x,b_y)
{
  for(var i=0;i<10;i++)
  {
    rectMode(CENTER);
    fill(255,0,0);
    if(is_around_food(b_x[i],b_y[i])==0&&is_around_snake(b_x[i],b_y[i])==0)
    rect(b_x[i],b_y[i],15,15);
  }
}
function did_collide()
{
  for(var i=0;i<10;i++)
  {
    if(((tail[0].get_x()>(blocks_x[i]-10-speed/2))&&(tail[0].get_x()<(blocks_x[i]+10+speed/2)))&&((tail[0].get_y()>(blocks_y[i]-10-speed/2))&&(tail[0].get_y()<(blocks_y[i]+10+speed/2))))
    	{return 1; game_status=0;}
  }
  return 0;
}
function is_around_snake(x,y)
{
	if((x>(tail[0].get_x()-10)&&x<(tail[0].get_x()+10))&&(y>(tail[0].get_y()-10)&&y<(tail[0].get_y()+10)))
    return 1;
  else return 0;
}
function is_around_food(x,y)
{
	if(((x>(food_x-10))&&(x<(food_x+10)))&&((y>(food_y-10))&&(y<(food_y+10))))
    return 1;
  else return 0;
}

function rand(x,y)
{
  return random(x,y);
}


