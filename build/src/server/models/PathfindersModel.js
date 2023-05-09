"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathfindersModel = void 0;
function createPathfindersModel(game) {
    if (game.pathfindersData === undefined)
        return undefined;
    const pathfindersData = game.pathfindersData;
    return {
        venus: pathfindersData.venus,
        earth: pathfindersData.earth,
        mars: pathfindersData.mars,
        jovian: pathfindersData.jovian,
        moon: pathfindersData.moon,
    };
}
exports.createPathfindersModel = createPathfindersModel;
