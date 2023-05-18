"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsoredMohole = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class SponsoredMohole extends Card_1.Card {
    constructor() {
        super({
            cost: 5,
            tags: [Tag_1.Tag.BUILDING],
            name: CardName_1.CardName.SPONSORED_MOHOLE,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { heat: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.KELVINISTS)),
            metadata: {
                cardNumber: 'T13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(2));
                }),
                description: 'Requires that Kelvinists are ruling or that you have 2 delegates there. Increase your heat production 2 steps.',
            },
        });
    }
}
exports.SponsoredMohole = SponsoredMohole;
//# sourceMappingURL=SponsoredMohole.js.map