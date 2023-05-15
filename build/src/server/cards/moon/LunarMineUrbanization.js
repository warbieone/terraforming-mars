"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarMineUrbanization = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const TileType_1 = require("../../../common/TileType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../CardRequirements");
class LunarMineUrbanization extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_MINE_URBANIZATION,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 8,
            behavior: {
                production: { megacredits: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.miningTiles(1)),
            tr: { moonHabitat: 1 },
            metadata: {
                description: 'Requires you have 1 mine tile. Increase your M€ production 1 step. Replace one of your mine tiles ' +
                    'with this special tile. Raise the habitat rate 1 step. This tile counts both as a habitat and a mine tile.',
                cardNumber: 'M55',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).br;
                    b.moonHabitatRate();
                    b.tile(TileType_1.TileType.LUNAR_MINE_URBANIZATION, true).asterix();
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        return MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_MINE, { ownedBy: player, upgradedTiles: false }).length > 0;
    }
    bespokePlay(player) {
        const spaces = MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_MINE, { ownedBy: player, upgradedTiles: false });
        return new SelectSpace_1.SelectSpace('Select one of your mines to upgrade', spaces, (space) => {
            if (space.tile === undefined) {
                throw new Error(`Space ${space.id} should have a tile, how doesn't it?`);
            }
            space.tile.tileType = TileType_1.TileType.LUNAR_MINE_URBANIZATION;
            MoonExpansion_1.MoonExpansion.raiseHabitatRate(player);
            return undefined;
        });
    }
}
exports.LunarMineUrbanization = LunarMineUrbanization;
//# sourceMappingURL=LunarMineUrbanization.js.map