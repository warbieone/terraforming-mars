"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RustEatingBacteria = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class RustEatingBacteria extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.RUST_EATING_BACTERIA,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MICROBE],
            cost: 7,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 3 },
            action: {
                spend: { steel: 1 },
                addResources: 2,
            },
            metadata: {
                cardNumber: 'M88',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 steel to add 2 microbes here.', (eb) => {
                        eb.startAction.steel(1).arrow().microbes(2);
                    }).br;
                    b.vpText('1 VP per 3 microbes here.');
                }),
            },
        });
    }
}
exports.RustEatingBacteria = RustEatingBacteria;
