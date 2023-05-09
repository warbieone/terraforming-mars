"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MareSerenitatisMine = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonSpaces_1 = require("../../../common/moon/MoonSpaces");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const PlaceMoonRoadTile_1 = require("../../moon/PlaceMoonRoadTile");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class MareSerenitatisMine extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MARE_SERENITATIS_MINE,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 21,
            behavior: {
                production: { steel: 1, titanium: 1 },
            },
            reserveUnits: { steel: 1, titanium: 2 },
            tr: { moonMining: 1, moonLogistics: 1 },
            metadata: {
                description: 'Spend 2 titanium and 1 steel. Increase your steel and titanium production 1 step. ' +
                    'Place a mine ON THE RESERVED AREA and a road tile adjacent to it. Raise the mining rate 1 step and the logistic rate 1 step.',
                cardNumber: 'M04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(2).minus().steel(1).br;
                    b.production((pb) => pb.steel(1).titanium(1)).br;
                    b.moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE }).asterix().nbsp.moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE }).asterix();
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_MINE, TileType_1.TileType.MOON_ROAD],
        });
    }
    bespokePlay(player) {
        MoonExpansion_1.MoonExpansion.addMineTile(player, MoonSpaces_1.MoonSpaces.MARE_SERENITATIS, this.name);
        MoonExpansion_1.MoonExpansion.raiseMiningRate(player);
        const moon = MoonExpansion_1.MoonExpansion.moonData(player.game).moon;
        const spaces = moon.getAdjacentSpaces(moon.getSpace(MoonSpaces_1.MoonSpaces.MARE_SERENITATIS));
        const availableRoadSpaces = spaces.filter((space) => {
            return space.player === undefined && space.spaceType === SpaceType_1.SpaceType.LAND;
        });
        player.game.defer(new PlaceMoonRoadTile_1.PlaceMoonRoadTile(player, availableRoadSpaces, 'Select a space next to Mare Serintatis to play a road'));
        return undefined;
    }
}
exports.MareSerenitatisMine = MareSerenitatisMine;
