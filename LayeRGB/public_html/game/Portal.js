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

function Portal(layer, position, rotation, scale, sprite, moveable)
{
    GameObject.call(this, position, rotation, scale, sprite, moveable);
    
    var _portalLayer = layer;
    var _callback = null;
     
    Object.defineProperty(this, "layer", {
        get: function() { return _portalLayer; }
    });
     
    Object.defineProperty(this, "callback", {
        get: function() { return _callback; },
        set: function(callback)
        {
            if(Engine.isFunction(callback))
            {
                _callback = callback;
            }
        }
    });
     
    Portal.prototype.Draw = function(ctx)
    {
       GameObject.prototype.Draw.call(this, ctx);

       var color = "#0000FF";
       var alpha = 0.75;
       
       switch(this.layer)
       {
           case LEVEL_LAYER.BLUE:
                color = "#0000FF";
                alpha = 0.75;
                break;
           case LEVEL_LAYER.RED:
                color = "#FF0000";
                alpha = 0.75;
                break;
           case LEVEL_LAYER.GREEN:
                color = "#00FF00";
                alpha = 0.5;
                break;
       }


       ctx.save();
       ctx.beginPath();
       ctx.globalAlpha = alpha;
       ctx.arc(this.position.x + 0.5,this.position.y + 0.5, 11, 0, 2 * Math.PI, false);
       ctx.fillStyle = color;
       ctx.fill();
       ctx.globalAlpha = 1;
       ctx.lineWidth = 2;
       ctx.strokeStyle = color;
       ctx.stroke();
       ctx.closePath();
       ctx.restore();
    };
     
    Portal.prototype.HandleCollision = function(other, side)
    {
        if(other instanceof Player)
        {
            if(this.callback !== null)
            {
                this.callback.call();
            }
        }
    };
}

Portal.prototype = Object.create(GameObject.prototype);