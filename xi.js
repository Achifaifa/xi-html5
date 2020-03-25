var c=document.getElementById("xi");
c.style.background="#000";
var ctx=c.getContext("2d");
ctx.canvas.width=1000;
ctx.canvas.height=1000;
ctx.lineCap = "round";

//

version="0,1"

//config

fps=30
interval=1000/fps
mouse_pos={x:0,y:0}
menu_option=-1
grid_type=0

//

anistep=1
ani=0
piece_size=(1000/12)-10
dot_size=piece_size/5
homerow_b=["ba","bk","bs","bs","bk","ba"]
homerow_w=["wa","wk","ws","ws","wk","wa"]

board=new Array(4);
for (var i=0; i<4; i++) {
  board[i] = new Array(6);
}

//Auxiliary functions

function draw_line(x1,y1,x2,y2,colour="white",alpha=1)
{
  pa=ctx.globalAlpha;
  if (colour!="black"){ctx.globalAlpha=alpha;}
  ctx.strokeStyle=colour;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
  ctx.globalAlpha=pa;
}

function draw_circle(x,y,size,colour="white",alpha=1)
{
  pa=ctx.globalAlpha;
  if (colour!="black"){ctx.globalAlpha=alpha;}
  ctx.strokeStyle=colour;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2*Math.PI, true);
  ctx.stroke();
  ctx.globalAlpha=pa;
}

function fill_circle(x,y,size,colour="white",alpha=1)
{
  pa=ctx.globalAlpha;
  if (colour!="black"){ctx.globalAlpha=alpha;}
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2*Math.PI, true);
  ctx.fillStyle=colour;
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha=pa;
}

function mouse_position(c, e) {
  var rect=c.getBoundingClientRect();
  return {
    x: e.clientX-rect.left,
    y: e.clientY-rect.top
  };
}

function pixel_to_coord(px)
{
  return Math.floor(px/(1000/6))
}

function coord_to_pixel(c)
{
  return (1000/12)*(1+(c*2))
}

//Intro and menus

function logo_animation(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="45px sans-serif";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="center"
  ctx.fillText("愛智重工",500,500);
  ctx.font="20px quizma-thin";
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

function menu()
{
  ctx.clearRect(0,0,1000,1000)
  malpha=anistep/50;
  draw_line(80,120,80,880, "white", malpha);
  draw_line(80,120,100,120, "white", malpha);

  ctx.fillStyle="rgba(255,255,255,"+malpha+")";
  ctx.textAlign="start";

  ctx.font="bold 120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="bold 20px quizma-light";
  ctx.fillText(version,210,160);
  ctx.font="bold 50px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(210-mouse_pos.y))+")";
  ctx.fillText("New game",150,260);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(310-mouse_pos.y))+")";
  ctx.fillText("Settings",150,360);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(410-mouse_pos.y))+")";
  ctx.fillText("Credits",150,460);
  if (anistep<50){anistep++;}
  else if (anistep==50){anistep++; ctx.canvas.addEventListener("click", main_menu_listener, false)}
 
}

function credits()
{
  ctx.clearRect(0,0,1000,1000)

  calpha=anistep/50
  draw_line(80,120,80,880, "white", calpha);
  draw_line(80,120,100,120, "white", calpha);
  draw_line(250,120,275,120, "white", calpha);

  ctx.fillStyle="rgba(255,255,255,"+calpha+")";
  ctx.textAlign="start";

  ctx.font="bold 120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="bold 75px quizma-light";
  ctx.fillText("Credits",300,145);
  ctx.font="bold 20px quizma-light";
  ctx.fillText(version,210,160);
  ctx.font="bold 50px quizma-light";
  ctx.fillText("Code",150,260);
  ctx.fillText("Stuff",150,360);
  ctx.fillText("Stuff2",150,460);
  ctx.font="45px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(210-mouse_pos.y))+")";
  ctx.fillText("bla",350,260);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(310-mouse_pos.y))+")";
  ctx.fillText("bla",350,360);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(410-mouse_pos.y))+")";
  ctx.fillText("bla",350,460);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(710-mouse_pos.y))+")";
  ctx.fillText("Back",150,760);

  if (anistep<50){anistep++}
 
}

