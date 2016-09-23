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

var LEVEL_LAYER =
{
    BLUE:  0,
    RED:   1,
    GREEN: 2
};

function Level(name, id, layers, startPosition, rowLength, columnLength)
{
    this.name = name;
    this.id = id;
    this.layers = layers;
    this.startPosition = startPosition;
    this.rowLength = rowLength;
    this.columnLength = columnLength;
    
    Level.prototype.getLayer = function(layer)
    {
        if(layer > -1 && layer < 3) return this.layers[layer];
        return false;
    };
    
    Level.prototype.getLayers = function()
    {
        return this.layers;
    };
}
