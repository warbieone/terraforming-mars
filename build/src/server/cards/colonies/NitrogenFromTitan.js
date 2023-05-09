"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NitrogenFromTitan = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class NitrogenFromTitan extends Card_1.Card {
    constructor() {
        super({
            cost: 25,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            name: CardName_1.CardName.NITROGEN_FROM_TITAN,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 1,
            behavior: {
                tr: 2,
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 2, tag: Tag_1.Tag.JOVIAN },
            },
            metadata: {
                cardNumber: 'C28',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(2).floaters(2, { secondaryTag: Tag_1.Tag.JOVIAN });
                }),
                description: 'Raise your TR 2 steps. Add 2 floaters to a JOVIAN CARD.',
            },
        });
    }
}
exports.NitrogenFromTitan = NitrogenFromTitan;
