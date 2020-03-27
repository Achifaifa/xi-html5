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

sfx=1
sfx_types=["off", "on"]
music=1
music_types=["off", "on"]
grid=0
grid_types=["cross", "dot", "none"]
flip=0
flip_types=["adjacent", "opposed"]
difficulty=0
difficulty_types=["easy","easier","easiest"]
ai=0

//

anistep=1
ani=0
tutorial_page=0
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

//Adjusting css so canvas scales to fit window

if(window.innerWidth>window.innerHeight)
{
  document.getElementById("xi").style.width=""
  document.getElementById("xi").style.height="100%"
}

//Audio management

au=new Object();

au.play=function(s)
{
  if (sfx==1)
  {
    tem=eval("this."+s+".cloneNode();")
    tem.play()
  }
}

sounds=[
"menu_back",
"menu_select",
"menu_option",
]

function loader()
{
  for (i=0; i<sounds.length; i++)
  {
    it="./audio/"+sounds[i]+".wav";
    vname=sounds[i]
    eval("au."+vname+"=new Audio('"+it+"');");
  }
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
  ctx.lineWidth=1;
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
  ctx.font="20px quizma-light";
  ctx.fillText("Achi Heavy Industries",500,520)
  if (anistep==80){clearTimeout(ani);ani=setInterval(logo_animation, interval, 0)}
  if(i==1){anistep++;}else{anistep--;}
  if (anistep==0){clearTimeout(ani);ani=setInterval(title_animation, interval, 1)}
}

function title_animation(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="120px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="center"
  ctx.fillText("Xi",500,500);
  if (anistep==80)
  {
    clearTimeout(ani);
    ctx.canvas.addEventListener("click", main_menu_listener, false);
    ani=setInterval(title_animation, interval, 0)
  }
  if(i==1){anistep++;}else{anistep--;}
  if (anistep==0){clearTimeout(ani);ani=setInterval(menu, interval, 1)}
}

function menu()
{
  ctx.canvas.removeEventListener("click", skip_to_menu);
  ctx.clearRect(0,0,1000,1000)
  malpha=anistep/30;
  ctx.lineWidth=1;
  draw_line(80,120,80,880, "white", malpha);
  draw_line(80,120,100,120, "white", malpha);

  ctx.fillStyle="rgba(255,255,255,"+malpha+")";
  ctx.textAlign="start";

  ctx.font="120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="20px quizma-light";
  ctx.fillText(version,210,160);
  ctx.font="bold 50px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(200))+")";
  ctx.fillText("New game",150,260);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(300))+")";
  ctx.fillText("Play vs AI",150,360);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(400))+")";
  ctx.fillText("Tutorial",150,460);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(600))+")";
  ctx.fillText("Settings",150,660);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(700))+")";
  ctx.fillText("Credits",150,760);

  if (anistep<30){anistep++;} 
}

function credits()
{
  ctx.clearRect(0,0,1000,1000)

  calpha=anistep/30
  draw_line(80,120,80,880, "white", calpha);
  draw_line(80,120,100,120, "white", calpha);
  draw_line(250,120,275,120, "white", calpha);

  ctx.fillStyle="rgba(255,255,255,"+calpha+")";
  ctx.textAlign="start";

  ctx.font="120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="75px quizma-light";
  ctx.fillText("Credits",300,145);
  ctx.font="20px quizma-light";
  ctx.fillText(version,210,160);

  ctx.font="bold 50px quizma-light";
  ctx.fillText("Code",150,260);
  ctx.fillText("SFX",150,360);
  ctx.fillText("Font",150,460);
  ctx.fillStyle="rgba(255,255,255,"+(30*calpha/menu_alpha(700))+")";
  ctx.fillText("Back",150,760);

  ctx.font="45px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+(30*calpha/menu_alpha(200))+")";
  ctx.fillText("Achifaifa",350,260);
  ctx.fillStyle="rgba(255,255,255,"+(30*calpha/menu_alpha(300))+")";
  ctx.fillText("broumbroum",350,360);
  ctx.fillStyle="rgba(255,255,255,"+(50*calpha/menu_alpha(400))+")";
  ctx.fillText("Studio Typo",350,460);

  if (anistep<30){anistep++}
}

