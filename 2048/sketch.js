////////////////////////////////////////////////////////////////////////////////
														////////2048////////    by:- aman deep
///////////////////////////////////////////////////////////////////////////////
/* //////index///////
  	1.class block    //class block representing each block
    2.setup()					
    3.draw()
    4.keyPressed()
    5.F1()						//function to generate random blocks after each turn
    6.F2()						//function for shifting blocks to the right
    7.F3()						//function for shifting blocks to the left
    8.F4()						//function for shifting blocks to the up
    9.F5()						//function for shifting blocks to the down
    10.F6()						//display of all blocks
    11.F7()						//calculation of color of blocks
    12.F8()						// check function for game over	
    13.F9()						//print all data and media on screen	
    14.F10()					//for prints values of blocks in console for debugging
*/
/////////////////////////////////
class block
{
  constructor(x,y,value)
  {
  	this.x=x;
    this.y=y;
    this.value=value; 
  }
  show(color)
  {
    this.color=color; ////vector assignment ??????///
    rectMode(CENTER);
    fill(this.color.x,this.color.y,this.color.z);
    rect(this.x,this.y,100,100);
    fill(0);
    textSize(30);
    text(this.value,this.x-20,this.y+10);
  }
  get_value()
  {
    return this.value;
  }
  give_value(Value)
  {
    this.value=Value;
  }
 
}
///////////////global variables //////////////////////////////////////
var B=new Array(16);
var score=0;
var cat;
/////////////////////////////////////////////////////
function setup() 
{
  
  createCanvas(windowWidth/2, windowHeight/2);
  cat=loadImage("cat.jpg");
  background(255);
	for(var i=0;i<16;i++)
  {
    B[i]=new block(100*((i%4)+1),50+100*(int)((i/4)+1),0);
  }
  F1();
  F9(score,F8());
}
/////////////////////////////////////////////////////
function draw() 
{
  
  F6();
  F9(score);
}
////////////////////////////////////////////////////

function keyPressed()
{
  switch(keyCode)
  {
    case RIGHT_ARROW:
      {
        F2();
        F1();
        F9(score);
        background(255);
        break;
      }
    case LEFT_ARROW:
      {
        F3();
        F1();
        F9(score);
        background(255);
        break;
      }
    case UP_ARROW:
      {
        F4();
        F1();
        F9(score);
        background(255);
        break;
      }
    case DOWN_ARROW:
      {
        F5();
        F1();
        F9(score);
        background(255);
        break;
      }
    case RETURN:
      {
        score=0;
        for(var i=0;i<16;i++) B[i].give_value(0);
        F1();
        print(score);
        F9(score);
        background(255);
        break;
      }
      
  }
}
/////////////////////////////////

function F1()  
{
  var flag=0;
  if(F8()==0)
  while(flag==0)
  {
    var temp=(int)(random(0,15));
    if(B[temp].get_value()==0)
    {
      if(random(0,100)<40)
      	B[temp].give_value(4);
      else
        B[temp].give_value(2);
      flag=1;
    }
  }
}

