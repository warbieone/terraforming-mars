"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitaniumMarketMonopolists = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const MarketCard_1 = require("./MarketCard");
class TitaniumMarketMonopolists extends MarketCard_1.MarketCard {
    constructor() {
        super(Resource_1.Resource.TITANIUM, { from: 2, to: 1, limit: 4 }, { from: 1, to: 4, limit: 4 }, {
            name: CardName_1.CardName.TITANIUM_MARKET_MONOPOLISTS,
            type: CardType_1.CardType.ACTIVE,
            cost: 21,
            requirements: { miningRate: 3 },
            metadata: {
                description: 'Requires the mining rate to be 3 or higher.',
                cardNumber: 'M29',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2X M€ to gain X titanium [max 8 M€]', (eb) => {
                        eb.megacredits(1, { text: '2x' }).startAction.text('X').titanium(1).asterix();
                    }).br;
                    b.or().br;
                    b.action('Spend X titanium to gain 4X M€ [max 4 titanium].', (eb) => {
                        eb.text('X').titanium(1).startAction.text('X').megacredits(4).asterix();
                    });
                }),
            },
        });
    }
}
exports.TitaniumMarketMonopolists = TitaniumMarketMonopolists;
