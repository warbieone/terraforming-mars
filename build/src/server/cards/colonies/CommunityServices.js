"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityServices = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class CommunityServices extends Card_1.Card {
    constructor() {
        super({
            cost: 13,
            name: CardName_1.CardName.COMMUNITY_SERVICES,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'C04',
                description: 'Increase your M€ production 1 step per CARD WITH NO TAGS, including this.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1);
                    }).slash().noTags();
                }),
            },
        });
    }
    bespokePlay(player) {
        player.production.add(Resource_1.Resource.MEGACREDITS, player.getNoTagsCount() + 1, { log: true });
        return undefined;
    }
}
exports.CommunityServices = CommunityServices;
