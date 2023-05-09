"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefugeeCamps = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class RefugeeCamps extends ActionCard_1.ActionCard {
    constructor() {
        super({
            cost: 10,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.REFUGEE_CAMPS,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.CAMP,
            victoryPoints: { resourcesHere: {} },
            action: {
                production: { megacredits: -1 },
                addResources: 1,
            },
            metadata: {
                cardNumber: 'C33',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Decrease your M€ production 1 step to add a camp resource to this card.', (eb) => {
                        eb.production((pb) => pb.megacredits(1));
                        eb.startAction.camps();
                    }).br;
                    b.vpText('1 VP for each camp resource on this card.');
                }),
            },
        });
    }
}
exports.RefugeeCamps = RefugeeCamps;
