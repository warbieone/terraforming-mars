"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarTradeFleet = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
class LunarTradeFleet extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_TRADE_FLEET,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            cost: 8,
            behavior: {
                production: { megacredits: 1 },
                moon: { logisticsRate: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.production(Resource_1.Resource.TITANIUM, 2)),
            metadata: {
                description: 'Requires that you have 2 titanium production. ' +
                    'Increase your M€ production 1 step. Raise the logistic rate 1 step.',
                cardNumber: 'M35',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1));
                    b.br;
                    b.moonLogisticsRate();
                }),
            },
        });
    }
}
exports.LunarTradeFleet = LunarTradeFleet;
