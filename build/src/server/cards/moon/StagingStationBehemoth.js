"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StagingStationBehemoth = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class StagingStationBehemoth extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.STAGING_STATION_BEHEMOTH,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SPACE],
            cost: 24,
            behavior: {
                moon: { logisticsRate: 1 },
                colonies: { addTradeFleet: 2 },
            },
            metadata: {
                description: 'Gain 2 Trade Fleets. Raise the logistic rate 1 step.',
                cardNumber: 'M68',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tradeFleet().tradeFleet().moonLogisticsRate();
                }),
            },
        });
    }
}
exports.StagingStationBehemoth = StagingStationBehemoth;
