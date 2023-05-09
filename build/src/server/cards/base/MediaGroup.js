"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaGroup = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const GainResources_1 = require("../../deferredActions/GainResources");
const Resource_1 = require("../../../common/Resource");
class MediaGroup extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MEDIA_GROUP,
            tags: [Tag_1.Tag.EARTH],
            cost: 6,
            metadata: {
                cardNumber: '109',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('After you play an event card, you gain 3 M€.', (eb) => {
                        eb.event({ played: Options_1.played }).startEffect.megacredits(3);
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.type === CardType_1.CardType.EVENT) {
            player.game.defer(new GainResources_1.GainResources(player, Resource_1.Resource.MEGACREDITS, { count: 3 }));
        }
    }
}
exports.MediaGroup = MediaGroup;
