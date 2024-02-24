"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airliners = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class Airliners extends Card_1.Card {
    constructor() {
        super({
            cost: 11,
            name: CardName_1.CardName.AIRLINERS,
            type: CardType_1.CardType.AUTOMATED,
            requirements: { floaters: 3 },
            victoryPoints: 1,
            behavior: {
                production: { megacredits: 2 },
                addResourcesToAnyCard: { count: 2, type: CardResource_1.CardResource.FLOATER },
            },
            metadata: {
                cardNumber: 'C01',
                description: 'Requires that you have 3 floaters. Increase your M€ production 2 steps. Add 2 floaters to ANY card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2)).br;
                    b.floaters(2).asterix();
                }),
            },
        });
    }
}
exports.Airliners = Airliners;
