"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalCleanup = void 0;
const ActionCard_1 = require("../ActionCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
class OrbitalCleanup extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ORBITAL_CLEANUP,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 14,
            victoryPoints: 2,
            behavior: {
                production: { megacredits: -2 },
            },
            action: {
                stock: { megacredits: { tag: Tag_1.Tag.SCIENCE, per: 2 } },
            },
            metadata: {
                cardNumber: 'X08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Gain 1 M€ per 2 science tags you have.', (eb) => {
                        eb.empty().startAction.megacredits(1).slash().tag(Tag_1.Tag.SCIENCE, 2);
                    }).br;
                    b.production((pb) => {
                        pb.megacredits(-2);
                    });
                }),
                description: 'Decrease your M€ production 2 steps.',
            },
        });
    }
}
exports.OrbitalCleanup = OrbitalCleanup;
