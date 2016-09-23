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

var LevelLoadingManager = {};
LevelLoadingManager._levels = [];

LevelLoadingManager.LoadLevelData = function()
{
    var levelList = ["1,1", "2,1","2,2","3,1","3,2","3,3" , "4,1" , "4,2" ,"4,3" , "5,1", "5,2", "6,1" , "6,2" , "7,1" , "7,2" , "7,3" , "8,1" , "8,2" , "8,3" , "9,1" , "9,2" , "9,3"];
    var levelData = [];
    for(var i = 0; i < levelList.length; ++i)
    {
        var name = levelList[i].split(",")[0];
        var id = parseInt(name);
        if(levelData[id] == null)
        {
            levelData[id] = {};
            levelData[id].name = "LEVEL " + name;
            levelData[id].id = id;
            levelData[id].layers = new Array();
        }
        var loadedData = ReadFile("levels/"+ id + "/" + levelList[i].split(",")[1] + ".txt");
        levelData[id].layers.push(loadedData);
    }
    return levelData;
};

LevelLoadingManager.LoadLevels = function(levelData, levelCenterPosition, size)
{
    for(var i = 1; i < levelData.length; ++i)
    {
        var level;
        var levelLayerObjects = new Array();
        for(var j = 0; j < levelData[i].layers.length; ++j)
        {
            var rowLength = parseInt(levelData[i].layers[j][levelData[i].layers[j].length - 1]);
            var columnLength = ((levelData[i].layers[j].length -1) / rowLength);
            var startWidth = levelCenterPosition.x - ((rowLength * size.x) / 2);
            var startHeight = levelCenterPosition.y - (columnLength * size.y) / 2;
            
            levelLayerObjects[j] = new Array();
            for(var k = 0; k < levelData[i].layers[j].length - 1; ++k)
            {
                var height = startHeight + (Math.floor((k / rowLength)) * size.y) + (size.y / 2);
                var width = startWidth + ((k % rowLength) * size.x) + (size.x / 2);
                
                switch(levelData[i].layers[j][k])
                {
                    case "1":
                        var color = "Blue";
                        switch(j)
                        {
                            case 0:
                                color = "Blue";
                                break;
                            case 1:
                                color = "Red";
                                break;
                            case 2:
                                color = "Green";
                                break;
                        }
                        
                        
                        
                        var wallAnimation = new Animation(Engine.currentGame["LayeRGB"].gameAssets[color], new Vector(64,64), 1);
                        wallAnimation.frameIndex = LevelLoadingManager.getWallIndex(levelData[i].layers[j], k, rowLength);
                        var wall = new Wall(new Vector(width, height), 0, new Vector(size.x/64, size.y/64), wallAnimation, false);
                        levelLayerObjects[j].push(wall);
                        break;
                    case "2":
                        break;
                    case "3":
                        //var endPortal = new GameObject(new Vector(width, height), 0, new Vector(size.x/64, size.y/64), new Sprite(), false);
                        break;
                    case "4":
                        break;
                    case "5":
                        break;
                    case "6":
                        break;
                    case "7":
                        break;
                }
            }
        }
        level = new Level(levelData[i].name, levelData[i].id, levelLayerObjects, rowLength, columnLength);
        LevelLoadingManager._levels[levelData[i].id] = level;
    }
};

LevelLoadingManager.getWallIndex = function(objects, index, rowLength)
{
    var tileIndex = 0;
    if(index < 0) return -1;
    if(objects[index - rowLength] != null)
    {
        if(parseInt(objects[index - rowLength]) === 1) ++tileIndex;
    }
    if(((index + 1) % rowLength !== 0 || index === 0) && index < objects.length - 1)
    {
        if(index === 3 && rowLength === 4) console.log(" not possible");
        if(parseInt(objects[index + 1]) === 1) tileIndex += 2;
    }
    if(index + rowLength < objects.length -1)
    {
        if(parseInt(objects[index + rowLength]) === 1) tileIndex += 4;
    }
    if(index % rowLength !== 0 && index > 0)
    {
        if(parseInt(objects[index - 1]) === 1) tileIndex += 8;
    }
    return tileIndex;
};

LevelLoadingManager.getLevel = function(level)
{
    if(LevelLoadingManager._levels[level] != null)
    {
        return LevelLoadingManager._levels[level];
    }
    return false;
};

LevelLoadingManager.getLevels = function()
{
    if(LevelLoadingManager._levels != null)
    {
        return LevelLoadingManager._levels;
    }
    return false;
};