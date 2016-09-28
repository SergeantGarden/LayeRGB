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
    this.currentLevel = null;
    this.layerSwitched = false;
    this.player = new Player(new Vector(0,0), new Vector(32,32));
    
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
        
        
        
        if(this.currentLevel instanceof Level)
        {
            this.DrawGrid(context);
        }
        
        Scene.prototype.Draw.call(this, context);
        
        if(this.currentLevel instanceof Level)
        {
            if(this.currentLevel.id === 1)
            {
                this.DrawInstructionMovement(context, new Vector(centerPosition.x, centerPosition.y + size.y / 2), new Vector(size.x * 3, size.y * 2));
            }
        }
    };
    
    this.DrawInstructionMovement = function(ctx, position, size)
    {
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.drawImage(Engine.currentGame["LayeRGB"].gameAssets["Controls"], -size.x/2, -size.y/2, size.x, size.y);
        ctx.restore();
    };
    
    this.DrawGrid = function(context)
    {
        context.save();
        context.strokeStyle = "rgba(255,255,255,0.2)";
        for(var i = 1; i < this.currentLevel.rowLength; ++i)
        {
            context.beginPath();
            context.moveTo(centerPosition.x - ((this.currentLevel.rowLength / 2) * size.x) + i * size.x, centerPosition.y - ((this.currentLevel.columnLength / 2) * size.y));
            context.lineTo(centerPosition.x - ((this.currentLevel.rowLength / 2) * size.x) + i * size.x, centerPosition.y + ((this.currentLevel.columnLength / 2) * size.y));
            context.stroke();
            context.closePath();
        }
        for(var i = 1; i < this.currentLevel.columnLength; ++i)
        {
            context.beginPath();
            context.moveTo(centerPosition.x - ((this.currentLevel.rowLength / 2) * size.x), centerPosition.y - ((this.currentLevel.columnLength / 2) * size.y) + i * size.y);
            context.lineTo(centerPosition.x + ((this.currentLevel.rowLength / 2) * size.x), centerPosition.y - ((this.currentLevel.columnLength / 2) * size.y) + i * size.y);
            context.stroke();
            context.closePath();
        }
        context.restore();

        context.save();
        context.shadowBlur = 10;
        context.shadowColor = "white";
        context.strokeStyle = "white";
        context.strokeRect(centerPosition.x - ((this.currentLevel.rowLength / 2) * size.x), centerPosition.y - ((this.currentLevel.columnLength / 2) * size.y), this.currentLevel.rowLength * size.x, this.currentLevel.columnLength * size.y);
        context.restore();
    };
    
    GameScene.prototype.NextLevel = function(levelNumber)
    {
        this.RemoveLevel();
        var level = LevelLoadingManager.getLevel(levelNumber);
        this.currentLayer = 0;
        if(level !== false)
        {
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
            this.currentLevel = level;
            this.player.position = new Vector(this.currentLevel.startPosition.x, this.currentLevel.startPosition.y);
            return true;
        }else
        {
            return false;
        }
    };
    
    GameScene.prototype.RemoveLevel = function()
    {
        if(this.currentLevel instanceof Level)
        {
            for(var i = 0; i < this.currentLevel.getLayers().length; ++i)
            {
                for(var j = 0; j < this.currentLevel.getLayer(i).length; ++j)
                {
                    this.RemoveGameObject(this.currentLevel.getLayer(i)[j], "game");
                }
            }
        }
    };
    
    GameScene.prototype.SwitchLayer = function(layer)
    {
        if(layer >= 0 && layer <= 3);
        this.currentLayer = layer;
        for(var i = 0; i < this.currentLevel.getLayers().length; ++i)
        {
            for(var j = 0; j < this.currentLevel.getLayer(i).length; ++j)
            {
                if(this.currentLayer === i)
                {
                    this.currentLevel.getLayer(i)[j].active = true;
                }else
                {
                    this.currentLevel.getLayer(i)[j].active = false;
                }
            }
        }
    };
    
    this.PlayerEndPortalCollision = function(objectOne, objectTwo)
    {
        var player = objectOne instanceof Player? objectOne:objectTwo;
        var endPortal = objectOne instanceof EndPortal? objectOne:objectTwo;
        if(!player.moving && (player.lastIdlePosition.x !== endPortal.position.x || player.lastIdlePosition.y !== endPortal.position.y))
        {
            if(!this.NextLevel(this.currentLevel.id + 1))
            {
                this.RemoveGameObject(player, "game");
                this.currentLevel = null;
            }
        }
    };
    
    this.PlayerPortalCollision = function(objectOne, objectTwo)
    {
        var player = objectOne instanceof Player? objectOne:objectTwo;
        var portal = objectOne instanceof Portal? objectOne:objectTwo;
        if(!player.moving && !this.layerSwitched && (player.lastIdlePosition.x !== portal.position.x || player.lastIdlePosition.y !== portal.position.y))
        {
            this.SwitchLayer(portal.layer);
            this.layerSwitched = true;
        }
        if(this.layerSwitched && player.moving)
        {
            this.layerSwitched = false;
        }
    };
    this.AddCollisionGroup(Player, EndPortal, this.PlayerEndPortalCollision);
    this.AddCollisionGroup(Player, Portal, this.PlayerPortalCollision);
    this.NextLevel(startLevel);
    this.AddGameObject(this.player, "game");
}

GameScene.prototype = Object.create(Scene.prototype);


