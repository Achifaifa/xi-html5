var c=document.getElementById("xi")
c.style.background="#000"
var ctx=c.getContext("2d")
ctx.canvas.width=1000
ctx.canvas.height=1000
ctx.lineCap="round"

//

version="0,1"

//config

fps=30
interval=1000/fps
grid_type=0

//

anistep=1
ani=0
piece_size=(1000/12)-10
dot_size=piece_size/5

//

mouse_pos={x:0,y:0}
click_coords={x:-1, y:-1}
prev={x:-1, y:-1}
menu_option=-1
selected={x:-1, y:-1}

//

board=[]
turn=0

//Mobile detection

  try{document.createEvent("TouchEvent"); mobile=1;}
  catch(e){mobile=0}
  console.log(mobile)

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
  scalex=ctx.canvas.width/rect.width;  
  scaley=ctx.canvas.height/rect.height;  
  return {
    x: (e.clientX-rect.left)*scalex,
    y: (e.clientY-rect.top)*scaley
  };
}

function pixel_to_coord(px)
{
  return Math.ceil(px/(1000/6))-1
}

function coord_to_pixel(c)
{
  return (1000/12)*(1+(c*2))
}

function menu_alpha(y)
{
  if (mobile==0){return Math.abs(y-mouse_pos.y)}
  else {return 50}
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
  ctx.fillStyle="rgba(255,255,255,"+(50*malpha/menu_alpha(210))+")";
  ctx.fillText("New game",150,260);
  ctx.fillStyle="rgba(255,255,255,"+(50*malpha/menu_alpha(310))+")";
  ctx.fillText("Settings",150,360);
  ctx.fillStyle="rgba(255,255,255,"+(50*malpha/menu_alpha(410))+")";
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
  // ctx.fillText("Stuff",150,360);
  // ctx.fillText("Stuff2",150,460);
  ctx.font="45px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/menu_alpha(210))+")";
  ctx.fillText("Achifaifa",350,260);
  // ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(310-mouse_pos.y))+")";
  // ctx.fillText("bla",350,360);
  // ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/Math.abs(410-mouse_pos.y))+")";
  // ctx.fillText("bla",350,460);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/menu_alpha(710))+")";
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
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/menu_alpha(210))+")";
  ctx.fillText("Setting1",150,260);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/menu_alpha(310))+")";
  ctx.fillText("Setting2",150,360);
  ctx.fillStyle="rgba(255,255,255,"+(50*(anistep/50)/menu_alpha(410))+")";
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

function skip_to_menu(e)
{
  clearTimeout(ani);
  anistep=1
  ani=setInterval(menu, interval, 1)
  ctx.canvas.removeEventListener("click", skip_to_menu);
}

function update_menu_option(e)
{
  if(mouse_pos.y>175 && mouse_pos.y<270){menu_option=1;}
  else if(mouse_pos.y>270 && mouse_pos.y<370){menu_option=2;}
  else if(mouse_pos.y>370 && mouse_pos.y<470){menu_option=3;}
  else if(mouse_pos.y>470 && mouse_pos.y<570){menu_option=4;}
  else if(mouse_pos.y>670 && mouse_pos.y<770){menu_option=7;}
  else {menu_option=-1}
}

function update_click_coords()
{
  click_coords={
    x: Math.ceil(pixel_to_coord(mouse_pos.x)),
    y: Math.ceil(pixel_to_coord(mouse_pos.y))
  }
}

function main_menu_listener()
{  
  valid_options=[1,3]
  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", main_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
  }
  if (menu_option==1) 
  {
    initialize_board();
    ctx.canvas.addEventListener("click", main_game_listener, false);
    ani=setInterval(main_loop, interval, false);
  }
  // if (menu_option==2)
  // {
  //   ani=setInterval(settings, interval, 1);
  //   ctx.canvas.addEventListener("click", settings_menu_listener, false);

  // }
  if (menu_option==3)
  {
    ani=setInterval(credits, interval, 1);
    ctx.canvas.addEventListener("click", credits_menu_listener, false);
  }
}

function settings_menu_listener()
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

function credits_menu_listener()
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

