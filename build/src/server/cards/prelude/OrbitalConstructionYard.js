"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalConstructionYard = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class OrbitalConstructionYard extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.ORBITAL_CONSTRUCTION_YARD,
            tags: [Tag_1.Tag.SPACE],
            behavior: {
                production: { titanium: 1 },
                stock: { titanium: 4 },
            },
            metadata: {
                cardNumber: 'P25',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1)).br;
                    b.titanium(4);
                }),
                description: 'Increase your titanium production 1 step. Gain 4 titanium.',
            },
        });
    }
}
exports.OrbitalConstructionYard = OrbitalConstructionYard;
