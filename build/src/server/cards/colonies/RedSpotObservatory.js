"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedSpotObservatory = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
class RedSpotObservatory extends Card_1.Card {
    constructor() {
        super({
            cost: 17,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.RED_SPOT_OBSERVATORY,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: 2,
            behavior: {
                drawCard: 2,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            metadata: {
                cardNumber: 'C32',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to this card, or spend 1 floater here to draw a card.', (eb) => {
                        eb.empty().arrow().floaters(1).or();
                        eb.floaters(1).startAction.cards(1);
                    }).br;
                    b.cards(2);
                }),
                description: {
                    text: 'Requires 3 science tags. Draw 2 cards.',
                    align: 'left',
                },
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        if (this.resourceCount < 1) {
            player.addResourceTo(this, 1);
            return undefined;
        }
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Add 1 floater on this card', 'Add floater', () => this.addResource(player));
        const spendResource = new SelectOption_1.SelectOption('Remove 1 floater on this card to draw a card', 'Remove floater', () => this.spendResource(player));
        opts.push(spendResource);
        opts.push(addResource);
        return new OrOptions_1.OrOptions(...opts);
    }
    addResource(player) {
        player.addResourceTo(this, 1);
        return undefined;
    }
    spendResource(player) {
        this.resourceCount--;
        player.drawCard();
        return undefined;
    }
}
exports.RedSpotObservatory = RedSpotObservatory;
//# sourceMappingURL=RedSpotObservatory.js.map