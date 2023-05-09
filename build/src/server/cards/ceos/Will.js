"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Will = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardResource_1 = require("../../../common/CardResource");
class Will extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.WILL,
            metadata: {
                cardNumber: 'L23',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('GAIN THESE RESOURCES').br;
                    b.animals(1).animals(1).microbes(1).microbes(1).br;
                    b.floaters(1).floaters(1).wild(1).wild(1);
                    b.br;
                }),
                description: 'Once per game, add the following resources to your cards: 2 animals, 2 microbes, 2 floaters, 2 wild.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.ANIMAL, { count: 2 }));
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.MICROBE, { count: 2 }));
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { count: 2 }));
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, undefined, { count: 2 }));
        return undefined;
    }
}
exports.Will = Will;
