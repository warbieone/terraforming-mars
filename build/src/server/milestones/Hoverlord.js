"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hoverlord = void 0;
const IMilestone_1 = require("./IMilestone");
const CardResource_1 = require("../../common/CardResource");
class Hoverlord extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Hoverlord', 'Have 7 floater resources on your cards', 7);
    }
    getScore(player) {
        let floaterResources = 0;
        player.getCardsWithResources(CardResource_1.CardResource.FLOATER).forEach((card) => {
            floaterResources += card.resourceCount;
        });
        return floaterResources;
    }
}
exports.Hoverlord = Hoverlord;
