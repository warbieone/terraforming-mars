"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarMagnate = void 0;
const MoonExpansion_1 = require("./MoonExpansion");
class LunarMagnate {
    constructor() {
        this.name = 'Lunar Magnate';
        this.description = 'Own the most tiles on The Moon';
    }
    getScore(player) {
        const spaces = MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => moonData.moon.spaces, () => []);
        return spaces.filter((space) => {
            return space.player?.id === player.id || space.coOwner?.id === player.id;
        }).length;
    }
}
exports.LunarMagnate = LunarMagnate;