function main_game_listener()
{

  update_click_coords();
  clicked_piece=board[click_coords.y][click_coords.x]

  if (prev.x!=-1 && possible_moves(prev).filter(e=>e.x==click_coords.x && e.y==click_coords.y).length>0)
  {
    move([prev,click_coords])
    selected={x:-1, y:-1}
    turn^=1
  }
  else if ((clicked_piece[0]=="w" && turn==1) || (clicked_piece[0]=="b" && turn==0))
  {
    prev.x=click_coords.x;
    prev.y=click_coords.y;
    selected.x=click_coords.x;
    selected.y=click_coords.y;
  }  
  else if ((click_coords.y==0 && turn==1 && homerow("w").every(e=>e=="")) || (click_coords.y==5 && turn==0 && homerow("b").every(e=>e=="")))
  {
    spawn(click_coords, ["b","w"][turn])
    turn^=1
  }
  else
  {
    selected={x:-1, y:-1}
    prev={x:-1, y:-1}
  }
}

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
        draw_line(cx-3,cy,cx+3,cy, "white", alpha);
        draw_line(cx,cy-3,cx,cy+3, "white", alpha);
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
  for (i=0; i<6; i++)
  {
    for (j=0; j<6; j++)
    {
      piece=board[j][i];
      if (piece!="")
      {
        c=piece[0];
        p=piece[1];
        switch(p)
        {
          case "a": draw_aon(i,j,c); break; 
          case "k": draw_khoyor(i,j,c); break;
          case "s": draw_ska(i,j,c); break;
          case "3": draw_san(i,j,c); break;
        }
      }
    }
  }
  if(selected.x!=-1)
  {
    draw_circle(coord_to_pixel(selected.x),coord_to_pixel(selected.y),1000/12.75);
    moves=possible_moves(selected)
    for (i=0; i<moves.length; i++)
    {
      m=moves[i]
      sw=board[m.y][m.x]
      if (sw==""){draw_circle(coord_to_pixel(m.x),coord_to_pixel(m.y),1000/20);}
      else if (sw[0]=="w"){draw_circle(coord_to_pixel(m.x),coord_to_pixel(m.y),1000/20,"black");}
      else if (sw[0]=="b"){draw_circle(coord_to_pixel(m.x),coord_to_pixel(m.y),1000/20);}
    }
  }
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
  ctx.lineWidth=1
}

//Game logic

function initialize_board()
{
  board[0]=["wa","wk","ws","ws","wk","wa"];
  board[5]=["ba","bk","bs","bs","bk","ba"];
  for (i=1; i<5; i++)
  {
    board[i]=Array(6).fill("")
  }
}

function check_game()
{
  1==1 
}

function possible_moves(coords)
{
  c={x:Number.parseFloat(coords.x), y:Number.parseFloat(coords.y)}
  piece=board[c.y][c.x]
  pc=piece[0]
  pt=piece[1]
  valid=[]

  switch(pt)
  {
    case "a":
      valid=
      [
        {x: c.x+1, y:c.y},
        {x: c.x-1, y:c.y},
        {x: c.x, y:c.y+1},
        {x: c.x, y:c.y-1}
      ]
    break;
    case "k":
      valid=
      [
        {x: c.x+2, y:c.y},
        {x: c.x-2, y:c.y},
        {x: c.x, y:c.y+2},
        {x: c.x, y:c.y-2}
      ]
    break;
    case "s":
      valid=
      [
        {x: c.x+1, y:c.y+1},
        {x: c.x-1, y:c.y-1},
        {x: c.x+1, y:c.y-1},
        {x: c.x-1, y:c.y+1}
      ]
    break;
    case "3":
      if (pc=="w")
      {
        valid=[{x:c.x, y:c.y+1}]
      }
      else
      {
        valid=[{x:c.x, y:c.y-1}]
      }
    break;
  }

  ret=[];
  for (i=0; i<valid.length; i++){
    cu=valid[i];
    if (cu.x>=0 && cu.x<6 && cu.y>=0 && cu.y<6)
    {
      if(board[cu.y][cu.x]=="" || board[cu.y][cu.x][0]!=pc)
      {
        ret.push(cu);
      }
    }
  }
  return ret
}

function homerow(colour)
{
  if (colour=="b"){return board[5]}
  else if (colour=="w"){return board[0]}
}

function move(mov)
{
  piece=String(board[mov[0].y][mov[0].x])
  board[mov[0].y][mov[0].x]=""
  board[mov[1].y][mov[1].x]=piece
}

function spawn(coords, c)
{
  board[coords.y][coords.x]=c+"3"
}

//---

ctx.canvas.addEventListener("click", skip_to_menu, false);
ani=setInterval(logo_animation, interval, 1);

// initialize_board()
// ctx.canvas.addEventListener("click", main_game_listener, false);
// ani=setInterval(main_loop, interval, false);