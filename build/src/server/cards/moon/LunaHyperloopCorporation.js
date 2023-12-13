"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaHyperloopCorporation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Options_1 = require("../Options");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
class LunaHyperloopCorporation extends CorporationCard_1.ActiveCorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_HYPERLOOP_CORPORATION,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            startingMegaCredits: 38,
            behavior: {
                stock: { steel: 4 },
            },
            action: {
                stock: { megacredits: { moon: { road: {} }, all: Options_1.all } },
            },
            victoryPoints: { moon: { road: {} }, all: Options_1.all },
            metadata: {
                description: 'You start with 38 M€ and 4 steel.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(38).steel(4).br;
                    b.action('Gain 1 M€ for each road tile on The Moon.', (eb) => {
                        eb.empty().startAction.megacredits(1).slash().moonRoad({ all: Options_1.all });
                    }).br,
                        b.vpText('1 VP for each road tile on The Moon.').br;
                }),
            },
        });
    }
}
exports.LunaHyperloopCorporation = LunaHyperloopCorporation;
//# sourceMappingURL=LunaHyperloopCorporation.js.map