"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteelMarketMonopolists = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const MarketCard_1 = require("./MarketCard");
const Options_1 = require("../Options");
class SteelMarketMonopolists extends MarketCard_1.MarketCard {
    constructor() {
        super(Resource_1.Resource.STEEL, { from: 3, to: 2, limit: 3 }, { from: 1, to: 3, limit: 3 }, {
            name: CardName_1.CardName.STEEL_MARKET_MONOPOLISTS,
            type: CardType_1.CardType.ACTIVE,
            cost: 15,
            requirements: { miningRate: 3 },
            metadata: {
                description: 'Requires the mining rate to be 3 or higher.',
                cardNumber: 'M28',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 3X M€ to gain 2X steel (max 9 M€)', (eb) => {
                        eb.megacredits(3, { multiplier: Options_1.multiplier }).startAction.text('x').steel(2).asterix();
                    }).br;
                    b.or().br;
                    b.action('Spend X steel to gain 3X M€ (max 3 steel).', (eb) => {
                        eb.text('X').steel(1).startAction.text('x').megacredits(3).asterix();
                    });
                }),
            },
        });
    }
}
exports.SteelMarketMonopolists = SteelMarketMonopolists;
//# sourceMappingURL=SteelMarketMonopolists.js.map