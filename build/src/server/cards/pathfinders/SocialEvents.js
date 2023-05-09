"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialEvents = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class SocialEvents extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SOCIAL_EVENTS,
            cost: 18,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.MARS],
            tr: ((player) => ({ tr: this.getExpectedTr(player) })),
            metadata: {
                cardNumber: '...',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1).slash().mars(2, { played: Options_1.played });
                }),
                description: 'Gain 1 TR for every 2 Mars tags you have (including this one.)',
            },
        });
    }
    getExpectedTr(player) {
        return Math.floor((player.tags.count(Tag_1.Tag.MARS) + 1) / 2);
    }
    bespokePlay(player) {
        player.increaseTerraformRatingSteps(this.getExpectedTr(player), { log: true });
        return undefined;
    }
}
exports.SocialEvents = SocialEvents;
