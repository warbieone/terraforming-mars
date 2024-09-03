"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chimera = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Chimera extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
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
                            '(Other wild tags still do not count toward awards.)', (ce) => ce.tag(Tag_1.Tag.WILD, 2).startEffect.tag(Tag_1.Tag.WILD, 2).slash().tag(Tag_1.Tag.WILD).asterix());
                    });
                }),
            },
        });
    }
}
exports.Chimera = Chimera;
