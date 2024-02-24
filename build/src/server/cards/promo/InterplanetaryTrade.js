"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterplanetaryTrade = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
class InterplanetaryTrade extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.INTERPLANETARY_TRADE,
            tags: [Tag_1.Tag.SPACE],
            cost: 27,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'X05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1));
                    b.slash().diverseTag();
                }),
                description: 'Increase your M€ production 1 step per different tag you have in play, including this.',
            },
        });
    }
    bespokePlay(player) {
        const distinctTagCount = player.tags.distinctCount('default', Tag_1.Tag.SPACE);
        player.production.add(Resource_1.Resource.MEGACREDITS, distinctTagCount, { log: true });
        return undefined;
    }
}
exports.InterplanetaryTrade = InterplanetaryTrade;
