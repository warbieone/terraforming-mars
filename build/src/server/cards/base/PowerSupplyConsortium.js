"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerSupplyConsortium = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const DecreaseAnyProduction_1 = require("../../deferredActions/DecreaseAnyProduction");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const GainProduction_1 = require("../../deferredActions/GainProduction");
class PowerSupplyConsortium extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.POWER_SUPPLY_CONSORTIUM,
            tags: [Tag_1.Tag.POWER],
            cost: 5,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.POWER, 2)),
            metadata: {
                cardNumber: '160',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1, { all: Options_1.all }).br;
                        pb.plus().energy(1);
                    });
                }),
                description: 'Requires 2 power tags. Decrease any energy production 1 step and increase your own 1 step.',
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new DecreaseAnyProduction_1.DecreaseAnyProduction(player, Resource_1.Resource.ENERGY, { count: 1, stealing: true }));
        player.game.defer(new GainProduction_1.GainProduction(player, Resource_1.Resource.ENERGY, { count: 1 }));
        return undefined;
    }
}
exports.PowerSupplyConsortium = PowerSupplyConsortium;
