"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMoonData = void 0;
const MoonBoard_1 = require("./MoonBoard");
var IMoonData;
(function (IMoonData) {
    function serialize(moonData) {
        if (moonData === undefined) {
            return undefined;
        }
        return {
            moon: moonData.moon.serialize(),
            colonyRate: moonData.colonyRate,
            miningRate: moonData.miningRate,
            logisticRate: moonData.logisticRate,
            lunaFirstPlayerId: moonData.lunaFirstPlayer ? moonData.lunaFirstPlayer.id : undefined,
            lunaProjectOfficeLastGeneration: moonData.lunaProjectOfficeLastGeneration,
        };
    }
    IMoonData.serialize = serialize;
    function deserialize(moonData, players) {
        const lunaFirstPlayer = players.find((p) => p.id === moonData.lunaFirstPlayerId);
        if (moonData.lunaFirstPlayerId !== undefined && lunaFirstPlayer === undefined) {
            throw new Error(`player ${moonData.lunaFirstPlayerId} not found`);
        }
        return {
            colonyRate: moonData.colonyRate,
            logisticRate: moonData.logisticRate,
            miningRate: moonData.miningRate,
            moon: MoonBoard_1.MoonBoard.deserialize(moonData.moon, players),
            lunaFirstPlayer: lunaFirstPlayer,
            lunaProjectOfficeLastGeneration: moonData.lunaProjectOfficeLastGeneration,
        };
    }
    IMoonData.deserialize = deserialize;
})(IMoonData = exports.IMoonData || (exports.IMoonData = {}));
