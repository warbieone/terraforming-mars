"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OceanSanctuary = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class OceanSanctuary extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.OCEAN_SANCTUARY,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 9,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(5)),
            behavior: {
                addResources: 1,
                tile: {
                    type: TileType_1.TileType.OCEAN_SANCTUARY,
                    on: 'upgradeable-ocean',
                    title: 'Select space for Ocean Sanctuary',
                    adjacencyBonus: { bonus: [SpaceBonus_1.SpaceBonus.ANIMAL] },
                },
            },
            metadata: {
                cardNumber: 'A22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tile(TileType_1.TileType.OCEAN_SANCTUARY, false, true).nbsp.animals(1).br;
                    b.vpText('1 VP per animal on this card.');
                }),
                description: 'Requires 5 ocean tiles. Place this tile on top of an existing ocean tile. The tile grants an ADJACENCY BONUS of 1 animal. Add 1 animal to this card.',
            },
        });
    }
}
exports.OceanSanctuary = OceanSanctuary;
//# sourceMappingURL=OceanSanctuary.js.map