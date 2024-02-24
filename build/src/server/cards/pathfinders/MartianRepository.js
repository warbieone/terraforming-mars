"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianRepository = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
class MartianRepository extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MARTIAN_REPOSITORY,
            cost: 12,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.MARS, Tag_1.Tag.BUILDING],
            resourceType: CardResource_1.CardResource.DATA,
            behavior: {
                production: { energy: -1 },
            },
            victoryPoints: { resourcesHere: {}, per: 3 },
            metadata: {
                cardNumber: 'Pf29',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('For every science or Mars tag you play (including these) add 1 data to this card.', (eb) => {
                        eb.science(1, { played: Options_1.played }).mars(1, { played: Options_1.played }).startEffect.data();
                    }).br;
                    b.minus().production((pb) => pb.energy(1));
                }),
                description: 'Decrease your energy production 1 step. 1 VP for every 3 data here.',
            },
        });
    }
    onCardPlayed(player, card) {
        const qty = player.tags.cardTagCount(card, Tag_1.Tag.SCIENCE) + player.tags.cardTagCount(card, Tag_1.Tag.MARS);
        if (qty > 0)
            player.addResourceTo(this, { qty, log: true });
    }
}
exports.MartianRepository = MartianRepository;
