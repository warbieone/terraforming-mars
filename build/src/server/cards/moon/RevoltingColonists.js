"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevoltingColonists = void 0;
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
class RevoltingColonists extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.REVOLTING_COLONISTS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON],
            cost: 3,
            requirements: { habitatRate: 4 },
            metadata: {
                description: 'Requires 4 habitat rate. All players pay 3M€ for each habitat tile they own.',
                cardNumber: 'M51',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().megacredits(3, { all: Options_1.all }).slash().moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        const colonies = MoonExpansion_1.MoonExpansion.spaces(game, TileType_1.TileType.MOON_HABITAT);
        game.getPlayers().forEach((target) => {
            const owned = colonies.filter((colony) => colony.player?.id === target.id).length;
            if (owned > 0) {
                const bill = owned * 3;
                const owes = Math.min(bill, target.spendableMegacredits());
                if (owes > 0) {
                    target.maybeBlockAttack(player, (proceed) => {
                        if (proceed) {
                            game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(target, owes, {
                                title: (0, MessageBuilder_1.message)('You must spend ${0} M€ for ${1} habitat tiles', (b) => b.number(owes).number(owned))
                            }))
                                .andThen(() => game.log('${0} spends ${1} M€ for the ${2} habitat tiles they own.', (b) => b.player(target).number(owes).number(owned)));
                        }
                        return undefined;
                    });
                }
            }
        });
        return undefined;
    }
}
exports.RevoltingColonists = RevoltingColonists;
