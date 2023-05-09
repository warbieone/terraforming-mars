"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rogers = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Tag_1 = require("../../../common/cards/Tag");
const GlobalParameter_1 = require("../../../common/GlobalParameter");
const Options_1 = require("../Options");
class Rogers extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.ROGERS,
            metadata: {
                cardNumber: 'L18',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br;
                    b.venus(1).colon().projectRequirements();
                    b.br;
                    b.venus(1, { played: Options_1.played }).colon().megacredits(-3);
                }),
                description: 'Ignore global requirements for your Venus cards THIS GENERATION. When you play a Venus tag THIS GENERATION, you pay 3 M€ less for it.',
            },
        });
        this.opgActionIsActive = false;
    }
    action() {
        this.isDisabled = true;
        this.opgActionIsActive = true;
        return undefined;
    }
    getRequirementBonus(_player, parameter) {
        if (this.opgActionIsActive === false || parameter !== GlobalParameter_1.GlobalParameter.VENUS)
            return 0;
        return 50;
    }
    getCardDiscount(_player, card) {
        if (this.opgActionIsActive === false)
            return 0;
        return card.tags.filter((tag) => tag === Tag_1.Tag.VENUS).length * 3;
    }
}
exports.Rogers = Rogers;
