"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceElevator = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SpaceElevator extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SPACE_ELEVATOR,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.BUILDING],
            cost: 27,
            behavior: {
                production: { titanium: 1 },
            },
            action: {
                spend: { steel: 1 },
                stock: { megacredits: 5 },
            },
            victoryPoints: 2,
            metadata: {
                cardNumber: '203',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 steel to gain 5 M€.', (eb) => {
                        eb.steel(1).startAction.megacredits(5);
                    }).br;
                    b.production((pb) => pb.titanium(1));
                }),
                description: 'Increase your titanium production 1 step.',
            },
        });
    }
}
exports.SpaceElevator = SpaceElevator;
