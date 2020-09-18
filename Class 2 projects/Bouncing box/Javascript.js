/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////////////////////////////
			/////////////////// Setup ///////////////////////////////
            //////////////////////////////////////////////////////////////////
            
var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
var BOARD_HEIGHT = $(window).height();
            // Every 50 milliseconds, call the update Function (see below)
            setInterval(update, 50);
            
            // Every time the box is clicked, call the handleBoxClick Function (see below)
            $('#box').on('click', handleBoxClick);

            
            var positionX = 0;
            var posY = 0;
            var speedY = 10;
			var speedX = 10;
            var points = 0;

            //////////////////////////////////////////////////////////////////
			/////////////////// CORE LOGIC!!!!!! ///////////////////////////////
            //////////////////////////////////////////////////////////////////

            /* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
			function update() {
                //Moves box
				move();
                //Checks if box is inside of the screen(more or less)
				isBoxInScreen();
            }
            
            /* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
			function handleBoxClick() {
                //Add points bois
				increasePoints();
				//makes you go zoom
				addSpeed();
				//resetes position
                resetPos();
                //Changes color of box
                changeColor();
			}
            
            //////////////////////////////////////////////////////////////////
			///////////////////HELPER FUNCTIONS REEEEE!!! ///////////////////////////////
			//////////////////////////////////////////////////////////////////
            
            //Dose what the function says
            function increasePoints()
            {
                points += 1;
				$('#box').text(points);
            }

            //see previous comment
            function addSpeed()
            {
                if (speedX >= 0) {
					speedX += 3;
				} 
				else if (speedX < 0) {
					speedX -= 3;
				}

            }

            //redundency
            function resetPos()
            {
                positionX = 0;
            }
            
            //moves box
            function move()
            {
                positionX += speedX;
                $('#box').css("left", positionX);

                posY += speedY;
                $('#box').css("top", posY);
            }

            //Checks to see if box is in the screen
            function isBoxInScreen()
            {
                if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
                }
                
                if (posY > BOARD_HEIGHT) {
					speedY = -speedY;
				}
				else if (posY < 0) {
					speedY = -speedY;
				}
            }

            function changeColor()
            {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var rgbString = "rgb(" + r + "," + g + "," + b + ")";
                
                $('#box').css("backgroundColor", rgbString);
            }

			

			

			


		}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE