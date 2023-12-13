"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidMiningConsortium = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const DecreaseAnyProduction_1 = require("../../deferredActions/DecreaseAnyProduction");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const GainProduction_1 = require("../../deferredActions/GainProduction");
class AsteroidMiningConsortium extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ASTEROID_MINING_CONSORTIUM,
            tags: [Tag_1.Tag.JOVIAN],
            cost: 13,
            victoryPoints: 1,
            requirements: { generation: 4 },
            metadata: {
                description: 'Requires that it is Generation 4. Decrease any titanium production 1 step and increase your own 1 step.',
                cardNumber: '002',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().titanium(-1, { all: Options_1.all }).br;
                        pb.plus().titanium(1);
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new DecreaseAnyProduction_1.DecreaseAnyProduction(player, Resource_1.Resource.TITANIUM, { count: 1, stealing: true }));
        player.game.defer(new GainProduction_1.GainProduction(player, Resource_1.Resource.TITANIUM, { count: 1, log: false }));
        return undefined;
    }
}
exports.AsteroidMiningConsortium = AsteroidMiningConsortium;
//# sourceMappingURL=AsteroidMiningConsortium.js.map