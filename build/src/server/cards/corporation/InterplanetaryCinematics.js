"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterplanetaryCinematics = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class InterplanetaryCinematics extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.INTERPLANETARY_CINEMATICS,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 40,
            behavior: {
                stock: { steel: 12 },
            },
            metadata: {
                cardNumber: 'R19',
                description: 'You start with 12 steel and 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(40).nbsp.steel(12, { digit: Options_1.digit });
                    b.corpBox('effect', (ce) => {
                        ce.effect('Each time you play an event, you gain 3 M€.', (eb) => {
                            eb.event({ played: Options_1.played }).startEffect.megacredits(3);
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name) && card.type === CardType_1.CardType.EVENT) {
            player.megaCredits += 3;
        }
    }
}
exports.InterplanetaryCinematics = InterplanetaryCinematics;
