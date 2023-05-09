"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntidesertificationTechniques = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AntidesertificationTechniques extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.ANTI_DESERTIFICATION_TECHNIQUES,
            behavior: {
                production: { plants: 1, steel: 1 },
                stock: { megacredits: 5 },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(5).br;
                    b.production((pb) => pb.plants(1).steel(1));
                }),
                description: 'Gain 5 M€. Increase your plant production 1 step and your steel production 1 step.',
            },
        });
    }
}
exports.AntidesertificationTechniques = AntidesertificationTechniques;
