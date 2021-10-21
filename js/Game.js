class Game
{
  constructor()
  {

  }

 getState()
 {
    var gameStateRef=database.ref("gameState");
    gameStateRef.on("value",function(data)
    {
      gameState=data.val();
    }
  );
 }

 update(state)
 {
  database.ref('/').update(
   {
    gameState:state
   }
  );
 }

async start()
 {
  if(gameState===0)
  {
   player=new Player();
   var playerCountRef=await database.ref('playerCount').once('value');
   if(playerCountRef.exists())
   {
     playerCount=playerCountRef.val();
     player.getCount()
   }
   form=new Form();
   form.display();
  }
  car1=createSprite(100,200);
  car1.addImage("car1",carImg1);
  car2=createSprite(300,200);
  car2.addImage("car2",carImg2);
  car3=createSprite(500,200);
  car3.addImage("car3",carImg3);
  car4=createSprite(700,200);
  car4.addImage("car4",carImg4);
  cars=[car1,car2,car3,car4];
 }

 play()
 {
  form.hide();

    Player.getPlayerInfo();

   player.getCarsAtEnd();
    
    if(allPlayers !== undefined)
    {
      background=("#C68767");
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index=0;
      var x=400;
      var y;
      for(var plr in allPlayers)
      {
        index=index+1;
        x=x+230;
        y=displayHeight-allPlayers[plr].distance;
        cars[index-1].x=x;
        cars[index-1].y=y;
         
        if(index===player.index)
        {
          fill('Red');
          stroke(10);
          ellipse(x,y,60,60)
          cars[index-1].shapeColor="red";
          camera.position.x=displayWidth/2;
          camera.position.y=cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=50
      player.update();
    }

    if(player.distance>4200)
    {
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
 } 

 end()
 {
   console.log("game ended")
   console.log(player.rank)
 }

}