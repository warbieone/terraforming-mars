"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zeppelins = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class Zeppelins extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ZEPPELINS,
            cost: 11,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: { cities: { where: 'onmars' } } },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(5)),
            metadata: {
                cardNumber: '129',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash();
                        pb.city({ size: Size_1.Size.SMALL, all: Options_1.all }).asterix();
                    });
                }),
                description: 'Requires 5% oxygen. Increase your M€ production 1 step for each city tile ON MARS.',
            },
        });
    }
}
exports.Zeppelins = Zeppelins;
//# sourceMappingURL=Zeppelins.js.map