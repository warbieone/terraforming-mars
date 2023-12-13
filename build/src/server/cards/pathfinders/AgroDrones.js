"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgroDrones = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const Units_1 = require("../../../common/Units");
const PathfindersExpansion_1 = require("../../pathfinders/PathfindersExpansion");
class AgroDrones extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.AGRO_DRONES,
            cost: 14,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.MARS],
            requirements: { temperature: -18 },
            metadata: {
                cardNumber: 'Pf04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 steel and 1 energy to gain 3 plants.', (eb) => {
                        eb.steel(1).energy(1).startAction.plants(3);
                    });
                }),
                description: 'Requires -18° C or warmer.',
            },
        });
    }
    canAct(player) {
        return player.steel > 0 && player.energy > 0;
    }
    action(player) {
        player.stock.deductUnits(Units_1.Units.of({ steel: 1, energy: 1 }));
        player.stock.add(Resource_1.Resource.PLANTS, 3);
        player.game.log('${0} spent 1 steel and 1 energy to gain 3 plants.', (b) => b.player(player));
        PathfindersExpansion_1.PathfindersExpansion.addToSolBank(player);
        return undefined;
    }
}
exports.AgroDrones = AgroDrones;
//# sourceMappingURL=AgroDrones.js.map