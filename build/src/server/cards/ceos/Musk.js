"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Musk = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const DrawCards_1 = require("../../deferredActions/DrawCards");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectCard_1 = require("../../inputs/SelectCard");
class Musk extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.MUSK,
            metadata: {
                cardNumber: 'L28',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().minus().cards(1, { secondaryTag: Tag_1.Tag.EARTH }).colon().cards(1, { secondaryTag: Tag_1.Tag.SPACE }).titanium(1).asterix();
                    b.br;
                    b.titanium(6);
                    b.br.br;
                }),
                description: 'Once per game, discard any number of Earth cards to draw that many space cards, and gain that many units of titanium, plus 6.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const eligibleCards = player.cardsInHand.filter((card) => card.tags.includes(Tag_1.Tag.EARTH));
        if (eligibleCards.length === 0) {
            game.log('${0} has no Earth cards', (b) => b.player(player), { reservedFor: player });
            player.addResource(Resource_1.Resource.TITANIUM, 6, { log: true });
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select Earth card(s) to discard', 'Discard', eligibleCards, (cards) => {
            player.addResource(Resource_1.Resource.TITANIUM, cards.length + 6, { log: true });
            for (const card of cards) {
                player.cardsInHand.splice(player.cardsInHand.indexOf(card), 1);
                game.projectDeck.discard(card);
            }
            player.game.defer(DrawCards_1.DrawCards.keepAll(player, cards.length, { tag: Tag_1.Tag.SPACE }));
            return undefined;
        }, { min: 0, max: eligibleCards.length });
    }
}
exports.Musk = Musk;
