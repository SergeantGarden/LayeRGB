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
    
    GameScene.prototype.Update = function(input, dt)
    {
        if(input.keyboard.keyPressed(KEY_CODE.ESCAPE))
        {
            var scene = new MenuScene(engine);
            engine.switchScene(scene, false);
        }
        Scene.prototype.Update.call(this, input, dt);
    };
    
    GameScene.prototype.Draw = function(context)
    {
        context.save();
        context.fillStyle = "black";
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
}

GameScene.prototype = Object.create(Scene.prototype);