function settings()
{
  ctx.clearRect(0,0,1000,1000)

  salpha=anistep/30
  draw_line(80,120,80,880, "white", salpha);
  draw_line(80,120,100,120, "white", salpha);
  draw_line(250,120,275,120, "white", salpha);

  ctx.fillStyle="rgba(255,255,255,"+salpha+")";
  ctx.textAlign="start";

  ctx.font="120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="75px quizma-light";
  ctx.fillText("Settings",300,145);
  ctx.font="20px quizma-light";
  ctx.fillText(version,210,160);
  ctx.font="bold 50px quizma-light";

  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(200))+")";
  ctx.fillText("Grid",150,260);
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(300))+")";
  ctx.fillText("Players",150,360);
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(400))+")";
  ctx.fillText("SFX",150,460);
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(500))+")";
  ctx.fillText("Music",150,560);
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(600))+")";
  ctx.fillText("AI",150,660);
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(700))+")";
  ctx.fillText("Back",150,760);

  ctx.font="45px quizma-light";
  ctx.fillStyle="rgba(255,255,255,"+salpha+")";
  ctx.fillText(grid_types[grid],350,260);
  ctx.fillText(flip_types[flip],350,360);
  ctx.fillText(sfx_types[sfx],350,460);
  ctx.fillText(music_types[music],350,560);
  ctx.fillText(difficulty_types[difficulty],350,660);

  if (anistep<30){anistep++;}
}

function results()
{
  ctx.clearRect(0,0,1000,1000);
  draw_game();
  if (anistep<40)
  {
    ctx.fillStyle="rgba(0,0,0,"+(0.65*anistep/40)+")"
    ctx.fillRect(0,0,1000,1000)
  }
  if (anistep>=40)
  {
    ctx.fillStyle="rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,1000,1000);
    ctx.font="80px quizma-light";
    ctx.fillStyle="rgba(255,255,255,"+((anistep-40)/40)+")";
    ctx.textAlign="center"
    ctx.fillText("Finish!",500,450);
    ctx.font="70px quizma-light";
    if (anistep>80)
    {
      ctx.fillStyle="rgba(255,255,255,"+((anistep-80)/74)+")";
      if (check_game()==1)
      {
        ctx.fillText("Black wins",500,550);
      }
      else if (check_game()==-1)
      {
        ctx.fillText("White wins",500,550);
      }
    }
  }
  if(anistep<140){anistep++;}
}

function tutorial()
{
  ctx.clearRect(0,0,1000,1000)

  talpha=anistep/30
  draw_line(80,120,80,880, "white", talpha);
  draw_line(80,120,100,120, "white", talpha);
  draw_line(250,120,275,120, "white", talpha);

  ctx.fillStyle="rgba(255,255,255,"+talpha+")";
  ctx.textAlign="start";

  ctx.font="120px quizma-light";
  ctx.fillText("Xi",125,160);
  ctx.font="75px quizma-light";
  ctx.fillText("Tutorial",300,145);
  ctx.font="20px quizma-light";
  ctx.fillText(version,210,160);

  if(tutorial_page==0)
  {
    ctx.textAlign="start"
    ctx.font="60px quizma-light";
    ctx.fillText("Xi", 125,275);
    ctx.font="35px quizma-light";
    ctx.fillText("is an AI development focused board game",180,275)
    ctx.fillText("for two players",125,325)
    ctx.fillText("In this HTML5 version you can have a feel", 125,400)
    ctx.fillText("for the game and its strategies on any device", 125,450)
    ctx.fillText("before you download the desktop version", 125,500)
    ctx.fillText("Let's look at the pieces first", 125,575)

  }
  if(tutorial_page==1)
  {
    draw_aon(1,2,"w");
    draw_aon(1,3,"b");
    ctx.textAlign="center"
    ctx.font="bold 40px quizma-light";
    ctx.fillText("Aon",250,300)
    ctx.textAlign="start"
    ctx.font="35px quizma-light";
    ctx.fillText("They move to an adjacent square",375,500)

  }
  if(tutorial_page==2)
  {
    draw_khoyor(1,2,"w");
    draw_khoyor(1,3,"b");
    ctx.textAlign="center"
    ctx.font="bold 40px quizma-light";
    ctx.fillText("Khoyor",250,300)
    ctx.textAlign="start"
    ctx.font="35px quizma-light";
    ctx.fillText("They move two squares on any",375,500)
    ctx.fillText("direction",375,550)

  }
  if(tutorial_page==3)
  {
    draw_ska(1,2,"w");
    draw_ska(1,3,"b");
    ctx.textAlign="center"
    ctx.font="bold 40px quizma-light";
    ctx.fillText("Ska",250,300)
    ctx.textAlign="start"
    ctx.font="35px quizma-light";
    ctx.fillText("They move one square diagonally",375,500)

  }
  if(tutorial_page==4)
  {
    draw_san(1,2,"w");
    draw_san(1,3,"b");
    ctx.textAlign="center"
    ctx.font="bold 40px quizma-light";
    ctx.fillText("San",250,300)
    ctx.textAlign="start"
    ctx.font="35px quizma-light";
    ctx.fillText("They move one square forward",375,500)

  }
  if(tutorial_page==5)
  {
    ctx.textAlign="start"
    ctx.font="60px quizma-light";
    ctx.fillText("Rules", 125,275);
    ctx.font="35px quizma-light";
    ctx.fillText("- Black moves first, then players alternate",125,350)
    ctx.fillText("- On a turn, the player can either:",125,400)
    ctx.fillText("Move a piece",200,450)
    ctx.fillText("Spawn a san in their home row if its empty",200,500)
    ctx.fillText("-A piece can be captured by moving to its position",125,550)
  }
  if(tutorial_page==6)
  {
    ctx.textAlign="start"
    ctx.font="60px quizma-light";
    ctx.fillText("Win conditions", 125,275);
    ctx.font="35px quizma-light";
    ctx.fillText("A player wins when",125,350)
    ctx.fillText("They place a san on the opponent's home row",200,400)
    ctx.fillText("They take their opponent's last piece",200,450)
  }
  if(tutorial_page>6)
  {
    ctx.textAlign="start"
    ctx.font="60px quizma-light";
    ctx.fillText("Desktop Xi", 125,275);
    ctx.font="35px quizma-light";
    ctx.fillText("If you want to develop your own AI, play",125,350)
    ctx.fillText("and test your AIs online and get statistics",125,400)
    ctx.fillText("on their performance, you'll need to download", 125,450)
    ctx.fillText("the desktop version, available", 125,500)
    ctx.fillText("Have fun, and thanks for playing", 125,600)
    ctx.fillStyle="rgba(255,255,255,"+(30/menu_alpha(500))+")";
    ctx.fillText("here",570,500)
  }


  if (anistep<30){anistep++}
}

