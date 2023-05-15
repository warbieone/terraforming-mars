"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarMagnate = void 0;
const MoonExpansion_1 = require("./MoonExpansion");
class LunarMagnate {
    constructor() {
        this.name = 'Lunar Magnate';
        this.description = 'Owning the most tiles on The Moon.';
    }
    getScore(player) {
        return MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => {
            return moonData.moon.spaces.filter((space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id; }).length;
        }, () => 0) || 0;
    }
}
exports.LunarMagnate = LunarMagnate;
//# sourceMappingURL=LunarMagnate.js.map