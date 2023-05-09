"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterplanetaryTransport = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class InterplanetaryTransport extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.INTERPLANETARY_TRANSPORT,
            cost: 15,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            victoryPoints: 1,
            behavior: {
                production: { megacredits: { cities: { where: 'offmars' } } },
            },
            metadata: {
                cardNumber: 'Pf43',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().city({ all: Options_1.all, secondaryTag: Tag_1.Tag.SPACE }).asterix;
                }),
                description: 'Increase your M€ production 1 step for every offworld city tile.',
            },
        });
    }
}
exports.InterplanetaryTransport = InterplanetaryTransport;
