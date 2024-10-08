"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaturnSurfing = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
class SaturnSurfing extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SATURN_SURFING,
            cost: 13,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.EARTH],
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: 1,
            behavior: {
                addResources: { tag: Tag_1.Tag.EARTH },
            },
            metadata: {
                cardNumber: 'X11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 floater from here to gain 1 M€ from each floater here, INCLUDING THE PAID FLOATER. Max 5.', (eb) => {
                        eb.resource(CardResource_1.CardResource.FLOATER).startAction.megacredits(1).slash().resource(CardResource_1.CardResource.FLOATER);
                        eb.asterix().text('max 5');
                    }).br;
                    b.resource(CardResource_1.CardResource.FLOATER).slash().tag(Tag_1.Tag.EARTH);
                }),
                description: 'Add 1 floater here for every Earth tag you have, including this.',
            },
        });
    }
    canAct() {
        return this.resourceCount > 0;
    }
    action(player) {
        player.stock.add(Resource_1.Resource.MEGACREDITS, Math.min(5, this.resourceCount--));
        return undefined;
    }
}
exports.SaturnSurfing = SaturnSurfing;
