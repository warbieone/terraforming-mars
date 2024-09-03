"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraformingGanymede = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class TerraformingGanymede extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TERRAFORMING_GANYMEDE,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            cost: 33,
            victoryPoints: 2,
            metadata: {
                cardNumber: '197',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1).slash().tag(Tag_1.Tag.JOVIAN);
                }),
                description: 'Raise your TR 1 step for each Jovian tag you have, including this.',
            },
        });
    }
    computeTr(player) {
        return { tr: 1 + player.tags.count(Tag_1.Tag.JOVIAN) };
    }
    bespokePlay(player) {
        const steps = 1 + player.tags.count(Tag_1.Tag.JOVIAN);
        player.increaseTerraformRating(steps, { log: true });
        return undefined;
    }
}
exports.TerraformingGanymede = TerraformingGanymede;
