"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietySupport = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SocietySupport extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SOCIETY_SUPPORT,
            behavior: {
                production: { plants: 1, energy: 1, heat: 1 },
                stock: { megacredits: -3 }
            },
            metadata: {
                cardNumber: 'P31',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(1).energy(1).heat(1);
                    });
                }),
                description: 'Increase your plant, energy and heat production 1 step. Pay 3 M€.',
            },
        });
    }
}
exports.SocietySupport = SocietySupport;
