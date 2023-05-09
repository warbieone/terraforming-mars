"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheGrandLunaCapitalGroup = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Resource_1 = require("../../../common/Resource");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const Size_1 = require("../../../common/cards/render/Size");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class TheGrandLunaCapitalGroup extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.THE_GRAND_LUNA_CAPITAL_GROUP,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            startingMegaCredits: 32,
            victoryPoints: 'special',
            behavior: {
                stock: { titanium: 1 },
            },
            firstAction: {
                text: 'Place a habitat tile',
                moon: { habitatTile: {} },
            },
            metadata: {
                description: {
                    text: 'You start with 32 M€ and 1 titanium. As your first action, place a habitat tile on The Moon and raise the habitat rate 1 step.',
                    align: 'left',
                },
                cardNumber: 'MC7',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(32).titanium(1).moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE }).br;
                    b.effect('When you place a colony tile, gain 2 M€ for each adjacent colony tile.', (eb) => {
                        eb.moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all }).moonHabitat({ size: Size_1.Size.SMALL }).asterix()
                            .startEffect
                            .megacredits(2).slash().moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all });
                    }).br,
                        b.vpText('1 VP for each habitat tile adjacent to your habitat tiles.').br;
                }),
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.moonHabitatTile(1),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (cardOwner.id !== activePlayer.id) {
            return;
        }
        if (!MoonExpansion_1.MoonExpansion.spaceHasType(space, TileType_1.TileType.MOON_HABITAT)) {
            return;
        }
        const adjacentSpaces = MoonExpansion_1.MoonExpansion.moonData(cardOwner.game).moon.getAdjacentSpaces(space);
        const filtered = adjacentSpaces.filter((space) => MoonExpansion_1.MoonExpansion.spaceHasType(space, TileType_1.TileType.MOON_HABITAT));
        cardOwner.addResource(Resource_1.Resource.MEGACREDITS, filtered.length * 2, { log: true });
    }
    getVictoryPoints(player) {
        const moon = MoonExpansion_1.MoonExpansion.moonData(player.game).moon;
        const neighboringColonyTiles = new Set();
        const colonyTiles = MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_HABITAT, { ownedBy: player });
        colonyTiles.forEach((tile) => moon.getAdjacentSpaces(tile).forEach((neighbor) => {
            if (MoonExpansion_1.MoonExpansion.spaceHasType(neighbor, TileType_1.TileType.MOON_HABITAT)) {
                neighboringColonyTiles.add(neighbor.id);
            }
        }));
        return neighboringColonyTiles.size;
    }
}
exports.TheGrandLunaCapitalGroup = TheGrandLunaCapitalGroup;
