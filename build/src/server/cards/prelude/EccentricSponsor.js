"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EccentricSponsor = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const PreludeCard_1 = require("./PreludeCard");
const PlayProjectCard_1 = require("../../deferredActions/PlayProjectCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class EccentricSponsor extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.ECCENTRIC_SPONSOR,
            metadata: {
                cardNumber: 'P11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Play a card from hand, reducing its cost by 25 M€', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    getCardDiscount(player) {
        if (player.lastCardPlayed === this.name) {
            return 25;
        }
        return 0;
    }
    bespokePlay(player) {
        player.game.defer(new PlayProjectCard_1.PlayProjectCard(player));
        return undefined;
    }
}
exports.EccentricSponsor = EccentricSponsor;
