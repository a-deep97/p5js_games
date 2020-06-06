//variable declaration
var offset1, offset2;
var circlex, circley;
var score = 0;
var flagx, flagy, speed;
var r, g, b;
var count = 0;
var count_flag = 1;
var score=0;
var factor;
var gameover=false;
//setup function
function setup() {
  factor=1;
  speed = 1;
  flagx = 1;
  flagy = -1;
  r = g = b = 0;//RGB VALUES
  offset1 = offset2 = 0;//y coordinate variable for side blocks
  circlex = 300; // cirle x
  circley = 200;	//  circle y
  var cnv=createCanvas(600*factor, 400*factor);
  var x=(windowWidth-width)/2;
  var y=(windowHeight-height)/2;
  cnv.position(x,y); 	
}

function draw() 
{
  
  background(count);
  noStroke();
  fill(255 - count);
  ellipse(circlex, circley, 50, 50);
  fill(255-count);
  rectMode(CENTER);
  rect(15, offset1, 20, 100);
  rect(580, offset2, 20, 100);
  fill(255-count);
  textSize(20);
  text("score:"+score,260,10,20,20);
  circlex += flagx*speed;
  circley += flagy*speed;
  if (circlex < 0 || circlex > 600) {	circlex = 300; gameover=true;}
  if (circley > (offset2 - 50) && circley < (offset2 + 50))
    if (circlex == 545) flagx = -1;
	if (circley > (offset1 - 50) && circley < (offset1 + 50))
    if (circlex == 50) flagx = 1;

  if (circley == 25) flagy = 1;
  else if (circley > 375) flagy = -1;
  if (mouseX < width / 2) {
    offset1 = map(mouseY, 0, 400, 50, 350);
    if (mouseY > 400) offset1 = 350;
  } else {
    offset2 = map(mouseY, 0, 400, 50, 350);
    if (mouseY > 400) offset2 = 350;
  }
  print(circlex, circley);
  if (count > 255) {count_flag = -1;}
  else if (count < 0) count_flag = 1;
  count += count_flag;
	if(!gameover)score++;
}
