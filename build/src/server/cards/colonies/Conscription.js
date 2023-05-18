"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conscription = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class Conscription extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            cost: 5,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.CONSCRIPTION,
            victoryPoints: -1,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.EARTH, 2)),
            metadata: {
                cardNumber: 'C05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('next card', Size_1.Size.SMALL, true).colon().megacredits(-16);
                }),
                description: 'Requires 2 Earth tags. The next card you play this generation costs 16 M€ less.',
            },
        });
    }
    getCardDiscount(player) {
        if (player.lastCardPlayed === this.name) {
            return 16;
        }
        return 0;
    }
}
exports.Conscription = Conscription;
//# sourceMappingURL=Conscription.js.map