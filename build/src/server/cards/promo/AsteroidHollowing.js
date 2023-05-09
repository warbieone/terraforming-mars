"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidHollowing = void 0;
const ActionCard_1 = require("../ActionCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
class AsteroidHollowing extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ASTEROID_HOLLOWING,
            tags: [Tag_1.Tag.SPACE],
            cost: 16,
            resourceType: CardResource_1.CardResource.ASTEROID,
            action: {
                spend: { titanium: 1 },
                production: { megacredits: 1 },
                addResources: 1,
            },
            victoryPoints: { resourcesHere: {}, per: 2 },
            metadata: {
                cardNumber: 'X15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 titanium to add 1 asteroid resource here and increase M€ production 1 step.', (eb) => {
                        eb.titanium(1).startAction.asteroids(1).production((pb) => pb.megacredits(1));
                    }).br;
                    b.vpText('1VP for each 2 asteroids on this card.');
                }),
            },
        });
    }
}
exports.AsteroidHollowing = AsteroidHollowing;
