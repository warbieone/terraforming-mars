"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreatDamPromo = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Board_1 = require("../../boards/Board");
const SelectSpace_1 = require("../../inputs/SelectSpace");
class GreatDamPromo extends Card_1.Card {
    constructor(name = CardName_1.CardName.GREAT_DAM_PROMO, adjacencyBonus = undefined, metadata = {
        cardNumber: 'X32',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.production((pb) => pb.energy(2)).tile(TileType_1.TileType.GREAT_DAM, true, false).asterix();
        }),
        description: 'Requires 4 ocean tiles. Increase your energy production 2 steps. Place this tile ADJACENT TO an ocean tile.',
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            cost: 15,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            metadata,
            adjacencyBonus,
            behavior: {
                production: { energy: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(4)),
            victoryPoints: 1,
        });
    }
    bespokeCanPlay(player) {
        return this.getAvailableSpaces(player).length > 0;
    }
    bespokePlay(player) {
        const availableSpaces = this.getAvailableSpaces(player);
        if (availableSpaces.length < 1)
            return undefined;
        return new SelectSpace_1.SelectSpace('Select space for tile', availableSpaces, (space) => {
            player.game.addTile(player, space, { tileType: TileType_1.TileType.GREAT_DAM });
            space.adjacency = this.adjacencyBonus;
            return undefined;
        });
    }
    getAvailableSpaces(player) {
        return player.game.board.getAvailableSpacesOnLand(player)
            .filter((space) => player.game.board.getAdjacentSpaces(space).filter((adjacentSpace) => Board_1.Board.isOceanSpace(adjacentSpace)).length > 0);
    }
}
exports.GreatDamPromo = GreatDamPromo;
//# sourceMappingURL=GreatDamPromo.js.map