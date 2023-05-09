"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoboLog = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class PhoboLog extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.PHOBOLOG,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 23,
            behavior: {
                stock: { titanium: 10 },
                titanumValue: 1,
            },
            metadata: {
                cardNumber: 'R09',
                description: 'You start with 10 titanium and 23 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(23).nbsp.titanium(10, { digit: Options_1.digit });
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
