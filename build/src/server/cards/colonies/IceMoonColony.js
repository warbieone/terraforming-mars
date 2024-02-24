"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IceMoonColony = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class IceMoonColony extends Card_1.Card {
    constructor() {
        super({
            cost: 23,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.ICE_MOON_COLONY,
            type: CardType_1.CardType.AUTOMATED,
            tr: { oceans: 1 },
            behavior: {
                colonies: { buildColony: {} },
                ocean: {},
            },
            metadata: {
                cardNumber: 'C15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.colonies(1).oceans(1)),
                description: 'Place 1 colony and 1 ocean tile.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.colonies.getPlayableColonies().length > 0;
    }
}
exports.IceMoonColony = IceMoonColony;
