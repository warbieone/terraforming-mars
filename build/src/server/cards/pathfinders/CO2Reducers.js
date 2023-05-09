"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CO2Reducers = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class CO2Reducers extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.CO2_REDUCERS,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.VENUS],
            behavior: {
                production: { megacredits: 3 },
                drawCard: { count: 2, tag: Tag_1.Tag.MICROBE },
            },
            metadata: {
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(3)).br;
                    b.cards(2, { secondaryTag: Tag_1.Tag.MICROBE });
                }),
                description: 'Increase your M€ production 3 steps. Draw 2 cards with a microbe tag.',
            },
        });
    }
}
exports.CO2Reducers = CO2Reducers;