function main_loop()
{
  //initial fade, done manually
  ctx.clearRect(0,0,1000,1000);

  draw_grid();
  draw_game();
  if (anistep<50)
  {
    ca=-(1.1-(50/anistep))
    ctx.fillStyle="rgba(0,0,0,"+ca+")"
    ctx.fillRect(0,0,1000,1000)
  }
  anistep++; 
}

//Listeners


function skip_to_menu(e,mute=0)
{
  if (mute==0){au.play("menu_select")}
  clearTimeout(ani);
  anistep=1
  ai=0
  ctx.canvas.addEventListener("click", main_menu_listener, false);
  ani=setInterval(menu, interval, 1)
  ctx.canvas.removeEventListener("click", skip_to_menu);
}

function update_menu_option()
{
       if(mouse_pos.y>220 && mouse_pos.y<270){menu_option=1;}
  else if(mouse_pos.y>320 && mouse_pos.y<370){menu_option=2;}
  else if(mouse_pos.y>420 && mouse_pos.y<470){menu_option=3;}
  else if(mouse_pos.y>520 && mouse_pos.y<570){menu_option=4;}
  else if(mouse_pos.y>620 && mouse_pos.y<670){menu_option=5;}
  else if(mouse_pos.y>720 && mouse_pos.y<770){menu_option=6;}
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
  valid_options=[1,2,3,5,6]

  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", main_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
  }
  if (menu_option==1) 
  {
    au.play("menu_select")
    initialize_board();
    ctx.canvas.addEventListener("click", main_game_listener, false);
    ani=setInterval(main_loop, interval, false);
  }
  if (menu_option==2){
    au.play("menu_select")
    initialize_board();
    ai=1
    ctx.canvas.addEventListener("click", main_game_listener, false);
    ani=setInterval(main_loop, interval, false);
  }
    if (menu_option==3){
    au.play("menu_select")
    ctx.canvas.addEventListener("click", tutorial_listener, false);
    ani=setInterval(tutorial, interval, false);
  }
  if (menu_option==5)
  {
    au.play("menu_select")
    ani=setInterval(settings, interval, 1);
    ctx.canvas.addEventListener("click", settings_menu_listener, false);
  }
  if (menu_option==6)
  {
    au.play("menu_select")
    ani=setInterval(credits, interval, 1);
    ctx.canvas.addEventListener("click", credits_menu_listener, false);
  }
}

