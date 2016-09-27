/* 
 * Copyright 2016 Hugo Mater.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function Player(position, tileSize)
{
    GameObject.call(this, position, 0, new Vector(1,1), new Sprite(Engine.currentGame["LayeRGB"].gameAssets["Player"], tileSize, 1), true);
    this.collision.size = new Vector(tileSize.x/2, tileSize.y/2);
    
    this.movementDirection = 0; // 0-idle 1-Left 2-Right 3-Up 4-Down
    this.timePassed = 0;
    this.timedelay = 0;
    this.movingDelayPassed = true;
    this.moving = false;
    this.lastIdlePosition = position;
    this.tileSize = tileSize;
    this.maxSpeed = 128;
    
    Player.prototype.Update = function(input, dt)
    {
        GameObject.prototype.Update.call(this, input, dt);
        
        if(!this.moving && this.movingDelayPassed)
        {
            if(input.keyboard.keyDown(KEY_CODE.LEFT))
            {
                this.movementDirection = 1;
                this.lastIdlePosition = new Vector(this.position.x, this.position.y);
                this.moving = true;
                this.movingDelayPassed = false;
            }else if(input.keyboard.keyDown(KEY_CODE.RIGHT))
            {
                this.movementDirection = 2;
                this.lastIdlePosition = new Vector(this.position.x, this.position.y);
                this.moving = true;
                this.movingDelayPassed = false;
            }else if(input.keyboard.keyDown(KEY_CODE.UP))
            {
                this.movementDirection = 3;
                this.lastIdlePosition = new Vector(this.position.x, this.position.y);
                this.moving = true;
                this.movingDelayPassed = false;
            }else if(input.keyboard.keyDown(KEY_CODE.DOWN))
            {
                this.movementDirection = 4;
                this.lastIdlePosition = new Vector(this.position.x, this.position.y);
                this.moving = true;
                this.movingDelayPassed = false;
            }
        }else
        {
            switch(this.movementDirection)
            {
                case 0:
                    this.moving = false;
                    this.timePassed += dt;
                    break;
                case 1:
                    this.position.x -= this.maxSpeed * dt;
                    if(this.lastIdlePosition.x - this.tileSize.x >= this.position.x)
                    {
                        this.position.x = this.lastIdlePosition.x - this.tileSize.x;
                        this.movementDirection = 0;
                    }
                    break;
                case 2:
                    this.position.x += this.maxSpeed * dt;
                    if(this.lastIdlePosition.x + this.tileSize.x <= this.position.x)
                    {
                        this.position.x = this.lastIdlePosition.x + this.tileSize.x;
                        this.movementDirection = 0;
                    }
                    break;
                case 3:
                    this.position.y -= this.maxSpeed * dt;
                    if(this.lastIdlePosition.y - this.tileSize.y >= this.position.y)
                    {
                        this.position.y = this.lastIdlePosition.y - this.tileSize.y;
                        this.movementDirection = 0;
                    }
                    break;
                case 4:
                    this.position.y += this.maxSpeed * dt;
                    if(this.lastIdlePosition.y + this.tileSize.y <= this.position.y)
                    {
                        this.position.y = this.lastIdlePosition.y + this.tileSize.y;
                        this.movementDirection = 0;
                    }
                    break;
            }
            if(this.timePassed >= this.timedelay)
            {
                if(this.movementDirection === 0 && this.moving === false)
                {
                    //add steps
                }
                this.movingDelayPassed = true;
            }
        }
        if(this.movementDirection !== 0)
        {
            //future shadow
        }else
        {
            //reset shadow timer
        }
    };
    
    Player.prototype.Draw = function(ctx)
    {
        GameObject.prototype.Draw.call(this, ctx);
    };
    
    Player.prototype.HandleCollision = function(other, side)
    {
        GameObject.prototype.HandleCollision.call(this, other, side);
    };
}

Player.prototype = Object.create(GameObject.prototype);
