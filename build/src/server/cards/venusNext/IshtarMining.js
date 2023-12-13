"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IshtarMining = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class IshtarMining extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ISHTAR_MINING,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS],
            cost: 5,
            behavior: {
                production: { titanium: 1 },
            },
            requirements: { venus: 8 },
            metadata: {
                cardNumber: '233',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.titanium(1))),
                description: 'Requires Venus 8%. Increase your titanium production 1 step.',
            },
        });
    }
}
exports.IshtarMining = IshtarMining;
//# sourceMappingURL=IshtarMining.js.map