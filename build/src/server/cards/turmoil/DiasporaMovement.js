"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiasporaMovement = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class DiasporaMovement extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DIASPORA_MOVEMENT,
            tags: [Tag_1.Tag.JOVIAN],
            cost: 7,
            requirements: { party: PartyName_1.PartyName.REDS },
            victoryPoints: 1,
            behavior: {
                stock: { megacredits: { tag: Tag_1.Tag.JOVIAN, all: true } },
            },
            metadata: {
                cardNumber: 'TO4',
                description: 'Requires that Reds are ruling or that you have 2 delegates there. Gain 1M€ for each Jovian tag in play, including this.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(1).slash().tag(Tag_1.Tag.JOVIAN, { all: Options_1.all });
                }),
            },
        });
    }
}
exports.DiasporaMovement = DiasporaMovement;
