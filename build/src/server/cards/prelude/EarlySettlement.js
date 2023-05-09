"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarlySettlement = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class EarlySettlement extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.EARLY_SETTLEMENT,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            behavior: {
                production: { plants: 1 },
                city: {},
            },
            metadata: {
                cardNumber: 'P09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).city();
                }),
                description: 'Increase your plant production 1 step. Place a city tile.',
            },
        });
    }
}
exports.EarlySettlement = EarlySettlement;
