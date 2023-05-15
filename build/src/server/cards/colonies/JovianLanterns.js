"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovianLanterns = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class JovianLanterns extends Card_1.Card {
    constructor() {
        super({
            cost: 20,
            tags: [Tag_1.Tag.JOVIAN],
            name: CardName_1.CardName.JOVIAN_LANTERNS,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.JOVIAN)),
            behavior: {
                tr: 1,
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 2 },
            },
            metadata: {
                cardNumber: 'C18',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 titanium to add 2 floaters here.', (eb) => {
                        eb.titanium(1).startAction.floaters(2);
                    }).br;
                    b.tr(1).floaters(2).asterix().br;
                    b.vpText('1 VP per 2 floaters here.');
                }),
                description: {
                    text: 'Requires 1 Jovian tag. Increase your TR 1 step. Add 2 floaters to ANY card.',
                    align: 'left',
                },
            },
        });
    }
    canAct(player) {
        return player.titanium > 0;
    }
    action(player) {
        player.titanium--;
        player.addResourceTo(this, 2);
        return undefined;
    }
}
exports.JovianLanterns = JovianLanterns;
//# sourceMappingURL=JovianLanterns.js.map