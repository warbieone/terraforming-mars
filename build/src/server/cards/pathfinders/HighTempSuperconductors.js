"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighTempSuperconductors = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const PartyName_1 = require("../../../common/turmoil/PartyName");
class HighTempSuperconductors extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.HIGH_TEMP_SUPERCONDUCTORS,
            cost: 10,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SCIENCE],
            requirements: { party: PartyName_1.PartyName.KELVINISTS },
            cardDiscount: { tag: Tag_1.Tag.POWER, amount: 3 },
            behavior: {
                production: { energy: 2 },
            },
            metadata: {
                cardNumber: 'PfTMP',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When playing a power card, THE STANDARD PROJECT POWER PLANT, OR THE KELVINIST RULING POLICY ACTION, pay 3M€ less.', (eb) => {
                        eb.tag(Tag_1.Tag.POWER).asterix().slash().text('Kelvinists').startEffect.megacredits(-3);
                    }).br;
                    b.production((pb) => pb.energy(2));
                }),
                description: 'Requires Kelvinists are ruling or you have 2 delegates there. Increase your energy production 2 steps.',
            },
        });
    }
}
exports.HighTempSuperconductors = HighTempSuperconductors;
