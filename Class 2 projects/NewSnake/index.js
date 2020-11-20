/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 120;
//Some Keys
   var KEY =
  {
    "UP": 87,
    "DOWN": 83,
    "LEFT": 65,
    "RIGHT": 68,
    "G":71,
  }
  //Other vars
  var buttonPressed = false;
  var goingLeft = false;
  var goingRight = false;
  var goingUp = false;
  var goingDown = false;
  var points = 0;

  var speed = 20;
  // Game Item Objects
function MakeHead($elementId, x, y, speedX, speedY, width, height)
{
  var gameItem = {};
  gameItem.id = $elementId;
  gameItem.x = x;
  gameItem.y = y;
  gameItem.speedX  = speedX;
  gameItem.speedY = speedY;
  gameItem.width =  width;
  gameItem.height =  height;
  return gameItem;
}
function MakeBody($elementId, x, y, width, height)
{
  var gameItem = {};
  gameItem.id = $elementId;
  gameItem.x = x;
  gameItem.y = y;
  gameItem.width =  width;
  gameItem.height =  height;
  return gameItem;
}
//Apple
var Apple = {}
Apple.x = 220;
Apple.y = 220;
Apple.width = 20;
Apple.height = 20;

$("#Apple").css("top", Apple.y);
$("#Apple").css("left", Apple.x);

var snakeArray = [MakeHead("#Snake", 100, 100, 0, 0, 20, 20,),];
//Snake head
var head = snakeArray[0];
//tail thingyy
var tail = snakeArray[snakeArray.length - 1]
//var tail = snakeArray[snakeArray.length - 1];

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', HandleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() 
  {
    repositionSnake();
    NoNoZone(head);
    //fun names
    Cannibalism();
    eatApple();
    buttonPressed = false;
  }
  
  /* 
  Called in response to events.
  */
  function HandleKeyDown(event)
  {

    //Snake brain controles
    if(event.which === KEY.LEFT && !goingRight && !buttonPressed)
    {
        goingLeft = true;
        buttonPressed = true;
        head.speedY = 0;
        head.speedX = -speed;
        goingUp = false;
        goingDown = false;
    }
    if(event.which === KEY.RIGHT && !goingLeft && !buttonPressed)
    {
        goingRight = true;
        buttonPressed = true;
        head.speedY = 0;
        head.speedX = speed;
        goingUp = false;
        goingDown = false;
    }
    if(event.which === KEY.UP && !goingDown && !buttonPressed)
    {
        goingUp = true;
        buttonPressed = true;
        head.speedX = 0;
        head.speedY = -speed;
        goingLeft = false;
        goingRight = false;
    }
    if (event.which === KEY.DOWN && !goingUp && !buttonPressed)
    {
        goingDown = true;
        buttonPressed = true;
        head.speedX = 0;
        head.speedY = speed;
        goingLeft = false;
        goingRight = false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
function repositionSnake()
 {
    //Makes the snake slither
    for(var i = snakeArray.length - 1; i >= 1; i--)
    {
        //repositions snake body   
        snakeArray[i].x = snakeArray[i-1].x;
        snakeArray[i].y = snakeArray[i-1].y;
        $(snakeArray[i].id).css("top", snakeArray[i-1].y);
        $(snakeArray[i].id).css("left", snakeArray[i-1].x);
    }
    //repositions snake head
    head.y += head.speedY;
    head.x += head.speedX;
    $("#Snake").css("top", head.y);
    $("#Snake").css("left", head.x);
 }

 //if the snake collides with it's self
 function Cannibalism()
 {
    for(var i = 0; i < snakeArray.length; i++)
    {
        if(DoCollide(head, snakeArray[i]) && snakeArray[i] != snakeArray[0])
        {
           endGame();
           //For "debug" reasons, also the amime is pretty good but the manga is better
            console.log("Berserk is pretty cool");
            break;
        }
    }
 }
 
// repositions apple
function repositionApple()
{
    Apple.y = MulitipleOf20();
    Apple.x = MulitipleOf20();
    $("#Apple").css("top", Apple.y);
    $("#Apple").css("left", Apple.x);

    for(var i = 0; i < snakeArray.length; i++)
    {
        if(DoCollide(Apple, snakeArray[i]))
        {
           repositionApple();
            break;
        }
    }
}

//does colidey things
function DoCollide(obj1, obj2)
{
    //obj1
    obj1.right = obj1.x + obj1.width;
    obj1.botom = obj1.y + obj1.height;
    obj1.left = obj1.x;
    obj1.top = obj1.y;
    
    //obj2
    obj2.right = obj2.x + obj2.width;
    obj2.botom = obj2.y + obj2.height;
    obj2.left = obj2.x;
    obj2.top = obj2.y;
    //if the objs collide
    if(obj1.right === obj2.right && obj1.left === obj2.left && obj1.botom === obj2.botom && obj1.top === obj2.top)
    {
        return true;
    }
}
//WOW
function eatApple()
{
   if(DoCollide(head, Apple))
   {
       console.log("YAY")
       addToBody();
       repositionApple();
       AddPoints();
   }
}
//Makes you happy or sad
function AddPoints()
{
    points += 1;
    $("#score").text(points);
}
//Hmmm
function addToBody()
{
    var newId = "Snake" + snakeArray.length;
    var $div = $("<div>").appendTo("#board")
        .addClass("Snake")
        .attr("id", newId)
        .css("top", head.y)
        .css("left", head.x);
    $div.x = head.x;
    $div.y = head.y;
    var body = MakeBody("#" + newId, $div.x, $div.y ,20 ,20);
    snakeArray.push(body);
}
//gives back a number that is a mulitiple of twenty
function MulitipleOf20()
{
    var x = Math.floor(Math.random()*420);
    var y = x % 20
    if(  y === 0)
    {
        return x;
    }
    else
    {
        return MulitipleOf20();
        
    }
}
//the best function
 function NoNoZone(obj)
 {
    if(obj.y < 0 || obj.y > 420)
    {
        endGame();
    }

    if(obj.x < 0|| obj.x > 420)
    {
        endGame();
    }
 }
 //restarts the game: snake size and pos, score
 /*function Restart()
 {
    console.log("It worked");
    points = 0;
    head.x = 100;
    head.y = 100;
    head.speedX = 0;
    head.speedY = 0;
    $("#Snake").css("top", head.y);
    $("#Snake").css("left", head.x);
    //Clears snake body
    for(var i = 0; i < snakeArray.length; i++)
    {
        if(snakeArray[i] != snakeArray[0])
        {
            snakeArray.pop();
        }
    }
    //starts the timer again
    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
    //gets rid of game over message
    $("#GameOver").css("opacity", 0);
 }*/
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    $("#GameOver").css("opacity", 100);
    // turn off event handlers
    $(document).off();
  }
  
}
