"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventrix = void 0;
const CorporationCard_1 = require("./CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Inventrix extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.INVENTRIX,
            tags: [Tag_1.Tag.SCIENCE],
            startingMegaCredits: 45,
            globalParameterRequirementBonus: { steps: 2 },
            firstAction: {
                text: 'Draw 3 cards',
                drawCard: 3,
            },
            metadata: {
                cardNumber: 'R43',
                description: 'As your first action in the game, draw 3 cards. Start with 45 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(45).nbsp.cards(3);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +3 or -3 steps, your choice in each case.', (eb) => {
                            eb.plate('Global requirements').startEffect.text('+/- 3');
                        });
                    });
                }),
            },
        });
    }
    getRequirementBonus() {
        return 3;
    }
}
exports.Inventrix = Inventrix;
//# sourceMappingURL=Inventrix.js.map