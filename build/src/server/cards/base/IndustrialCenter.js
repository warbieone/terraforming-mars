"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustrialCenter = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const CardName_1 = require("../../../common/cards/CardName");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
class IndustrialCenter extends ActionCard_1.ActionCard {
    constructor(name = CardName_1.CardName.INDUSTRIAL_CENTER, adjacencyBonus = undefined, metadata = {
        cardNumber: '123',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.action('Spend 7 M€ to increase your steel production 1 step.', (eb) => {
                eb.megacredits(7).startAction.production((pb) => pb.steel(1));
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
                    megacredits: 7,
                },
                production: { steel: 1 },
            },
            metadata,
        });
    }
    getAvailableSpaces(player) {
        return player.game.board.getAvailableSpacesOnLand(player)
            .filter((space) => player.game.board.getAdjacentSpaces(space).some((adjacentSpace) => Board_1.Board.isCitySpace(adjacentSpace)));
    }
    bespokeCanPlay(player) {
        return this.getAvailableSpaces(player).length > 0;
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace('Select space adjacent to a city tile', this.getAvailableSpaces(player), (space) => {
            player.game.addTile(player, space, { tileType: TileType_1.TileType.INDUSTRIAL_CENTER });
            space.adjacency = this.adjacencyBonus;
            return undefined;
        });
    }
}
exports.IndustrialCenter = IndustrialCenter;
