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

function MenuScene(engine)
{
    Scene.call(this);
    
    var layeRGBLogo = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["MainLogo"]);
    
    MenuScene.prototype.Update = function(input, dt)
    {
        Engine.PlayAudio("LayeRGB", "MenuMusic", 0.5);
        if(input.keyboard.keyPressed(KEY_CODE.SPACE))
        {
            Engine.StopAllGameAudio("LayeRGB");
            var scene = new PickLevelScene(engine);
            engine.switchScene(scene, false);
        }
        Scene.prototype.Update.call(this, input, dt);
    };
    
    MenuScene.prototype.Draw = function(context)
    {
        layeRGBLogo.Draw(context, new Vector(200,140), 0, new Vector(0.5,0.6));
        
        context.save();
        context.font = "20px Tahoma";
        context.fillStyle = "white";
        context.fillText("Play", 180, 240);
        context.restore();
        
        context.save();
        context.shadowBlur = 10;
        context.shadowColor = "white";
        context.strokeStyle = "white";
        context.strokeRect(150, 220, 100, 27);
        context.restore();
        
        Scene.prototype.Draw.call(this, context);
    };
}

MenuScene.prototype = Object.create(Scene.prototype);