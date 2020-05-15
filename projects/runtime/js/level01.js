var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 110 },
                { "type": "sawblade", "x": 600, "y": groundY - 30 },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 2400, "y": groundY - 30 },
                { "type": "sawblade", "x": 3100, "y": groundY - 110 },
                { "type": "sawblade", "x": 3250, "y": groundY - 110 },
                { "type": "sawblade", "x": 3400, "y": groundY - 25 },
                { "type": "sawblade", "x": 1300, "y": groundY - 110 },
                {"type": 'myObstacle', 'x':1450, 'y':groundY - 10},
                {"type": 'myObstacle', 'x':1650, 'y': groundY - 100},
                {"type": 'myObstacle', 'x':1850, 'y':groundY - 10},
                {"type": 'reward', 'x':2800, 'y': groundY - 135},
                {"type": 'blueBullet', 'x':800, 'y': groundY - 100},
                {"type": 'blueBullet', 'x':2000, 'y': groundY - 10},
                {"type": 'blueBullet', 'x':3500, 'y': groundY - 10},
                {"type": 'blueBullet', 'x':6000, 'y': groundY - 100},
                {"type": 'blueBullet', 'x':6500, 'y': groundY - 100},
                ]
     
            
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        

        
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        
        
        for(var i = 0; i < levelData.gameItems.length; i++ ){
          
            var firstGameItemObject = levelData.gameItems[i];
            var x = firstGameItemObject.type;
            if(x === 'sawblade'){
            var firstX = firstGameItemObject.x;
            var firstY = firstGameItemObject.y;
            createSawBlade(firstX, firstY);}
            if (x === 'myObstacle'){
            var obstacleX = firstGameItemObject.x;
            var obstacleY = firstGameItemObject.y;
            myObsticle(obstacleX, obstacleY);
            }
            if(x === 'reward'){
                var rewardX = firstGameItemObject.x;
                var rewardY = firstGameItemObject.y;
                reward(rewardX, rewardY);
            }
            if(x === 'blueBullet'){
                var blueBulletX = firstGameItemObject.x;
                var blueBulletY = firstGameItemObject.y;
                createRoundEnemy(blueBulletX, blueBulletY);
            }
            
           
        }
        
        function reward(x, y){
            var reward =  game.createGameItem('reward',25);
            var rewardImg = draw.bitmap('img/trophy.png');
            rewardImg.x = -25;
            rewardImg.y = -25;
            reward.addChild(rewardImg);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;
            reward.onPlayerCollision = function(){
                game.increaseScore(500);
                reward.fadeOut();
                game.changeIntegrity(30);
            };
        }
        
        
        function myObsticle(x, y){
            var hitZoneSize = 20;
            var damageFromObstacle = 30;
            var myObsticleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObsticleHitZone.x = x;
            myObsticleHitZone.y = y;
            game.addGameItem(myObsticleHitZone);
            var myObsticleImage = draw.bitmap('img/knife.png');
            myObsticleHitZone.addChild(myObsticleImage);
            myObsticleImage.x = -25;
            myObsticleImage.y = -25 ;
        }
        
   
            
            function createEnemy(x, y){
                var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = groundY - y;
            game.addGameItem(enemy);
            enemy.velocityX = -2.5;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.shrink();
                
                };
            }
            createEnemy(2400, 35);
            createEnemy(2800, 35);
            createEnemy(1000, 35);
            
            function createGreenEnemy(x, y){
                var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'green');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = groundY - y;
            game.addGameItem(enemy);
            enemy.velocityX = -3.5;
            enemy.rotationalVelocity = 25;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-25);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(200);
                enemy.shrink();
                
                };
            }
             createGreenEnemy(1500, 35);
            createGreenEnemy(2000, 35);
            createGreenEnemy(2800, 35);
            createGreenEnemy(3000, 35);
            
            function createRoundEnemy(x, y){
                var enemy =  game.createGameItem('enemy',10);
            var redSquare = draw.circle(10,10,'blue');
            redSquare.x = 0;
            redSquare.y = 0;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -8;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-30);
                enemy.fadeOut();
            };
            }
            //createRoundEnemy(800, 100);
           
            
         
            
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
