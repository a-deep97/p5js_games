////////////global variables///////////////////////////////
var bullets = [];
var aliens = [];
var bullet_counter=0;
var space_ship;
var Alien;
var blast;
var explosion;
var back_music;
var ship_x,ship_y;
var xspeed=0.8,yspeed=0.1,dir=1;
var gun;
var alien_count;
var score=0,level=1;
var attack=[];
/////////////////////////////////////////////////////////
class bullet
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
  }
  update(speed)
  {
    this.y-=speed;
  }
  show()
  {
    fill(0,0,255);
    ellipseMode(CENTER);
    ellipse(this.x,this.y,10,10);    
  }
  get_bx() {return this.x;}
  get_by() {return this.y;}
  
}
////////////////////////////////////////////////////////////
class alien
{
 constructor(x,y,img)
  {
    this.img=img;
    this.x=x;
    this.y=y;
    this.visible=1;
  }
  show()
  {
    imageMode(CENTER);
    this.img.resize(35,30);
    if(this.visible!=0)
    image(this.img,this.x,this.y);
  }
  update_x(){this.x+=dir*xspeed;}
  update_y(){this.y+=yspeed;}
  disable_visibility() {this.visible=0;}
  give_x(x){this.x=x;}
  give_y(y){this.y=y;}
  get_ax() {return this.x;}
  get_ay() {return this.y;}
  get_life() {return  this.visible;}
}

//////////////////////////////////////////////////////////
function preload()
{
  space_ship=loadImage("space ship.png");
  Alien=loadImage("alien1.jpg");
  blast=loadImage('blast.jpg');
  soundFormats('mp3');
  back_music=loadSound('retro sound1.mp3');
  gun=loadSound('bullet.mp3');
  explosion=loadSound('Explosion+3.mp3');
}
////////////////////////////////////////////////////////
function setup()
{
  createCanvas(600, 500);
  background(0);
  back_music.play();
  back_music.loop();
  ship_x=width/2;
  ship_y=height-60;
  create_aliens();
  info();
}
function draw() 
{
  background(0);
  if(!checkgameover())
  {
    shoot();
    show_ship();
    update_ship(5);
    show_aliens();
    update_aliens();
    alien_death();
    update_bullets();
    show_bullets();
   
  }
  levelup();
  info();
  gameover();
}

///////////////////////////////////////////////
function keyPressed()
{
  if(keyCode==SHIFT)
  {
    back_music.stop();
    back_music.play();
    replay();
  }
}
function shoot()
{
  if(keyIsDown(CONTROL)) {create_bullets();gun.play();}
}
///////////////////////////////////////////////
function update_bullets()
{
  for(var i=0;i<bullets.length;i++)
  {
    bullets[i].update(15);
  }
}
////////////////////////////////////////////////
function show_bullets()
{
  for(var i=0;i<bullets.length;i++)
  {
    bullets[i].show();
  }
}
/////////////////////////////////////////////////
function create_bullets()
{
  bullets[bullet_counter]=new bullet(ship_x,ship_y-25);
  bullet_counter++;
  if(bullet_counter==100) bullet_counter=0;
}
////////////////////////////////////////////////
function update_ship(offset)
{
  if(keyIsDown(RIGHT_ARROW))
    ship_x+=offset;
  else if(keyIsDown(LEFT_ARROW))
    ship_x-=offset;
  if(ship_x>600) ship_x=0;
  if(ship_x<0) ship_x=600;
  
}
/////////////////////////////////////////////////
function show_ship()
{
  imageMode(CENTER);
  image(space_ship,ship_x,ship_y);
  space_ship.resize(50,50);
}
///////////////////////////////////////////////
function create_aliens()
{
  let sign=[1,-1];
  dir= random(sign);
  print(dir);
  aliens=[];
  for(var i=0;i<3;i++)
  {
    for(var j=i;j<6-i;j++)
    {
      var a=new alien(100+50*j,100+50*i,Alien);
      aliens.push(a);
    }
  }
  alien_count=12;
}
////////////////////////////////////////////////
function show_aliens()
{
  for(var i=0;i<12;i++)
  {
    aliens[i].show();
  }
}
function update_aliens()
{
  for(var i=0;i<12;i++)
  {
    aliens[i].update_x();
    aliens[i].update_y();
    if(aliens[i].get_ay()>500) aliens[i].give_y(0);
  }
  if(aliens[0].get_ax()<=50) dir=1;
  if(aliens[0].get_ax()>=450) dir=-1;
}
////////////////////////////////////////////////////
function alien_death()
{
  for(var i=0;i<bullet_counter;i++)
  {
    for(var j=0;j<12;j++)
    {
      if(aliens[j].get_life())
      if(((bullets[i].get_bx()<aliens[j].get_ax()+7)&&
          (bullets[i].get_bx()>aliens[j].get_ax()-7))&&
          ((bullets[i].get_by()<aliens[j].get_ay()+7)&&
          (bullets[i].get_by()>aliens[j].get_ay()-7)))
      { 
        alien_count--;
        explosion.play();
        blast.resize(150,150);
        image(blast,aliens[j].get_ax(),aliens[j].get_ay());
        aliens[j].disable_visibility();
        score+=10;
        break;
      }
    }
  }
}

////////////////////////////////////////////////////
function info()
{
  fill(255,0,0);
  textFont('ravie',50,30);
  text('SPACE INVADER',50,50);
  fill(255);
  textFont('ravie',20,10);
  text('Score:'+score,50,70);
  fill(255);
  textFont('ravie',20,10);
  text('Level:'+level,460,70);
}
/////////////////////////////////////////////////////
function checkgameover()
{
  if(aliens[11].get_ay()>400)
  {
    for(var i=0;i<12;i++)
    {
      if(aliens[i].get_life())
      if(((aliens[i].get_ax()<ship_x+30)&&(aliens[i].get_ax()>ship_x-30))&&
        ((aliens[i].get_ay()<ship_y+30)&&(aliens[i].get_ay()>ship_y-30)))
        {return 1;}
    }
  }
  return 0;
}
//////////////////////////////////////////////////////
function gameover()
{
  if(checkgameover())
  {
    fill(0,255,0);
    textFont('ravie',50,30);
    text('GAME OVER',100,200);
    textSize(15,5);
    text("enter shift to play again",200,300);
    back_music.stop();
  }
}
/////////////////////////////////////////////////////
function replay()
{  
  score=0;
  ship_x=0;
  level=0;
  xspeed=0.5;
  yspeed=0.1;
  create_aliens();
}
///////////////////////////////////////////////////////
function levelup()
{
  if(!alien_count)
  {
    level++;
    xspeed+=1;
    yspeed+=0.2;
    create_aliens();
  }
}
///////////////////end//////////////////////////////////



