"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinoffDepartment = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class SpinoffDepartment extends Card_1.Card {
    constructor() {
        super({
            cost: 10,
            tags: [Tag_1.Tag.BUILDING],
            name: CardName_1.CardName.SPINOFF_DEPARTMENT,
            type: CardType_1.CardType.ACTIVE,
            behavior: {
                production: { megacredits: 2 },
            },
            metadata: {
                cardNumber: 'C41',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('WHEN PLAYING A CARD WITH A BASIC COST OF 20M€ OR MORE, draw a card.', (eb) => {
                        eb.megacredits(20).asterix().startEffect.cards(1);
                    }).br;
                    b.production((pb) => pb.megacredits(2));
                }),
                description: 'Increase your M€ production 2 steps.',
            },
        });
    }
    onCardPlayed(player, card) {
        if (card.cost >= 20) {
            player.drawCard();
        }
    }
}
exports.SpinoffDepartment = SpinoffDepartment;
