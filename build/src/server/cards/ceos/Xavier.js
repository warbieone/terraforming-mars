"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xavier = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Options_1 = require("../Options");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const Tag_1 = require("../../../common/cards/Tag");
class Xavier extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.XAVIER,
            metadata: {
                cardNumber: 'L24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('GAIN').wild(2, { played: Options_1.played }).asterix();
                    b.br;
                    b.plainText('Once per game, gain 2 wild tags for THIS GENERATION.');
                    b.br.br;
                    b.effect('AFTER this action has been used, when playing a card with a requirement, you pay 1 M€ less for it.', (eb) => eb.asterix().startEffect.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.REQ }).colon().megacredits(-1));
                }),
            },
        });
        this.opgActionIsActive = false;
    }
    get tags() {
        return this.opgActionIsActive ? [Tag_1.Tag.WILD, Tag_1.Tag.WILD] : [];
    }
    action() {
        this.isDisabled = true;
        this.opgActionIsActive = true;
        return undefined;
    }
    getCardDiscount(_player, card) {
        if (this.isDisabled && card.requirements.length > 0)
            return 1;
        return 0;
    }
}
exports.Xavier = Xavier;
