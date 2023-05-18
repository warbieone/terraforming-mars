"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinator = void 0;
class Coordinator {
    constructor() {
        this.name = 'Coordinator';
        this.description = 'Have the most event cards';
    }
    getScore(player) {
        return player.getPlayedEventsCount();
    }
}
exports.Coordinator = Coordinator;
//# sourceMappingURL=Coordinator.js.map