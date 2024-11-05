"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanAllen = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Options_1 = require("../Options");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
class VanAllen extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.VANALLEN,
            metadata: {
                cardNumber: 'L22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('MILESTONES ALWAYS COST 0 M€ FOR YOU.', (eb) => {
                        eb.plate('Milestones').startEffect.megacredits(1, { text: '0' });
                    });
                    b.br;
                    b.effect('When any milestone is claimed, gain 3 M€.', (eb) => eb.milestone({ all: Options_1.all }).startEffect.megacredits(3));
                }),
            },
        });
    }
    canAct() {
        return false;
    }
}
exports.VanAllen = VanAllen;
