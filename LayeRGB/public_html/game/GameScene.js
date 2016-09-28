/* 
 *  Copyright 2016 Hugo Mater
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

function GameScene(engine, startLevel, centerPosition, size)
{
    Scene.call(this);
    
    this.currentLayer = 0;
    var level = LevelLoadingManager.getLevel(startLevel);
    
    this.player = new Player(level.startPosition, new Vector(32,32));
    
    for(var i = 0; i < level.getLayers().length; ++i)
    {
        for(var j = 0; j < level.getLayer(i).length; ++j)
        {
            this.AddGameObject(level.getLayer(i)[j], "game");
            if(this.currentLayer === i)
            {
                level.getLayer(i)[j].active = true;
            }else
            {
                level.getLayer(i)[j].active = false;
            }
        }
    }
    
    this.AddGameObject(this.player, "game");
    
    GameScene.prototype.Update = function(input, dt)
    {
        Engine.PlayAudio("LayeRGB", "GameMusic", 0.5);
        if(input.keyboard.keyPressed(KEY_CODE.ESCAPE))
        {
            Engine.StopAllGameAudio("LayeRGB");
            var scene = new MenuScene(engine);
            engine.switchScene(scene, false);
        }
        Scene.prototype.Update.call(this, input, dt);
    };
    
    GameScene.prototype.Draw = function(context)
    {
        var color = "#000045";
        var color2 = "#000080";

        switch(this.currentLayer)
        {
            case LEVEL_LAYER.BLUE:
                color = "#000045";
                color2 = "#000080";
                break;
            case LEVEL_LAYER.RED:
                color = "#450000";
                color2 = "#800000";
                break;
            case LEVEL_LAYER.GREEN:
                color = "#003500";
                color2 = "#007000";
                break;
        }
        
        context.save();
        
        var gradient = context.createLinearGradient(0,0,0, Engine.currentGame[engine.gameTitle].originalResolution.y);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color2);
        gradient.addColorStop(1, color);
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, Engine.currentGame[engine.gameTitle].originalResolution.x, Engine.currentGame[engine.gameTitle].originalResolution.y);
        context.restore();
        
        context.save();
        context.strokeStyle = "rgba(255,255,255,0.2)";
        for(var i = 1; i < level.rowLength; ++i)
        {
            context.beginPath();
            context.moveTo(centerPosition.x - ((level.rowLength / 2) * size.x) + i * size.x, centerPosition.y - ((level.columnLength / 2) * size.y));
            context.lineTo(centerPosition.x - ((level.rowLength / 2) * size.x) + i * size.x, centerPosition.y + ((level.columnLength / 2) * size.y));
            context.stroke();
            context.closePath();
        }
        for(var i = 1; i < level.columnLength; ++i)
        {
            context.beginPath();
            context.moveTo(centerPosition.x - ((level.rowLength / 2) * size.x), centerPosition.y - ((level.columnLength / 2) * size.y) + i * size.y);
            context.lineTo(centerPosition.x + ((level.rowLength / 2) * size.x), centerPosition.y - ((level.columnLength / 2) * size.y) + i * size.y);
            context.stroke();
            context.closePath();
        }
        context.restore();
        
        context.save();
        context.shadowBlur = 10;
        context.shadowColor = "white";
        context.strokeStyle = "white";
        context.strokeRect(centerPosition.x - ((level.rowLength / 2) * size.x), centerPosition.y - ((level.columnLength / 2) * size.y), level.rowLength * size.x, level.columnLength * size.y);
        context.restore();
        
        Scene.prototype.Draw.call(this, context);
    };
    
    this.PlayerEndPortalCollision = function(objectOne, objectTwo)
    {
        var player = objectOne instanceof Player? objectOne:objectTwo;
        var endPortal = objectOne instanceof EndPortal? objectOne:objectTwo;
    };
    
    this.PlayerPortalCollision = function(objectOne, objectTwo)
    {
        var player = objectOne instanceof Player? objectOne:objectTwo;
        var portal = objectOne instanceof Portal? objectOne:objectTwo;
    };
    this.AddCollisionGroup(Player, EndPortal, this.PlayerEndPortalCollision);
    this.AddCollisionGroup(Player, Portal, this.PlayerPortalCollision);
}

GameScene.prototype = Object.create(Scene.prototype);


