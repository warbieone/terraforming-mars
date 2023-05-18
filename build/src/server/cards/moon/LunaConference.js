"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaConference = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class LunaConference extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_CONFERENCE,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MOON],
            cost: 5,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.SCIENTISTS)),
            behavior: {
                stock: { megacredits: { moon: { road: {}, habitat: {} }, each: 2 } },
            },
            metadata: {
                description: 'Requires that Scientists are ruling or that you have 2 delegates there. ' +
                    'Gain 2 M€ per road tile on The Moon. Gain 2M€ per habitat tile on The Moon.',
                cardNumber: 'M58',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(2).slash().moonRoad({ size: Size_1.Size.SMALL, all: Options_1.all }).br;
                    b.megacredits(2).slash().moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all }).br;
                }),
            },
        });
    }
}
exports.LunaConference = LunaConference;
//# sourceMappingURL=LunaConference.js.map