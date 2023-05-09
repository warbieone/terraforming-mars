"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chimera = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Chimera extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.CHIMERA,
            tags: [Tag_1.Tag.WILD, Tag_1.Tag.WILD],
            startingMegaCredits: 36,
            behavior: {
                stock: { steel: 1, titanium: 1 },
            },
            metadata: {
                cardNumber: 'PfC5',
                description: 'You start with 36 M€, 1 steel, and 1 titanium.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(36).steel(1).titanium(1);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you perform an action, these wild tags count as any tags of your choice. ' +
                            'For claiming milestones and funding awards, both symbols count as one. ' +
                            '(Other wild tags still do not count toward awards.)', (ce) => ce.wild(2, { played: Options_1.played }).startEffect.wild(2, { played: Options_1.played }).slash().wild(1, { played: Options_1.played }).asterix());
                    });
                }),
            },
        });
    }
}
exports.Chimera = Chimera;
