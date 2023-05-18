"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OceanFarm = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class OceanFarm extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.OCEAN_FARM,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            cost: 15,
            behavior: {
                production: { plants: 1, heat: 1 },
                tile: {
                    type: TileType_1.TileType.OCEAN_FARM,
                    on: 'upgradeable-ocean',
                    title: 'Select space for Ocean Farm',
                    adjacencyBonus: { bonus: [SpaceBonus_1.SpaceBonus.PLANT] },
                },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(4)),
            metadata: {
                cardNumber: 'A21',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.heat(1).br;
                        pb.plants(1);
                    }).nbsp.tile(TileType_1.TileType.OCEAN_FARM, false, true);
                }),
                description: 'Requires 4 ocean tiles. Increase your heat production 1 step and increase your plant production 1 step. Place this tile on top of an existing ocean tile. The tile grants an ADJACENCY BONUS of 1 plant.',
            },
        });
    }
}
exports.OceanFarm = OceanFarm;
//# sourceMappingURL=OceanFarm.js.map