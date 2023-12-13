"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParliamentHall = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class ParliamentHall extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PARLIAMENT_HALL,
            tags: [Tag_1.Tag.BUILDING],
            cost: 8,
            requirements: { party: PartyName_1.PartyName.MARS },
            victoryPoints: 1,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.BUILDING, per: 3 } },
            },
            metadata: {
                cardNumber: 'T08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash().building(3, { played: Options_1.played });
                    });
                }),
                description: 'Requires that Mars First are ruling or that you have 2 delegates there. Increase your M€ production 1 step for every 3 building tags you have, including this.',
            },
        });
    }
}
exports.ParliamentHall = ParliamentHall;
//# sourceMappingURL=ParliamentHall.js.map