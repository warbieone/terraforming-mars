"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreatDamPromo = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Board_1 = require("../../boards/Board");
const PlaceTile_1 = require("../../deferredActions/PlaceTile");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
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
            requirements: { oceans: 4 },
            victoryPoints: 1,
        });
    }
    bespokeCanPlay(player, canAffordOptions) {
        return this.getAvailableSpaces(player, canAffordOptions).length > 0;
    }
    bespokePlay(player) {
        player.game.defer(new PlaceTile_1.PlaceTile(player, {
            tile: { tileType: TileType_1.TileType.GREAT_DAM, card: this.name },
            on: () => this.getAvailableSpaces(player),
            title: (0, MessageBuilder_1.message)('Select space for ${0}', (b) => b.card(this)),
            adjacencyBonus: this.adjacencyBonus,
        }));
        return undefined;
    }
    getAvailableSpaces(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions)
            .filter((space) => player.game.board.getAdjacentSpaces(space).filter((adjacentSpace) => Board_1.Board.isOceanSpace(adjacentSpace)).length > 0);
    }
}
exports.GreatDamPromo = GreatDamPromo;