//////////////////////////////////
function F2()
{
  for(var j=0;j<3;j++)
  {
    var k=0;
    for(var i=0;i<12;i++)
  	{
      if(i%3==0) k++;
    	if(B[(4*k-1)-i%3].get_value()==B[(4*k-2)-i%3].get_value())
    	{
      	B[(4*k-1)-i%3].give_value(2*B[(4*k-2)-i%3].get_value());
      	B[(4*k-2)-i%3].give_value(0);
        score+=B[(4*k-1)-i%3].get_value();
    	}
    	else if(B[(4*k-1)-i%3].get_value()==0) 
    	{
     	 	B[(4*k-1)-i%3].give_value(B[(4*k-2)-i%3].get_value());
      	B[(4*k-2)-i%3].give_value(0);
    	}
  	}
  }
}
//////////////////////////////////
function F3()
{
  for(var j=0;j<3;j++)
  {
    var k=-1;
    for(var i=0;i<12;i++)
  	{
      if(i%3==0) k++;
    	if(B[(4*k)+i%3].get_value()==B[(4*k+1)+i%3].get_value())
    	{
      	B[(4*k)+i%3].give_value(2*B[(4*k+1)+i%3].get_value());
      	B[(4*k+1)+i%3].give_value(0);
        score+=B[(4*k)+i%3].get_value();
    	}
    	else if(B[(4*k)+i%3].get_value()==0) 
    	{
     	 	B[(4*k)+i%3].give_value(B[(4*k+1)+i%3].get_value());
      	B[(4*k+1)+i%3].give_value(0);
    	}
  	}
  }
}
//////////////////////////////////
function F4()	
{
  for(var j=0;j<3;j++)
  {
    for(var i=0;i<12;i++)
  	{
     	if(B[(int)(i/3)+4*(i%3)].get_value()==0) 
    	{
     	 	B[(int)(i/3)+4*(i%3)].give_value(B[(int)(i/3)+4*((i%3)+1)].get_value());
      	B[(int)(i/3)+4*((i%3)+1)].give_value(0);
        continue;
    	}
    	else if(B[(int)(i/3)+4*(i%3)].get_value()==B[(int)(i/3)+4*((i%3)+1)].get_value())
    	{
       	B[(int)(i/3)+4*(i%3)].give_value(2*B[(int)(i/3)+4*((i%3)+1)].get_value());
      	B[(int)(i/3)+4*((i%3)+1)].give_value(0);
        score+=B[(int)(i/3)+4*(i%3)].get_value();
    	}
    }
  }
}
//////////////////////////////////
function F5() 
{
  for(var j=0;j<3;j++)
  {
    for(var i=0;i<12;i++)
  	{
    	if(B[(int)(i/3)+4*(3-i%3)].get_value()==B[(int)(i/3)+4*(2-i%3)].get_value())
    	{
      	B[(int)(i/3)+4*(3-i%3)].give_value(2*B[(int)(i/3)+4*(2-i%3)].get_value());
      	B[(int)(i/3)+4*(2-i%3)].give_value(0);
        score+=B[(int)(i/3)+4*(3-i%3)].get_value();
    	}
    	else if(B[(int)(i/3)+4*(3-i%3)].get_value()==0) 
    	{
     	 	B[(int)(i/3)+4*(3-i%3)].give_value(B[(int)(i/3)+4*(2-i%3)].get_value());
      	B[(int)(i/3)+4*(2-i%3)].give_value(0);
    	}
  	}
  }
}
/////////////////////////////////////
function F6()  
{
  for(var i=0;i<16;i++)
  {
    B[i].show(F7(B[i].get_value()));
  }
}///////////////////////////////////////
function F7(value)  
{
  var Color = createVector();
  Color.x=(value*10)%255;
  Color.y=(value*50)%255;
  Color.z=(value*100)%255;
  return Color;
}
/////////////////////////////////////
function F8()  
{
  for(var i=0;i<16;i++)
  {
    if(B[i].get_value()==0)
    return 0;
  }
  return 1;
}
//////////////////////////////////////
function F9(score) 
{
  //////////name///////////////////
	textSize(70);
  fill(20,100,200);text("2",160,60);
  fill(0);text("0",200,60);
  fill(40,200,145);text("4",240,60);
  fill(80,145,35);text("8",280,60);
  ///////////score/////////////////
  fill(0);
  textSize(25);
  text("Score:"+score,40,90);
  textSize(15);
  text("(press enter to reset)",160,515);
  cat.resize(120,90);
  textSize(10);
  text("MIT License: copyright (c) 2019 aman deep",300,540)
  image(cat,360,10);
}
///////////////////////////////////////

///////////////////////////////////////
function F10()   
{
  for(var i=0;i<16;i++)
  {
    print(B[i].get_value()+"\n");
  }
}
