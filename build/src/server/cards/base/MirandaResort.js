"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MirandaResort = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MirandaResort extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MIRANDA_RESORT,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 12,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.EARTH } },
            },
            metadata: {
                cardNumber: '051',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash().earth(1, { played: Options_1.played });
                    });
                }),
                description: 'Increase your M€ production 1 step for each Earth tag you have.',
            },
        });
    }
}
exports.MirandaResort = MirandaResort;
