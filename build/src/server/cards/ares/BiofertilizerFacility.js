"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiofertilizerFacility = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class BiofertilizerFacility extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BIOFERTILIZER_FACILITY,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.BUILDING],
            cost: 12,
            behavior: {
                production: { plants: 1 },
                addResourcesToAnyCard: { count: 2, type: CardResource_1.CardResource.MICROBE },
                tile: {
                    type: TileType_1.TileType.BIOFERTILIZER_FACILITY,
                    on: 'land',
                    adjacencyBonus: { bonus: [SpaceBonus_1.SpaceBonus.PLANT, SpaceBonus_1.SpaceBonus.MICROBE] },
                    title: 'Select space for Biofertilizer Facility tile',
                },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE)),
            metadata: {
                description: 'Requires 1 science tag. Increase your plant production 1 step. ' +
                    'Add up to 2 microbes to ANY card. ' +
                    'Place this tile which grants an ADJACENCY BONUS of 1 plant and 1 microbe.',
                cardNumber: 'A02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1));
                    b.microbes(2);
                    b.br;
                    b.tile(TileType_1.TileType.BIOFERTILIZER_FACILITY, false, true);
                }),
            },
        });
    }
}
exports.BiofertilizerFacility = BiofertilizerFacility;
//# sourceMappingURL=BiofertilizerFacility.js.map