"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLuna = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const DiscardCards_1 = require("../../deferredActions/DiscardCards");
const Resource_1 = require("../../../common/Resource");
class PointLuna extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.POINT_LUNA,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            startingMegaCredits: 48,
            metadata: {
                cardNumber: 'R10',
                description: 'You start with 1 titanium production and 48 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.titanium(1)).nbsp.megacredits(48);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play an Earth tag, including this, draw a card then discard a card.', (eb) => {
                            eb.tag(Tag_1.Tag.EARTH).startEffect.cards(1).minus().cards(1);
                        });
                    });
                }),
            },
        });
    }
    onCorpCardPlayed(player, card) {
        return this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name)) {
            const tagCount = player.tags.cardTagCount(card, Tag_1.Tag.EARTH);
            if (tagCount > 0) {
                player.drawCard(tagCount), { log: true };
                player.game.defer(new DiscardCards_1.DiscardCards(player, 1));
            }
        }
    }
    bespokePlay(player) {
        player.production.add(Resource_1.Resource.TITANIUM, 1);
        player.drawCard();
        player.game.defer(new DiscardCards_1.DiscardCards(player, 1));
        return undefined;
    }
}
exports.PointLuna = PointLuna;
