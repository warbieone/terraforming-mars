"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoMiningIndustries = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class IoMiningIndustries extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.IO_MINING_INDUSTRIES,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 41,
            victoryPoints: { tag: Tag_1.Tag.JOVIAN },
            behavior: {
                production: { titanium: 2, megacredits: 2 },
            },
            metadata: {
                cardNumber: '092',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(2).megacredits(2)).br;
                    b.vpText('1 VP per Jovian tag you have.');
                }),
                description: 'Increase your titanium production 2 steps and your M€ production 2 steps.',
            },
        });
    }
}
exports.IoMiningIndustries = IoMiningIndustries;