function settings_menu_listener()
{
  valid_options=[1,2,3,4,5,6]
  if (valid_options.includes(menu_option))
  {
    if (menu_option==1)
    {
      au.play("menu_option")
      grid=(grid+1)%grid_types.length
    }
    if (menu_option==2)
    {
      au.play("menu_option")
      flip=(flip+1)%flip_types.length
    }
    if (menu_option==3)
    {
      au.play("menu_option")
      sfx=(sfx+1)%sfx_types.length
    }
    if (menu_option==4)
    {
      au.play("menu_option")
      music=(music+1)%music_types.length
    }
    if (menu_option==5)
    {
      au.play("menu_option")
      difficulty=(difficulty+1)%difficulty_types.length
    }
    else if (menu_option==6)
    {
      au.play("menu_back")
      ctx.canvas.removeEventListener("click", settings_menu_listener, false);
      skip_to_menu(1,1)
    } 
  }
}

function credits_menu_listener()
{
  valid_options=[1,2,3,6]
  {
    if (menu_option==1)
    {
      au.play("menu_option")
      window.open('https://github.com/achifaifa')
    }
    if (menu_option==2)
    {
      au.play("menu_option")
      window.open('https://freesound.org/people/broumbroum/')
    }
    if (menu_option==3)
    {
      au.play("menu_option")
      window.open('http://www.studiotypo.com/')
    }    
    if (menu_option==6)
    {
      au.play("menu_back")
      ctx.canvas.removeEventListener("click", credits_menu_listener, false);
      skip_to_menu(1,1)
    }
  }
}

function tutorial_listener()
{
  if(tutorial_page<8)
  {
    tutorial_page+=1;
  }
  if(tutorial_page>=8)
  {
    if(mouse_pos.y>450 && mouse_pos.y<550){
      window.open('https://github.com/achifaifa/xi')
    }
    else
    {
      ctx.canvas.removeEventListener("click", tutorial_listener);
      skip_to_menu();
      tutorial_page=0
      return 1
    }
  }
  au.play("menu_option")
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

  if (ai==1 && turn==1 && check_game()==0)
  {
    ai_move()
    turn^=1
  }

  if (check_game()!=0)
  {
    anistep=1
    ctx.canvas.removeEventListener("click", main_game_listener);
    clearTimeout(ani);
    ani=setInterval(results, interval, false);
    ctx.canvas.addEventListener("click", skip_listener);
  }
}

function skip_listener()
{
  ctx.canvas.removeEventListener("click", skip_listener);
  skip_to_menu();
}

//Drawing functions

