"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfSufficientSettlement = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SelfSufficientSettlement extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SELF_SUFFICIENT_SETTLEMENT,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            behavior: {
                production: { megacredits: 2 },
                city: {},
            },
            metadata: {
                cardNumber: 'P29',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2)).city();
                }),
                description: 'Increase your M€ production 2 steps. Place a city tile.',
            },
        });
    }
}
exports.SelfSufficientSettlement = SelfSufficientSettlement;
