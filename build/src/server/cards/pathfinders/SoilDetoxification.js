"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoilDetoxification = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const PartyName_1 = require("../../../common/turmoil/PartyName");
class SoilDetoxification extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SOIL_DETOXIFICATION,
            cost: 10,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.SCIENCE],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.GREENS)),
            behavior: {
                production: { plants: 1 },
                greeneryDiscount: 1,
            },
            metadata: {
                cardNumber: 'PfTmp',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Using the STANDARD GREENERY ACTION costs 1 plant less.', (eb) => eb.greenery().asterix().startEffect.minus().plants(1)).br;
                    b.production((pb) => pb.plants(1));
                }),
                description: 'Requires that Greens are ruling or you have 2 delegates there. Increase your plant production 1 step',
            },
        });
    }
}
exports.SoilDetoxification = SoilDetoxification;
