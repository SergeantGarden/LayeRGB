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

function PickLevelScene(engine)
{
    Scene.call(this);
    
    this.amountOfLevels = 9;
    this.level = 1;
    
    var centerLocation = new Vector(200,160);
    
    var arrow = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["Arrow"]);
    
    PickLevelScene.prototype.Update = function(input, dt)
    {
        Engine.PlayAudio("LayeRGB", "MenuMusic", 0.5);
        if(input.keyboard.keyPressed(KEY_CODE.SPACE))
        {
            Engine.StopAllGameAudio("LayeRGB");
            var scene = new GameScene(engine, this.level, this.levels);
            engine.switchScene(scene, false);
        }
        
        if(input.keyboard.keyPressed(KEY_CODE.LEFT) || input.keyboard.keyPressed(KEY_CODE.a))
        {
            --this.level; if(this.level <= 0) this.level = 9;
        }else if(input.keyboard.keyPressed(KEY_CODE.RIGHT) || input.keyboard.keyPressed(KEY_CODE.d))
        {
            ++this.level; if(this.level > 9) this.level = 1;
        }
        Scene.prototype.Update.call(this, input, dt);
    };
    
    PickLevelScene.prototype.Draw = function(context)
    {
        context.save();
        context.fillStyle = "black";
        context.fillRect(0,0, Engine.currentGame[engine.gameTitle].originalResolution.x, Engine.currentGame[engine.gameTitle].originalResolution.y);
        context.restore();
        var level = LevelLoadingManager.getLevel(this.level);
        
        var size = new Vector(16,16);
        
        context.save();
        context.shadowBlur = 10;
        context.shadowColor = "white";
        context.strokeStyle = "white";
        context.strokeRect(centerLocation.x - ((level.rowLength / 2) * size.x), centerLocation.y - ((level.columnLength / 2) * size.y), level.rowLength * size.x, level.columnLength * size.y);
        context.restore();
        
        for(var i = 0; i < level.getLayers().length; ++i)
        {
            var layer = level.getLayer(i);
            for(var j = 0; j < layer.length; ++j)
            {
                var offsetx = ((layer[j].position.x - centerLocation.x)/ layer[j].sprite.size.x) * (size.x * 2);
                var offsety = ((layer[j].position.y - centerLocation.y)/ layer[j].sprite.size.y) * (size.y * 2);
                
                context.save();
                layer[j].sprite.Draw(context, new Vector(centerLocation.x + offsetx, centerLocation.y + offsety), 0, new Vector(size.x/layer[j].sprite.size.x, size.y/layer[j].sprite.size.y));
                context.restore();
            }
        }
        
        arrow.Draw(context, new Vector(332, 240), 0, new Vector(0.6,0.6));
        
        context.save();
        context.font = "20px Tahoma";
        context.fillStyle = "white";
        context.fillText("Level " + this.level, 170, 245);
        context.restore();
        
        arrow.Draw(context, new Vector(68, 240), 180, new Vector(0.6,0.6));
        
        Scene.prototype.Draw.call(this, context);
    };
    
    LevelLoadingManager.LoadLevels(LevelLoadingManager.LoadLevelData(), centerLocation, new Vector(32, 32));
}

PickLevelScene.prototype = Object.create(Scene.prototype);


