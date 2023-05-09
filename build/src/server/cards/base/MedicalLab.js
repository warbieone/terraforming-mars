"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalLab = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MedicalLab extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MEDICAL_LAB,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 13,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.BUILDING, per: 2 } },
            },
            metadata: {
                cardNumber: '207',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash().building(2, { played: Options_1.played });
                    });
                }),
                description: 'Increase your M€ production 1 step for every 2 building tags you have, including this.',
            },
        });
    }
}
exports.MedicalLab = MedicalLab;
