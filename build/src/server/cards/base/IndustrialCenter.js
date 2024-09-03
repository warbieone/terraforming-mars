"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustrialCenter = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const PlaceTile_1 = require("../../../server/deferredActions/PlaceTile");
const CardName_1 = require("../../../common/cards/CardName");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
class IndustrialCenter extends ActionCard_1.ActionCard {
    constructor(name = CardName_1.CardName.INDUSTRIAL_CENTER, adjacencyBonus = undefined, metadata = {
        cardNumber: '123',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.action('Spend 6 M€ to increase your steel production 1 step.', (eb) => {
                eb.megacredits(6).startAction.production((pb) => pb.steel(1));
            }).br;
            b.tile(TileType_1.TileType.INDUSTRIAL_CENTER, true, false).asterix();
        }),
        description: 'Place this tile adjacent to a city tile.',
    }) {
        super({
            type: CardType_1.CardType.ACTIVE,
            name,
            tags: [Tag_1.Tag.BUILDING],
            cost: 4,
            adjacencyBonus,
            action: {
                spend: {
                    megacredits: 6,
                },
                production: { steel: 1 },
            },
            metadata,
        });
    }
    getAvailableSpaces(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions)
            .filter((space) => player.game.board.getAdjacentSpaces(space).some((adjacentSpace) => Board_1.Board.isCitySpace(adjacentSpace)));
    }
    bespokeCanPlay(player, canAffordOptions) {
        return this.getAvailableSpaces(player, canAffordOptions).length > 0;
    }
    bespokePlay(player) {
        player.game.defer(new PlaceTile_1.PlaceTile(player, {
            tile: { tileType: TileType_1.TileType.INDUSTRIAL_CENTER, card: this.name },
            on: () => this.getAvailableSpaces(player),
            title: 'Select space adjacent to a city tile',
            adjacencyBonus: this.adjacencyBonus,
        }));
        return undefined;
    }
}
exports.IndustrialCenter = IndustrialCenter;
