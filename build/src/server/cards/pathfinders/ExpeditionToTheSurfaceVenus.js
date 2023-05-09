"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpeditionToTheSurfaceVenus = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class ExpeditionToTheSurfaceVenus extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.EXPEDITION_TO_THE_SURFACE_VENUS,
            cost: 16,
            tags: [Tag_1.Tag.VENUS],
            behavior: {
                drawCard: 2,
                global: { venus: 1 },
                stock: { megacredits: { tag: Tag_1.Tag.VENUS } },
            },
            metadata: {
                cardNumber: 'Pf46',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2).venus(1).br;
                    b.megacredits(1).slash().venus(1, { played: Options_1.played });
                }),
                description: 'Draw 2 cards. Raise Venus 1 step. Gain 1M€ for each of your Venus tags, including this.',
            },
        });
    }
}
exports.ExpeditionToTheSurfaceVenus = ExpeditionToTheSurfaceVenus;
