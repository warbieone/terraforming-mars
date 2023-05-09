"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreliminaryDarkside = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class PreliminaryDarkside extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.PRELIMINARY_DARKSIDE,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON],
            cost: 13,
            behavior: {
                moon: { miningRate: 1 },
            },
            metadata: {
                description: 'Gain 3 titanium or 4 steel. Raise the mining rate 1 step.',
                cardNumber: 'M63',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(3, { digit: Options_1.digit }).or().steel(4, { digit: Options_1.digit }).br;
                    b.moonMiningRate();
                }),
            },
        });
    }
    bespokePlay(player) {
        return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Gain 3 titanium', 'Gain titanium', () => {
            player.addResource(Resource_1.Resource.TITANIUM, 3, { log: true });
            return undefined;
        }), new SelectOption_1.SelectOption('Gain 4 steel', 'Gain steel', () => {
            player.addResource(Resource_1.Resource.STEEL, 4, { log: true });
            return undefined;
        }));
    }
}
exports.PreliminaryDarkside = PreliminaryDarkside;
