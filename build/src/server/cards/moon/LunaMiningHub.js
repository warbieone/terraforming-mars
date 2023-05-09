"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaMiningHub = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
class LunaMiningHub extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_MINING_HUB,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 16,
            reserveUnits: { steel: 1, titanium: 1 },
            behavior: {
                production: { steel: 1, titanium: 1 },
                moon: {
                    tile: { type: TileType_1.TileType.LUNA_MINING_HUB, title: 'Select a space for Luna Mining Hub.' },
                    miningRate: 1,
                },
            },
            victoryPoints: 'special',
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.miningRate(5)),
            metadata: {
                cardNumber: 'M14',
                description: {
                    text: '2 VP PER MINING TILE ADJACENT TO THIS TILE.',
                    align: 'left',
                },
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Requires a mining rate of 5 or higher.', Size_1.Size.TINY, false, false).br;
                    b.minus().steel(1).minus().titanium(1).production((pb) => pb.steel(1).titanium(1)).br;
                    b.text('Spend 1 steel and 1 titanium and raise your steel and titanium production 1 step.', Size_1.Size.TINY, false, false).br;
                    b.tile(TileType_1.TileType.LUNA_MINING_HUB, true).moonMiningRate({ size: Size_1.Size.SMALL });
                    b.text('Place this tile on The Moon and raise the mining rate 1 step.', Size_1.Size.TINY, false, false);
                }),
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.moonMiningTile(2, true),
            },
        });
    }
    getVictoryPoints(player) {
        const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
        const usedSpace = moonData.moon.getSpaceByTileCard(this.name);
        if (usedSpace !== undefined) {
            const adjacentSpaces = moonData.moon.getAdjacentSpaces(usedSpace);
            const adjacentMines = adjacentSpaces.filter((s) => MoonExpansion_1.MoonExpansion.spaceHasType(s, TileType_1.TileType.MOON_MINE));
            return 2 * adjacentMines.length;
        }
        return 0;
    }
}
exports.LunaMiningHub = LunaMiningHub;
