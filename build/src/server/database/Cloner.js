"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloner = void 0;
const Game_1 = require("../Game");
const Types_1 = require("../../common/Types");
const GameSetup_1 = require("../GameSetup");
class Cloner {
    static clone(newGameId, players, firstPlayerIndex, serialized) {
        const sourceGameId = serialized.id;
        const oldPlayerIds = serialized.players.map((player) => player.id);
        const newPlayerIds = players.map((player) => player.id);
        if (oldPlayerIds.length !== newPlayerIds.length) {
            throw new Error(`Failing to clone from a ${oldPlayerIds.length} game ${sourceGameId} to a ${newPlayerIds.length} game.`);
        }
        Cloner.replacePlayerIds(serialized, oldPlayerIds, newPlayerIds);
        if (oldPlayerIds.length === 1) {
            Cloner.replacePlayerIds(serialized, [GameSetup_1.GameSetup.neutralPlayerFor(sourceGameId).id], [GameSetup_1.GameSetup.neutralPlayerFor(newGameId).id]);
        }
        serialized.id = newGameId;
        for (let idx = 0; idx < players.length; idx++) {
            this.updatePlayer(players[idx], serialized.players[idx]);
        }
        serialized.first = serialized.players[firstPlayerIndex].id;
        serialized.clonedGamedId = '#' + sourceGameId;
        const game = Game_1.Game.deserialize(serialized);
        return game;
    }
    static replacePlayerIds(obj, oldPlayerIds, newPlayerIds) {
        if (obj === undefined || obj === null) {
            return;
        }
        const keys = Object.entries(obj);
        keys.forEach(([key, val]) => {
            if (obj.hasOwnProperty(key)) {
                if ((0, Types_1.isPlayerId)(val)) {
                    const idx = oldPlayerIds.indexOf(val);
                    if (idx > -1) {
                        obj[key] = newPlayerIds[idx];
                    }
                }
                else if (typeof val === 'object') {
                    Cloner.replacePlayerIds(val, oldPlayerIds, newPlayerIds);
                }
            }
        });
    }
    static updatePlayer(from, to) {
        to.color = from.color;
        to.name = from.name;
        const terraformRatingDelta = Number(from.handicap) - Number(to.handicap);
        const newTerraformRating = Number(to.terraformRating) + terraformRatingDelta;
        to.terraformRating = newTerraformRating;
        to.handicap = Number(from.handicap);
    }
}
exports.Cloner = Cloner;
