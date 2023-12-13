"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teractor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("./CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Teractor extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.TERACTOR,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 60,
            cardDiscount: { tag: Tag_1.Tag.EARTH, amount: 3 },
            metadata: {
                cardNumber: 'R30',
                description: 'You start with 60 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(60);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play an Earth tag, you pay 3 M€ less for it.', (eb) => {
                            eb.earth(1, { played: Options_1.played }).startEffect.megacredits(-3);
                        });
                    });
                }),
            },
        });
    }
}
exports.Teractor = Teractor;
//# sourceMappingURL=Teractor.js.map