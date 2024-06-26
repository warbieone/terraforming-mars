"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmicRadiation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class CosmicRadiation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.COSMIC_RADIATION,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON],
            cost: 3,
            requirements: { miningRate: 4 },
            metadata: {
                description: 'Requires 4 mining rate. All players pay 4M€ for each mining tile they own.',
                cardNumber: 'M52',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().megacredits(4, { all: Options_1.all }).slash().moonMine({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        const mines = MoonExpansion_1.MoonExpansion.spaces(game, TileType_1.TileType.MOON_MINE);
        game.getPlayersInGenerationOrder().forEach((mineTileOwner) => {
            const owned = mines.filter((mine) => mine.player?.id === mineTileOwner.id).length;
            if (owned > 0) {
                const bill = owned * 4;
                const owes = Math.min(bill, mineTileOwner.spendableMegacredits());
                game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(mineTileOwner, owes, {
                    title: (0, MessageBuilder_1.message)('You must spend ${0} M€ for ${1} mining tiles', (b) => b.number(owes).number(owned))
                }))
                    .andThen(() => game.log('${0} spends ${1} M€ for the ${2} mining tiles they own.', (b) => b.player(mineTileOwner).number(owes).number(owned)));
            }
        });
        return undefined;
    }
}
exports.CosmicRadiation = CosmicRadiation;
