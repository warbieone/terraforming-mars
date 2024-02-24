"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalileanWaystation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class GalileanWaystation extends Card_1.Card {
    constructor() {
        super({
            cost: 15,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.GALILEAN_WAYSTATION,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.JOVIAN, all: true } },
            },
            metadata: {
                description: 'Increase your M€ production 1 step for every Jovian tag in play.',
                cardNumber: 'C13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1).slash().jovian({ played: Options_1.played, all: Options_1.all }));
                }),
            },
        });
    }
}
exports.GalileanWaystation = GalileanWaystation;
