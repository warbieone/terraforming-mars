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
                    b.br;
                    b.milestone().colon().text('=').megacredits(0, { digit: Options_1.digit });
                    b.br;
                    b.milestone({ all: Options_1.all }).colon().megacredits(3);
                    b.br.br;
                }),
                description: 'You may claim milestones for free (you must still meet the requirements). When any milestone is claimed, gain 3 M€.',
            },
        });
    }
    canAct() {
        return false;
    }
}
exports.VanAllen = VanAllen;
