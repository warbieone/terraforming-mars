"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNMIContractor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class UNMIContractor extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.UNMI_CONTRACTOR,
            tags: [Tag_1.Tag.EARTH],
            behavior: {
                drawCard: 1,
                tr: 3,
            },
            metadata: {
                cardNumber: 'P34',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(3).br;
                    b.cards(1);
                }),
                description: 'Increase your TR 3 steps. Draw a card.',
            },
        });
    }
}
exports.UNMIContractor = UNMIContractor;
