"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SponsoredAcademies = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const DiscardCards_1 = require("../../deferredActions/DiscardCards");
const CardRenderer_1 = require("../render/CardRenderer");
const DrawCards_1 = require("../../deferredActions/DrawCards");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SponsoredAcademies extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SPONSORED_ACADEMIES,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SCIENCE],
            cost: 9,
            victoryPoints: 1,
            metadata: {
                cardNumber: '247',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().cards(1).br;
                    b.plus().cards(3, { digit: Options_1.digit }).asterix().nbsp.plus().cards(1, { all: Options_1.all }).asterix();
                }),
                description: 'Discard 1 card from your hand and THEN draw 3 cards. All OPPONENTS draw 1 card.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.cardsInHand.length > 1;
    }
    bespokePlay(player) {
        player.game.defer(new DiscardCards_1.DiscardCards(player), DeferredAction_1.Priority.SPONSORED_ACADEMIES);
        player.game.defer(DrawCards_1.DrawCards.keepAll(player, 3), DeferredAction_1.Priority.SPONSORED_ACADEMIES);
        const otherPlayers = player.game.getPlayers().filter((p) => p.id !== player.id);
        for (const p of otherPlayers) {
            player.game.defer(DrawCards_1.DrawCards.keepAll(p));
        }
        return undefined;
    }
}
exports.SponsoredAcademies = SponsoredAcademies;
