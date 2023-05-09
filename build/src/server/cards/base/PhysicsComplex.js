"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsComplex = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class PhysicsComplex extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PHYSICS_COMPLEX,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 12,
            resourceType: CardResource_1.CardResource.SCIENCE,
            victoryPoints: { resourcesHere: {}, each: 2 },
            action: {
                spend: { energy: 6 },
                addResources: 1,
            },
            metadata: {
                cardNumber: '095',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 6 energy to add a science resource to this card.', (eb) => {
                        eb.energy(6, { digit: Options_1.digit }).startAction.science();
                    }).br;
                    b.vpText('2 VP for each science resource on this card.');
                }),
            },
        });
    }
}
exports.PhysicsComplex = PhysicsComplex;
