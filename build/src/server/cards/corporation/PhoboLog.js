"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoboLog = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("./CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class PhoboLog extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.PHOBOLOG,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 30,
            behavior: {
                stock: { titanium: 8 },
                titanumValue: 1,
            },
            firstAction: {
                text: 'Draw 2 cards with a space tag',
                drawCard: { count: 2, tag: Tag_1.Tag.SPACE },
            },
            metadata: {
                cardNumber: 'R09',
                description: 'You start with 8 titanium and 30 M€. As your first action, reveal cards from the deck until you have revealed 2 cards with a space tag. Take them into hand and discard the rest.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(23).nbsp.titanium(8, { digit: Options_1.digit }).nbsp.cards(2, { secondaryTag: Tag_1.Tag.SPACE });
                    b.corpBox('effect', (ce) => {
                        ce.effect('Your titanium resources are each worth 1 M€ extra.', (eb) => {
                            eb.titanium(1).startEffect.plus(Size_1.Size.SMALL).megacredits(1);
                        });
                    });
                }),
            },
        });
    }
}
exports.PhoboLog = PhoboLog;
//# sourceMappingURL=PhoboLog.js.map