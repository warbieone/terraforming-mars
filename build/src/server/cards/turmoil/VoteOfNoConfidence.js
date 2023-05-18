"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteOfNoConfidence = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Turmoil_1 = require("../../turmoil/Turmoil");
const Options_1 = require("../Options");
class VoteOfNoConfidence extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.VOTE_OF_NO_CONFIDENCE,
            type: CardType_1.CardType.EVENT,
            cost: 5,
            tr: { tr: 1 },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.partyLeaders()),
            metadata: {
                cardNumber: 'T16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().chairman({ all: Options_1.all }).asterix();
                    b.nbsp.plus().partyLeaders().br;
                    b.tr(1);
                }),
                description: 'Requires that you have a Party Leader in any party and that the sitting Chairman is neutral. ' +
                    'Remove the NEUTRAL Chairman and move your own delegate (from the reserve) there instead. Gain 1 TR.',
            },
        });
    }
    bespokeCanPlay(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        if (!turmoil.hasDelegatesInReserve(player.id))
            return false;
        return turmoil.chairman === 'NEUTRAL';
    }
    bespokePlay(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        turmoil.delegateReserve.remove(player.id);
        turmoil.setNewChairman(player.id, player.game, false);
        return undefined;
    }
}
exports.VoteOfNoConfidence = VoteOfNoConfidence;
//# sourceMappingURL=VoteOfNoConfidence.js.map