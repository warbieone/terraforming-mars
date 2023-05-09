"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningComplex = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardRenderer_1 = require("../render/CardRenderer");
const PlaceMoonMineTile_1 = require("../../moon/PlaceMoonMineTile");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const PlaceMoonRoadTile_1 = require("../../moon/PlaceMoonRoadTile");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Resource_1 = require("../../../common/Resource");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const TileType_1 = require("../../../common/TileType");
class MiningComplex extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.MINING_COMPLEX,
            tags: [Tag_1.Tag.MOON],
            startingMegacredits: -7,
            tilesBuilt: [TileType_1.TileType.MOON_MINE, TileType_1.TileType.MOON_ROAD],
            metadata: {
                description: 'Place a mine tile on The Moon and raise the mining rate 1 step. ' +
                    'Place a road tile adjacent to placed mine tile and raise the Logistics Rate 1 step. ' +
                    'Pay 7 M€.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE }).moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_LOGISTICS_RATE }).asterix().br.minus().megacredits(7)),
            },
        });
    }
    bespokeCanPlay(player) {
        return player.canAfford(7);
    }
    bespokePlay(player) {
        player.game.defer(new PlaceMoonMineTile_1.PlaceMoonMineTile(player)
            .andThen((space) => {
            const moon = MoonExpansion_1.MoonExpansion.moonData(player.game).moon;
            const spaces = moon.getAdjacentSpaces(space);
            const availableRoadSpaces = spaces.filter((space) => {
                return space.player === undefined && space.spaceType === SpaceType_1.SpaceType.LAND;
            });
            player.game.defer(new PlaceMoonRoadTile_1.PlaceMoonRoadTile(player, availableRoadSpaces, 'Select a space next to the mine for a road'));
        }));
        player.deductResource(Resource_1.Resource.MEGACREDITS, 7);
        return undefined;
    }
}
exports.MiningComplex = MiningComplex;
