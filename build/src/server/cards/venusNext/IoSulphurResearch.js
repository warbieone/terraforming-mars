"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoSulphurResearch = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class IoSulphurResearch extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.IO_SULPHUR_RESEARCH,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.JOVIAN],
            cost: 17,
            victoryPoints: 2,
            metadata: {
                cardNumber: '232',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(1).br;
                    b.or().br;
                    b.venus(3, { played: Options_1.played, digit: Options_1.digit }).colon().cards(3);
                }),
                description: 'Draw 1 card, or draw 3 if you have at least 3 Venus tags.',
            },
        });
    }
    bespokePlay(player) {
        player.drawCard(player.tags.count(Tag_1.Tag.VENUS) >= 3 ? 3 : 1);
        return undefined;
    }
}
exports.IoSulphurResearch = IoSulphurResearch;
