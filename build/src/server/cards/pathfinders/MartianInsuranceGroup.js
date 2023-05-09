"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianInsuranceGroup = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MartianInsuranceGroup extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.MARTIAN_INSURANCE_GROUP,
            tags: [Tag_1.Tag.MARS],
            startingMegaCredits: 42,
            behavior: {
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'PfC12',
                description: 'You start with 42 M€ and 1 M€ production.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(42).production((pb) => pb.megacredits(1));
                    b.corpBox('effect', (ce) => {
                        ce.effect('Whenever you play an event card, raise your M€ production 1 step.', (eb) => {
                            eb.event({ played: Options_1.played }).startEffect.production((pb) => pb.megacredits(1));
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name) && card.type === CardType_1.CardType.EVENT) {
            player.production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
        }
    }
}
exports.MartianInsuranceGroup = MartianInsuranceGroup;
