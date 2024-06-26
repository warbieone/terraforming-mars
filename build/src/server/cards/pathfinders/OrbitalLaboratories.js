"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalLaboratories = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class OrbitalLaboratories extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ORBITAL_LABORATORIES,
            cost: 18,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.PLANT, Tag_1.Tag.SPACE],
            behavior: {
                production: { plants: 2 },
                stock: { plants: 1 },
            },
            metadata: {
                cardNumber: 'Pf07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production(((pb) => pb.plants(2))).nbsp.plants(1);
                }),
                description: 'Increase your plant production 2 steps. Gain 1 plant.',
            },
        });
    }
}
exports.OrbitalLaboratories = OrbitalLaboratories;
