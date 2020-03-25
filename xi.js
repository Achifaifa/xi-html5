var c=document.getElementById("xi");
c.style.background="#000";
var ctx=c.getContext("2d");
ctx.canvas.width=1000;
ctx.canvas.height=1000;

//

version="0,1"

fps=30
interval=1000/fps
anistep=1
ani=0

//Auxiliary functions

function drawline(x1,y1,x2,y2)
{
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

//TO-DO import images

function logo_animation(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="45px sans-serif";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="center"
  ctx.fillText("愛智重工",500,500);
  ctx.font="20px sans-serif";
  ctx.fillText("Achi Heavy Industries",500,520)
  if (anistep==80){clearTimeout(ani);ani=setInterval(logo_animation, interval, 0)}
  if(i==1){anistep++;}else{anistep--;}
  if (anistep==0){clearTimeout(ani);ani=setInterval(title_animation, interval, 1)}
}

function title_animation(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="bold 120px quizma-thin";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="center"
  ctx.fillText("Xi",500,500);
  if (anistep==80){clearTimeout(ani);ani=setInterval(title_animation, interval, 0)}
  if(i==1){anistep++;}else{anistep--;}
  if (anistep==0){clearTimeout(ani);ani=setInterval(menu, interval, 1)}
}

function menu(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="bold 120px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.strokeStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="start"
  ctx.fillText("Xi",125,160);
  ctx.font="bold 20px quizma-light";
  ctx.fillText(version,210,160);
  ctx.font="bold 50px quizma-light";
  ctx.fillText("New game",150,260);
  ctx.fillText("Settings",150,360);
  ctx.fillText("Credits",150,460);
  drawline(80,120,80,880);
  drawline(80,120,100,120)
  if (anistep==80){clearTimeout(ani)}
  if(i==1){anistep++;}
  if (anistep==0){clearTimeout(ani)}
}



//---

//TO-DO side menu (drag to deploy)

//TO-DO click processing (pixels to coordinates)

//TO-DO check game state

//TO-DO possible moves

//TO-DO draw board

//TO-DO set up game state object

//TO-DO

//

//---

//TO-do main loop

// ani=setInterval(menu, interval, 1);
ani=setInterval(menu, interval, 1);
