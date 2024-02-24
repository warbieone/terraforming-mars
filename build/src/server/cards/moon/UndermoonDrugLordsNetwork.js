"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndermoonDrugLordsNetwork = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class UndermoonDrugLordsNetwork extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.UNDERMOON_DRUG_LORDS_NETWORK,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 2,
            victoryPoints: -1,
            behavior: {
                production: { megacredits: { moon: { habitatRate: {} }, per: 2 } },
            },
            metadata: {
                description: 'Increase your M€ production 1 step per 2 steps of habitat rate.',
                cardNumber: 'M81',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1);
                    }).slash().moonHabitatRate({ amount: 2 });
                }),
            },
        });
    }
}
exports.UndermoonDrugLordsNetwork = UndermoonDrugLordsNetwork;
