"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallistoPenalMines = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class CallistoPenalMines extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CALLISTO_PENAL_MINES,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 24,
            victoryPoints: 2,
            behavior: {
                production: { megacredits: 3 },
            },
            metadata: {
                description: 'Increase your M€ production 3 steps.',
                cardNumber: '082',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => {
                    pb.megacredits(3);
                })),
            },
        });
    }
}
exports.CallistoPenalMines = CallistoPenalMines;
