"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SisterPlanetSupport = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
class SisterPlanetSupport extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SISTER_PLANET_SUPPORT,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.EARTH],
            cost: 7,
            behavior: {
                production: { megacredits: 3 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.VENUS).tag(Tag_1.Tag.EARTH)),
            metadata: {
                cardNumber: '244',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(3));
                }),
                description: 'Requires Venus and Earth tags. Increase your M€ production 3 steps.',
            },
        });
    }
}
exports.SisterPlanetSupport = SisterPlanetSupport;
//# sourceMappingURL=SisterPlanetSupport.js.map