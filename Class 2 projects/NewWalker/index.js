/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //Handles key down events
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)


  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var KEY =
  {
    "UP": 87,
    "DOWN": 83,
    "LEFT": 65,
    "RIGHT": 68,
    //Player two keys
    "UP2": 38,
    "DOWN2": 40,
    "LEFT2": 37,
    "RIGHT2": 39
  }
  
  // Game Item Objects
  var xPos = 0;
  var yPos = 0;
  var xSpeed = 0;
  var ySpeed = 0;
  var xPos2 = 390;
  var yPos2 = 390;
  var xSpeed2 = 0;
  var ySpeed2 = 0;
  var isIt = true;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    repositionGameItem2();
    redrawGameItem();
    redrawGameItem2();
    noNoZone();
    noNoZone2();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event)
  {
    //GameObject 1
    if(event.which === KEY.LEFT)
    {
        xSpeed = -2;
    }
    if(event.which === KEY.RIGHT)
    {
        xSpeed = 2;
    }
    if(event.which === KEY.UP)
    {
        ySpeed = -2;
    }
    if (event.which === KEY.DOWN)
    {
        ySpeed = 2;
    }
    //GameObject 2
     if(event.which === KEY.LEFT2)
    {
        xSpeed2 = -2;
    }
    if(event.which === KEY.RIGHT2)
    {
        xSpeed2 = 2;
    }
    if(event.which === KEY.UP2)
    {
        ySpeed2 = -2;
    }
    if (event.which === KEY.DOWN2)
    {
        ySpeed2 = 2;
    }
  }
  //Handles keyUp events
  function handleKeyUp(event)
  {
    //GameObject 1
    if(event.which === KEY.LEFT)
    {
       ySpeed = 0;
    }
    if(event.which === KEY.RIGHT)
    {
        ySpeed = 0;
    }
    if(event.which === KEY.UP)
    {
       xSpeed = 0;
    }
    if (event.which === KEY.DOWN)
    {
        xSpeed = 0;
    }

    //GameObject 2
    if(event.which === KEY.LEFT2)
    {
       ySpeed2 = 0;
    }
    if(event.which === KEY.RIGHT2)
    {
        ySpeed2 = 0;
    }
    if(event.which === KEY.UP2)
    {
       xSpeed2 = 0;
    }
    if (event.which === KEY.DOWN2)
    {
        xSpeed2 = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }  
  //repositions our Game object
 function repositionGameItem()
 {
    //GameObject 1 movement
    xPos += xSpeed
    yPos += ySpeed
 }
 function repositionGameItem2()
 {
    //Game Object2 movement
    xPos2 += xSpeed2
    yPos2 += ySpeed2
 }
  //redraws our game object
 function redrawGameItem()
 {
    //GameObject 1
    $("#gameItem").css("left", xPos);
    $("#gameItem").css("top", yPos);
 }
 function redrawGameItem2()
 {
    //GameObject2
    $("#gameItem2").css("left", xPos2);
    $("#gameItem2").css("top", yPos2);
 }
 //Makes box not go out of bounds
 function noNoZone()
 {
    //GameObject 1
    if(xPos > 390)
    {
        xPos = 390;
    }
    if(xPos < 2)
    {
        xPos = 2;
    }
    if(yPos > 390)
    {
        yPos = 390;
    }
    if(yPos < 2)
    {
        yPos = 2;
    }

}
function noNoZone2()
{
    //GameObject 2

    if(xPos2 > 390)
    {
        xPos2 = 390;
    }
    if(xPos2 < 2)
    {
        xPos2 = 2;
    }
    if(yPos2 > 390)
    {
        yPos2 = 390;
    }
    if(yPos2 < 2)
    {
        yPos2 = 2;
    }
}
//DO THIS ANOTHER TIME
/*
function handleColision()
{
    if(yPos == yPos2 && xPos == xPos2)
    {
        if(isIt)
        {

        }
    }
}*/

}