function draw_grid()
{
  ctx.lineWidth=1;
  for (cx=1000/6; cx<1000-(1000/6); cx+=1000/6){
    for (cy=1000/6; cy<1000-(1000/6); cy+=1000/6){
      if(grid==0){
        draw_line(cx-3,cy,cx+3,cy, "white");
        draw_line(cx,cy-3,cx,cy+3, "white");
      }
      if(grid==1)
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
          case "z": draw_san(i,j,c); break;
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

function draw_aon(x,y,colour)
{
  ctx.lineWidth=1;
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  if (colour=="w")
  {
    fill_circle(pxx,pxy, piece_size, "white");
    fill_circle(pxx,pxy, dot_size, "black");
  }
  else if (colour=="b")
  {
    draw_circle(pxx,pxy, piece_size, "white");
    fill_circle(pxx,pxy, dot_size, "white");
  }
}

function draw_khoyor(x,y,colour)
{
  ddiff=dot_size*1.25;
  ctx.lineWidth=1;
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  if (colour=="w")
  {
    fill_circle(pxx,pxy, piece_size, "white");
    fill_circle(pxx-ddiff,pxy-ddiff, dot_size, "black");
    fill_circle(pxx+ddiff,pxy+ddiff, dot_size, "black");  
  }
  else if (colour=="b")
  {
    draw_circle(pxx,pxy, piece_size, "white");
    fill_circle(pxx-ddiff,pxy-ddiff, dot_size, "white");
    fill_circle(pxx+ddiff,pxy+ddiff, dot_size, "white"); 
  }
  ctx.lineWidth=1;
}

function draw_ska(x,y,colour)
{
  ctx.lineWidth=1;
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  ddiff=dot_size*1.5;
  if (colour=="w")
  {
    fill_circle(pxx,pxy, piece_size, "white");
    ctx.lineWidth=dot_size*2;
    draw_line(pxx-ddiff,pxy-ddiff,pxx+ddiff,pxy+ddiff, "black");
  }
  else if (colour=="b")
  {
    draw_circle(pxx,pxy, piece_size, "white");
    ctx.lineWidth=dot_size*2;
    draw_line(pxx-ddiff,pxy-ddiff,pxx+ddiff,pxy+ddiff, "white");
  }
  ctx.lineWidth=1
}

function draw_san(x,y,colour)
{
  pxx=coord_to_pixel(x);
  pxy=coord_to_pixel(y);
  ctx.lineWidth=dot_size*3;

  if (colour=="w" && flip==0)
  {
    draw_line(pxx-40,pxy+40,pxx+40,pxy+40, "white");
    draw_line(pxx-40,pxy+40,pxx,pxy-15, "white");
    draw_line(pxx+40,pxy+40,pxx,pxy-15, "white");
  }
  else if (colour=="w")
  {
    draw_line(pxx-40,pxy-40,pxx+40,pxy-40, "white");
    draw_line(pxx-40,pxy-40,pxx,pxy+15, "white");
    draw_line(pxx+40,pxy-40,pxx,pxy+15, "white");
  }
  else if (colour=="b")
  {
    draw_line(pxx-40,pxy+40,pxx+40,pxy+40, "white");
    draw_line(pxx-40,pxy+40,pxx,pxy-15, "white");
    draw_line(pxx+40,pxy+40,pxx,pxy-15, "white");
    draw_line(pxx-39,pxy+39,pxx+39,pxy+39, "black");
    draw_line(pxx-39,pxy+39,pxx,pxy-14, "black");
    draw_line(pxx+39,pxy+39,pxx,pxy-14, "black");
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
  if(homerow("b").filter(e=>e=="wz").length>0){return -1}
  if(homerow("w").filter(e=>e=="bz").length>0){return 1}

  piececount={"b":0, "w":0}
  for(i=0; i<6; i++)
  {
    for(j=0; j<6; j++)
    {
      it=board[j][i]
      if(it!="")
      {
        eval("piececount."+it[0]+"+=1");
      }
    }
  }
  if (piececount.b==0){return -1}
  else if (piececount.w==0){return 1}
  return 0
}

function possible_moves(c)
{
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
    case "z":
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
  board[coords.y][coords.x]=c+"z";
}

function ai_move()
{
  aipieces=[]
  for(i=0; i<6; i++)
  {
    for(j=0; j<6; j++)
    {
      it=board[j][i]
      if(it!="")
      {
        if(it[0]=="w")
        {
          aipieces.push({x:i, y:j})
        }
      }
    }
  }

  if (difficulty==0)
  {
    //Take pieces if possible
    for(k=0; k<aipieces.length; k++)
    {
      taimoves=possible_moves(aipieces[k])
      for(j=0; j<taimoves.length; j++)
      {
        it=taimoves[j]
        if(board[it.y][it.x]!="")
        {
          if(board[it.y][it.x][0]=="b")
          {
            move([aipieces[k],it])
            return 1
          }
        }
      }
    }
    //move pieces in homerow
    aipieceshr=aipieces.filter(a=>a.y==0)
    if (aipieceshr.length>0 && aipieceshr.filter(a=>possible_moves(a).length>0).length>0)
    {
      while(1==1)
      {
        it=aipieceshr[parseInt(Math.random()*aipieceshr.length)]
        pm=possible_moves(it)
        if(pm.length>0)
        {
          move([it,pm[parseInt(Math.random()*pm.length)]])
          return 1
        }
      }
    } 
  }
  if (difficulty<=1)
  {
    //Spawn if homerown is empty
    if(homerow("w").filter(a=>a!="").length==0)
    {
      spawn({x: parseInt(Math.random()*5), y:0},"w")
      return 1
    }
    //Move sans first
    for (k=0; k<aipieces.length; k++)
    {
      it=aipieces[k]
      if(board[it.y][it.x][1]=="z")
      {
        if(possible_moves(it).length>0)
        {
          move([it,possible_moves(it)[0]])
          return 1
        }
      }
    } 
  }
  while(1==1)
  {
    cpiece=aipieces[parseInt(Math.random()*aipieces.length)]
    cpmoves=possible_moves(cpiece)
    if(cpmoves.length>0)
    {
      move([cpiece,cpmoves[parseInt(Math.random()*cpmoves.length)]])
      return 1
    }
  }
}

//Always-on listeners

ctx.canvas.addEventListener("click", update_menu_option);
ctx.canvas.addEventListener('mousemove', function(e){
  mouse_pos = mouse_position(ctx.canvas, e);
}, false);

//Main listener

ctx.canvas.addEventListener("click", skip_to_menu);
loader()
ani=setInterval(logo_animation, interval, 1);
