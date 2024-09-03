"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianEmbassy = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const PathfindersExpansion_1 = require("../../pathfinders/PathfindersExpansion");
class MartianEmbassy extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MARTIAN_EMBASSY,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.MARS],
            cost: 11,
            metadata: {
                cardNumber: 'M76',
                description: 'Raise the Mars Planetary Track 1 step for every 3 Moon tags you have, including this.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tag(Tag_1.Tag.MARS).planetaryTrack().text('+1').slash().tag(Tag_1.Tag.MOON, 3);
                }),
            },
        });
    }
    bespokePlay(player) {
        const tags = player.tags.count(Tag_1.Tag.MOON) + 1;
        const rate = Math.floor(tags / 3);
        PathfindersExpansion_1.PathfindersExpansion.raiseTrack(Tag_1.Tag.MARS, player, rate);
        return undefined;
    }
}
exports.MartianEmbassy = MartianEmbassy;
