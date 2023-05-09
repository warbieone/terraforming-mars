"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xavier = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Options_1 = require("../Options");
class Xavier extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.XAVIER,
            metadata: {
                cardNumber: 'L24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br.br;
                    b.text('GAIN').nbsp.wild(2, { played: Options_1.played });
                    b.br.br;
                }),
                description: 'Gain 2 wild tags for THIS GENERATION.',
            },
        });
        this.opgActionIsActive = false;
    }
    action() {
        this.isDisabled = true;
        this.opgActionIsActive = true;
        return undefined;
    }
}
exports.Xavier = Xavier;
