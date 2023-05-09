"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floyd = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const PlayProjectCard_1 = require("../../deferredActions/PlayProjectCard");
const Options_1 = require("../Options");
class Floyd extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.FLOYD,
            metadata: {
                cardNumber: 'L06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br.br;
                    b.text('PLAY').cards(1).colon().megacredits(-13).megacredits(-2, { multiplier: Options_1.multiplier }).asterix();
                    b.br.br;
                }),
                description: 'Once per game, play a card from hand for 13 + 2X M€ less, where X is the current generation number.',
            },
        });
        this.opgActionIsActive = false;
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.cardsInHand.length > 0;
    }
    action(player) {
        this.isDisabled = true;
        this.opgActionIsActive = true;
        player.game.defer(new PlayProjectCard_1.PlayProjectCard(player, () => {
            this.opgActionIsActive = false;
            return undefined;
        }));
        return undefined;
    }
    getCardDiscount(player) {
        if (this.opgActionIsActive === true) {
            return 13 + (2 * player.game.generation);
        }
        return 0;
    }
}
exports.Floyd = Floyd;
