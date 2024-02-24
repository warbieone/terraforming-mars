"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LTFPrivileges = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class LTFPrivileges extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LTF_PRIVILEGES,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON],
            cost: 21,
            metadata: {
                cardNumber: 'M82',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When playing a Moon tag, you do not pay additional steel or titanium for playing it.', (eb) => {
                        eb.moon().startEffect.text('0').steel(1).nbsp.text('0').titanium(1);
                    });
                }),
            },
        });
    }
}
exports.LTFPrivileges = LTFPrivileges;
