"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceMirrors = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SpaceMirrors extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SPACE_MIRRORS,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SPACE],
            cost: 3,
            action: {
                spend: { megacredits: 7 },
                production: { energy: 1 },
            },
            metadata: {
                cardNumber: '076',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 7 M€ to increase your energy production 1 step.', (eb) => {
                        eb.megacredits(7).startAction.production((pb) => pb.energy(1));
                    });
                }),
            },
        });
    }
}
exports.SpaceMirrors = SpaceMirrors;
