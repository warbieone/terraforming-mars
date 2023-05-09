"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MooncrateConvoysToMars = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../CardRequirements");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const SellSteel_1 = require("../../moon/SellSteel");
const Options_1 = require("../Options");
class MooncrateConvoysToMars extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MOONCRATE_CONVOYS_TO_MARS,
            type: CardType_1.CardType.EVENT,
            cost: 13,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.MARS)),
            behavior: {
                moon: { logisticsRate: 1 },
            },
            metadata: {
                description: 'Requires that Mars First are ruling or that you have 2 delegates there. ' +
                    'Raise the logistic rate 1 step. All players may sell their steel resources for 3M€ each.',
                cardNumber: 'M60',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.moonLogisticsRate().br;
                    b.text('X').steel(1, { all: Options_1.all }).colon().text('X').megacredits(3);
                }),
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        game.getPlayers().forEach((player) => {
            game.defer(new SellSteel_1.SellSteel(player));
        });
        return undefined;
    }
}
exports.MooncrateConvoysToMars = MooncrateConvoysToMars;