function settings()
{
  ctx.clearRect(0,0,1000,1000)

  salpha=anistep/50
  draw_line(80,120,80,880, "white", salpha);
  draw_line(80,120,100,120, "white", salpha);
  draw_line(250,120,275,120, "white", salpha);

  ctx.fillStyle="rgba(255,255,255,"+salpha+")";
  ctx.textAlign="start";

  ctx.font="bold 120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="bold 75px quizma-light";
  ctx.fillText("Settings",300,145);
  ctx.font="bold 20px quizma-light";
  ctx.fillText(version,210,160);
  ctx.font="bold 50px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(210-mouse_pos.y))+")";
  ctx.fillText("Setting1",150,260);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(310-mouse_pos.y))+")";
  ctx.fillText("Setting2",150,360);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(410-mouse_pos.y))+")";
  ctx.fillText("Setting3",150,460);
  ctx.font="45px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/50)+")";
  ctx.fillText("bla",350,260);
  ctx.fillText("bla",350,360);
  ctx.fillText("bla",350,460);
  ctx.fillStyle="rgba(255,255,255,"+(anistep/50)+")";  ctx.fillText("Back",150,760);
  if (anistep<50){anistep++;}
  
}

function main_loop()
{
  //initial fade, done manually
  ctx.clearRect(0,0,1000,1000);

  if (anistep<100)
  {
    anistep++; 
    draw_grid(anistep/50);
    if (anistep>50)
    {
      piecealpha=(anistep-50)/50;
      draw_aon(0,0,"w",piecealpha);
      draw_aon(5,0,"w",piecealpha);
      draw_aon(0,5,"b",piecealpha);
      draw_aon(5,5,"b",piecealpha);
      draw_khoyor(1,0,"w",piecealpha);
      draw_khoyor(4,0,"w",piecealpha);
      draw_khoyor(1,5,"b",piecealpha);
      draw_khoyor(4,5,"b",piecealpha);
      draw_ska(2,0,"w",piecealpha);
      draw_ska(3,0,"w",piecealpha);
      draw_ska(2,5,"b",piecealpha);
      draw_ska(3,5,"b",piecealpha);
    }
  }

  //Actual game loop
  else
  {
    draw_game();
  }
}

//Listeners

function skip_to_menu(e){
  clearTimeout(ani);
  anistep=1
  ani=setInterval(menu, interval, 1)
  ctx.canvas.removeEventListener("click", skip_to_menu);
}

function update_menu_option(e){

  if(mouse_pos.y>175 && mouse_pos.y<270){menu_option=1;}
  else if(mouse_pos.y>270 && mouse_pos.y<370){menu_option=2;}
  else if(mouse_pos.y>370 && mouse_pos.y<470){menu_option=3;}
  else if(mouse_pos.y>470 && mouse_pos.y<570){menu_option=4;}

  else if(mouse_pos.y>670 && mouse_pos.y<770){menu_option=7;}
  else {menu_option=-1}
}

function main_menu_listener(e){
  
  valid_options=[1,2,3]
  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", main_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
  }
  if (menu_option==1) 
  {
    ani=setInterval(main_loop, interval, false);
  }
  if (menu_option==2)
  {
    ani=setInterval(settings, interval, 1);
    ctx.canvas.addEventListener("click", settings_menu_listener, false);

  }
  if (menu_option==3)
  {
    ani=setInterval(credits, interval, 1);
    ctx.canvas.addEventListener("click", credits_menu_listener, false);
  }
}

function settings_menu_listener(e)
{
  valid_options=[7]
  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", settings_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
  }
  if (menu_option==7)
  {
    ani=setInterval(menu, interval, 1);
  } 
}

function credits_menu_listener(e)
{
  valid_options=[7]
  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", credits_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
  }
  if (menu_option==7)
  {
    ani=setInterval(menu, interval, 1);
  }
}

