"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lowell = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Tag_1 = require("../../../common/cards/Tag");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const titles_1 = require("../../inputs/titles");
const DrawCeoCardFromDeck_1 = require("../../deferredActions/DrawCeoCardFromDeck");
const utils_1 = require("../../../common/utils/utils");
class Lowell extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.LOWELL,
            tags: [Tag_1.Tag.WILD],
            metadata: {
                cardNumber: 'L12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().megacredits(8).colon().text('CHANGE LEADER').asterix();
                    b.br.br;
                }),
                description: 'Once per game, pay 8 M€ to draw 3 CEO cards and choose one to play. Discard this card.',
            },
        });
    }
    canAct(player) {
        if (!player.game.ceoDeck.canDraw(3)) {
            this.warnings.add('deckTooSmall');
        }
        if (!super.canAct(player)) {
            return false;
        }
        return player.canAfford(8);
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 8, { title: titles_1.TITLES.payForCardAction(this.name) }))
            .andThen(() => {
            player.game.defer(new DrawCeoCardFromDeck_1.DrawCeoCardFromDeck(player, 3)).andThen((newCeo) => {
                if (newCeo !== undefined) {
                    (0, utils_1.inplaceRemove)(player.playedCards, this);
                    game.ceoDeck.discard(this);
                    player.playCard(newCeo);
                }
            });
        });
        return undefined;
    }
}
exports.Lowell = Lowell;
