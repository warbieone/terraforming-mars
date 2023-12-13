"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROffice = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class PROffice extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PR_OFFICE,
            tags: [Tag_1.Tag.EARTH],
            cost: 7,
            behavior: {
                tr: 1,
                stock: { megacredits: { tag: Tag_1.Tag.EARTH } },
            },
            requirements: { party: PartyName_1.PartyName.UNITY },
            metadata: {
                cardNumber: 'T09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1).br;
                    b.megacredits(1).slash().earth(1, { played: Options_1.played });
                }),
                description: 'Requires that Unity are ruling or that you have 2 delegates there. Gain 1 TR. Gain 1 M€ for each Earth tag you have, including this.',
            },
        });
    }
}
exports.PROffice = PROffice;
//# sourceMappingURL=PROffice.js.map