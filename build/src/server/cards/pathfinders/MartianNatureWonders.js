"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianNatureWonders = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const CardResource_1 = require("../../../common/CardResource");
const TileType_1 = require("../../../common/TileType");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class MartianNatureWonders extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MARTIAN_NATURE_WONDERS,
            cost: 13,
            tags: [Tag_1.Tag.MARS],
            victoryPoints: 2,
            behavior: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 2 },
            },
            metadata: {
                cardNumber: 'Pf10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.resource(CardResource_1.CardResource.RESOURCE_CUBE).asterix().br;
                    b.resource(CardResource_1.CardResource.DATA, 2).asterix();
                }),
                description: 'Place a neutral player cube on a non-reserved space. No tile can be placed on that space this game. ' +
                    'Gather any bonus on that space, but no bonuses from adjacent spaces. Add 2 data to ANY card.',
            },
        });
    }
    bespokeCanPlay(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions).length > 0;
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace((0, MessageBuilder_1.message)('Select space for ${0}', (b) => b.card(this)), player.game.board.getAvailableSpacesOnLand(player))
            .andThen((space) => {
            player.game.simpleAddTile(player, space, { tileType: TileType_1.TileType.MARTIAN_NATURE_WONDERS });
            player.game.grantSpaceBonuses(player, space);
            return undefined;
        });
    }
}
exports.MartianNatureWonders = MartianNatureWonders;
