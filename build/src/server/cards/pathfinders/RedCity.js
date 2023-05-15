"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const TileType_1 = require("../../../common/TileType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const AresHandler_1 = require("../../ares/AresHandler");
const Board_1 = require("../../boards/Board");
class RedCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RED_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 21,
            behavior: {
                production: { energy: -1, megacredits: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.REDS)),
            victoryPoints: 'special',
            metadata: {
                cardNumber: 'PFT2',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.minus().energy(1).megacredits(2));
                }),
                description: 'Requires that Reds are ruling or that you have 2 delegates there. ' +
                    '-1 energy prod, +2 M€ prod. ' +
                    'Place the special tile on Mars ADJACENT TO NO GREENERY. ' +
                    'NO GREENERY MAY BE PLACED NEXT TO THIS TILE. 1 VP for every empty space (or hazard) next to this tile.',
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.questionmark(),
            },
        });
    }
    availableRedCitySpaces(player) {
        const board = player.game.board;
        const citySpaces = board.getAvailableSpacesForCity(player);
        return citySpaces.filter((space) => !board.getAdjacentSpaces(space).some(Board_1.Board.isGreenerySpace));
    }
    bespokeCanPlay(player) {
        return this.availableRedCitySpaces(player).length > 0;
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace('Select space for Red City', this.availableRedCitySpaces(player), (space) => {
            player.game.addTile(player, space, { tileType: TileType_1.TileType.RED_CITY, card: this.name });
            return undefined;
        });
    }
    getVictoryPoints(player) {
        const space = player.game.board.getSpaceByTileCard(this.name);
        if (space === undefined) {
            return 0;
        }
        const neighbors = player.game.board.getAdjacentSpaces(space);
        return neighbors.filter((neighbor) => neighbor.tile === undefined || AresHandler_1.AresHandler.hasHazardTile(neighbor)).length;
    }
}
exports.RedCity = RedCity;
//# sourceMappingURL=RedCity.js.map