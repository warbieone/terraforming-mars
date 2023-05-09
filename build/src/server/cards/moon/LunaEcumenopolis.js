"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaEcumenopolis = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Card_1 = require("../Card");
const TileType_1 = require("../../../common/TileType");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const PlaceMoonHabitatTile_1 = require("../../moon/PlaceMoonHabitatTile");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
class LunaEcumenopolis extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_ECUMENOPOLIS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            cost: 35,
            reserveUnits: { titanium: 2 },
            metadata: {
                description: 'Spend 2 titanium. ' +
                    'Place 2 habitat tiles adjacent to at least 2 other habitat tiles and raise habitat rate 2 steps. ' +
                    'Increase your TR 1 step for each 2 steps of the habitat rate.',
                cardNumber: 'M84',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(2).nbsp;
                    b.text('2').moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE }).asterix().br;
                    b.tr(1).slash().moonHabitatRate().moonHabitatRate();
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
    canAffordTRBump(player) {
        const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
        const expectedColonyRate = Math.min(moonData.colonyRate + 2, 8);
        const expectedTRBump = Math.floor(expectedColonyRate / 2);
        return player.canAfford(0, { tr: { moonHabitat: 2, tr: expectedTRBump } });
    }
    bespokeCanPlay(player) {
        if (!this.canAffordTRBump(player)) {
            return false;
        }
        const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
        const spaces = moonData.moon.getAvailableSpacesOnLand(player);
        const len = spaces.length;
        let firstSpaceId = '';
        const nextToTwoColonies = function (space) {
            const adjacentSpaces = moonData.moon.getAdjacentSpaces(space).filter((adjacentSpace) => {
                return MoonExpansion_1.MoonExpansion.spaceHasType(adjacentSpace, TileType_1.TileType.MOON_HABITAT) || adjacentSpace.id === firstSpaceId;
            });
            return adjacentSpaces.length >= 2;
        };
        for (let x = 0; x < len; x++) {
            const first = spaces[x];
            if (nextToTwoColonies(first) === true) {
                firstSpaceId = first.id;
                for (let y = 0; y < len; y++) {
                    const second = spaces[y];
                    if (second.id === firstSpaceId)
                        continue;
                    if (nextToTwoColonies(second) === true) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    bespokePlay(player) {
        player.game.defer(new CustomPlaceMoonTile(player));
        player.game.defer(new CustomPlaceMoonTile(player));
        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
            const colonyRate = MoonExpansion_1.MoonExpansion.moonData(player.game).colonyRate;
            player.increaseTerraformRatingSteps(Math.floor(colonyRate / 2));
            return undefined;
        }));
        return undefined;
    }
}
exports.LunaEcumenopolis = LunaEcumenopolis;
class CustomPlaceMoonTile extends PlaceMoonHabitatTile_1.PlaceMoonHabitatTile {
    getSpaces(moonData) {
        const spaces = moonData.moon.getAvailableSpacesOnLand(this.player);
        const filtered = spaces.filter((space) => {
            const adjacentSpaces = moonData.moon.getAdjacentSpaces(space).filter((adjacentSpace) => {
                return MoonExpansion_1.MoonExpansion.spaceHasType(adjacentSpace, TileType_1.TileType.MOON_HABITAT);
            });
            return adjacentSpaces.length >= 2;
        });
        return filtered;
    }
}
