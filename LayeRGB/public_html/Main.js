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

window.onload = function(e)
{
    /* BUG: WHEN INITIATE MORE THAN ONE ENGINE INPUT DOES NOT REGISTER.
     */
    $.getScript("engine/Engine.js", function() 
    {
        var engine = new Engine({x: 400, y: 320 }, "LayeRGB");
        engine.Resize({x:800, y: 640});
        engine.PreloadScripts("game/MenuScene.js, game/Portal.js, game/EndPortal.js, game/Wall.js, game/Level.js, game/LevelLoadingManager.js, game/PickLevelScene.js, game/GameScene.js");
        engine.PreloadAssets("MainLogo:images/logo.png, MenuMusic:audio/MenuSong.mp3, MenuMove:audio/menuMove.mp3, Arrow:images/arrow.png,\n\
        Blue:images/blue.png, Red:images/red.png, Green:images/green.png, EndPortal:images/finish_glow.png, Portal:images/switch.png");
        engine.onLoaded(function() {
            var scene = new MenuScene(engine);
            engine.Start(scene);
        });
    });
};
