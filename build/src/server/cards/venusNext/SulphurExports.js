"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SulphurExports = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SulphurExports extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SULPHUR_EXPORTS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.SPACE],
            cost: 21,
            behavior: {
                global: { venus: 1 },
                production: { megacredits: { tag: Tag_1.Tag.VENUS } },
            },
            metadata: {
                cardNumber: '250',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).br;
                    b.production((pb) => pb.megacredits(1).slash().venus(1, { played: Options_1.played }));
                }),
                description: 'Increase Venus 1 step. Increase your M€ production 1 step for each Venus tag you have, including this.',
            },
        });
    }
}
exports.SulphurExports = SulphurExports;
