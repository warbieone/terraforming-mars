"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaSenate = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class LunaSenate extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_SENATE,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.MOON],
            cost: 32,
            victoryPoints: { tag: Tag_1.Tag.MOON },
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.MOON, all: true } },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.MOON, 3)),
            metadata: {
                description: 'Requires that you have 3 Moon tags. Increase your M€ production 1 step per Moon tag in the game (including these.)',
                cardNumber: 'M70',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().moon(1, { all: Options_1.all });
                    b.vpText('1 VP per Moon tag you have.');
                }),
            },
        });
    }
}
exports.LunaSenate = LunaSenate;
