"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VestaShipyard = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class VestaShipyard extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.VESTA_SHIPYARD,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 15,
            victoryPoints: 1,
            behavior: {
                production: { titanium: 1 },
            },
            metadata: {
                cardNumber: '057',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1));
                }),
                description: 'Increase your titanium production 1 step.',
            },
        });
    }
}
exports.VestaShipyard = VestaShipyard;
