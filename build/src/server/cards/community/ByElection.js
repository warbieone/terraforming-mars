"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByElection = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const Turmoil_1 = require("../../turmoil/Turmoil");
const ChooseRulingPartyDeferred_1 = require("../../turmoil/ChooseRulingPartyDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
class ByElection extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.BY_ELECTION,
            tags: [Tag_1.Tag.WILD],
            metadata: {
                cardNumber: 'Y02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.rulingParty().plus().influence();
                }),
                description: 'Set the ruling party to one of your choice. Gain 1 influence.',
            },
        });
    }
    bespokePlay(player) {
        Turmoil_1.Turmoil.ifTurmoil((player.game), (turmoil) => {
            turmoil.addInfluenceBonus(player);
            player.game.defer(new ChooseRulingPartyDeferred_1.ChooseRulingPartyDeferred(player, turmoil));
        });
        return undefined;
    }
}
exports.ByElection = ByElection;
//# sourceMappingURL=ByElection.js.map