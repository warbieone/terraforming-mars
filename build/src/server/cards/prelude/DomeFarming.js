"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomeFarming = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class DomeFarming extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.DOME_FARMING,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            behavior: {
                production: { megacredits: 2, plants: 1 },
            },
            metadata: {
                cardNumber: 'P07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2).plants(1));
                }),
                description: 'Increase your M€ production 2 steps and plant production 1 step.',
            },
        });
        this.migrated = true;
    }
}
exports.DomeFarming = DomeFarming;
