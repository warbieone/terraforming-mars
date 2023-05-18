"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeGrowAsOne = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class WeGrowAsOne extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.WE_GROW_AS_ONE,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE],
            cost: 8,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.UNITY)),
            metadata: {
                description: 'Requires that Unity are ruling or that you have 2 delegates there. ' +
                    'Increase ALL colony tile tracks 1 step. ' +
                    'Increase each colony tile track 1 step if you have a colony on that colony tile.',
                cardNumber: 'M59',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.placeColony({ all: Options_1.all }).text('+1').br;
                    b.colonies(1).asterix().slash().placeColony().text('+1');
                }),
            },
        });
    }
    bespokePlay(player) {
        player.game.colonies.forEach((colony) => {
            if (colony.colonies.includes(player.id)) {
                colony.increaseTrack(2);
            }
            else {
                colony.increaseTrack(1);
            }
        });
        return undefined;
    }
}
exports.WeGrowAsOne = WeGrowAsOne;
//# sourceMappingURL=WeGrowAsOne.js.map