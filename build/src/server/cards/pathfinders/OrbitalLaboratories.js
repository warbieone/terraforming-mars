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
                    b.plants(1).nbsp.production(((pb) => pb.plants(2)));
                }),
                description: 'Increase your plant production by 2. Gain 1 plant.',
            },
        });
    }
}
exports.OrbitalLaboratories = OrbitalLaboratories;