ctx.canvas.addEventListener("click", skip_to_menu, false);
ctx.canvas.addEventListener("click", update_menu_option);
ctx.canvas.addEventListener('mousemove', function(e) {
  mouse_pos = mouse_position(ctx.canvas, e);
}, false);

//Drawing functions

function draw_grid(alpha=1)
{
  ctx.lineWidth=1;
  for (cx=1000/6; cx<1000-(1000/6); cx+=1000/6){
    for (cy=1000/6; cy<1000-(1000/6); cy+=1000/6){
      if(grid_type==0){
        draw_line(cx-5,cy,cx+5,cy, "white", alpha);
        draw_line(cx,cy-5,cx,cy+5, "white", alpha);
      }
      if(grid_type==1)
      {
        ctx.strokeRect(cx,cy,1,1);
      }
    }
  }
}

function draw_game()
{
  draw_grid();
  //Process pieces
}

function draw_aon(x,y,colour,alpha=1)
{
  ctx.lineWidth=1;
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  if (colour=="w")
  {
    fill_circle(pxx,pxy, piece_size, "white", alpha);
    fill_circle(pxx,pxy, dot_size, "black", alpha);
  }
  else if (colour=="b")
  {
    draw_circle(pxx,pxy, piece_size, "white", alpha);
    fill_circle(pxx,pxy, dot_size, "white", alpha);
  }
}

function draw_khoyor(x,y,colour,alpha=1)
{
  ddiff=dot_size*1.25;
  ctx.lineWidth=1;
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  if (colour=="w")
  {
    fill_circle(pxx,pxy, piece_size, "white", alpha);
    fill_circle(pxx-ddiff,pxy-ddiff, dot_size, "black", alpha);
    fill_circle(pxx+ddiff,pxy+ddiff, dot_size, "black", alpha);  
  }
  else if (colour=="b")
  {
    draw_circle(pxx,pxy, piece_size, "white", alpha);
    fill_circle(pxx-ddiff,pxy-ddiff, dot_size, "white", alpha);
    fill_circle(pxx+ddiff,pxy+ddiff, dot_size, "white", alpha); 
  }
}

function draw_ska(x,y,colour,alpha=1)
{
  ctx.lineWidth=1;
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  ddiff=dot_size*1.5;
  if (colour=="w")
  {
    fill_circle(pxx,pxy, piece_size, "white", alpha);
    ctx.lineWidth=dot_size*2;
    draw_line(pxx-ddiff,pxy-ddiff,pxx+ddiff,pxy+ddiff, "black", alpha);
  }
  else if (colour=="b")
  {
    draw_circle(pxx,pxy, piece_size, "white", alpha);
    ctx.lineWidth=dot_size*2;
    draw_line(pxx-ddiff,pxy-ddiff,pxx+ddiff,pxy+ddiff, "white", alpha);
  }
}

function draw_san(x,y,colour,alpha=1)
{
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  ctx.lineWidth=dot_size*3;
  draw_line(pxx-40,pxy+40,pxx+40,pxy+40, alpha);
  draw_line(pxx-40,pxy+40,pxx,pxy-15, alpha);
  draw_line(pxx+40,pxy+40,pxx,pxy-15, alpha);
  if (colour=="b")
  {
    ctx.strokeStyle="black";
    draw_line(pxx-39,pxy+39,pxx+39,pxy+39, alpha);
    draw_line(pxx-39,pxy+39,pxx,pxy-14, alpha);
    draw_line(pxx+39,pxy+39,pxx,pxy-14, alpha);
  }
}

//Game logic

function check_game()
{
  1==1 
}

function possible_moves(colour)
{
  1==1
}

function homerow(colour)
{
  1==1
}

function move(mov)
{
  1==1
}

function spawn(file, c)
{
  1==1
}

//TO-DO side menu (drag to deploy)

//

//---

ani=setInterval(logo_animation, interval, 1);
