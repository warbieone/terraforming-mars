"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wetlands = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Board_1 = require("../../boards/Board");
const Size_1 = require("../../../common/cards/render/Size");
class Wetlands extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.WETLANDS,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.MARS],
            cost: 20,
            tr: { oxygen: 1, tr: 1 },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(2)),
            reserveUnits: { plants: 4 },
            metadata: {
                cardNumber: 'Pf03',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().plants(4).br;
                    b.tile(TileType_1.TileType.WETLANDS, false, false).asterix();
                    b.oxygen(1).tr(1);
                    b.br;
                    b.text('(Requires 2 ocean tiles. Lose 4 plants. Place this tile on an UNRESERVED SPACE ' +
                        'ADJACENT TO AT LEAST 2 OCEANS. Raise oxygen 1 step. Gain 1 TR.)', Size_1.Size.TINY, false, false);
                    b.br;
                    b.text('(Effect: Wetlands counts as a greenery tile and an ocean tile, except it can\'t be covered and is not one of the 9 oceans required to end the game.)', Size_1.Size.TINY, false, false);
                }),
            },
        });
    }
    availableSpaces(player) {
        const board = player.game.board;
        const adjacentOceans = (space) => {
            const adjacentSpaces = board.getAdjacentSpaces(space);
            return adjacentSpaces.filter(Board_1.Board.isOceanSpace).length;
        };
        const redCity = board.getSpaceByTileCard(CardName_1.CardName.RED_CITY);
        const spacesNextToRedCity = redCity ?
            board.getAdjacentSpaces(redCity) :
            [];
        return board.getAvailableSpacesOnLand(player)
            .filter((space) => adjacentOceans(space) >= 2)
            .filter((space) => !spacesNextToRedCity.includes(space));
    }
    bespokeCanPlay(player) {
        if (!player.hasUnits(this.reserveUnits)) {
            return false;
        }
        return this.availableSpaces(player).length > 0;
    }
    bespokePlay(player) {
        player.deductUnits(this.reserveUnits);
        return new SelectSpace_1.SelectSpace('Select space for Wetlands', this.availableSpaces(player), (space) => {
            const tile = {
                tileType: TileType_1.TileType.WETLANDS,
                card: this.name,
                covers: space.tile,
            };
            player.game.addTile(player, space, tile);
            player.game.increaseOxygenLevel(player, 1);
            return undefined;
        });
    }
}
exports.Wetlands = Wetlands;