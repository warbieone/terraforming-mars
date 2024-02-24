"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrobiologyPatents = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class MicrobiologyPatents extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MICROBIOLOGY_PATENTS,
            cost: 6,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.MICROBE],
            metadata: {
                cardNumber: 'Pf63',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('After you play a card with a microbe tag, increase your M€ production 1 step.', (eb) => eb.microbes(1, { played: Options_1.played }).startEffect.production((pb) => pb.megacredits(1)));
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.tags.includes(Tag_1.Tag.MICROBE)) {
            player.production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
        }
    }
}
exports.MicrobiologyPatents = MicrobiologyPatents;
