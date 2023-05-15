"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterstellarColonyShip = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
class InterstellarColonyShip extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.INTERSTELLAR_COLONY_SHIP,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 24,
            victoryPoints: 4,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 5)),
            metadata: {
                description: 'Requires that you have 5 science tags.',
                cardNumber: '027',
            },
        });
    }
}
exports.InterstellarColonyShip = InterstellarColonyShip;
//# sourceMappingURL=InterstellarColonyShip.js.map