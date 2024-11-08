"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oscar = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Turmoil_1 = require("../../turmoil/Turmoil");
class Oscar extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.OSCAR,
            metadata: {
                cardNumber: 'L15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('You have +1 influence', (eb) => eb.startEffect.influence());
                    b.br.br;
                    b.opgArrow().chairman();
                }),
                description: 'Once per game, replace the Chairman with one of your delegates.',
            },
        });
    }
    play(player) {
        const turmoil = player.game.turmoil;
        if (turmoil)
            turmoil.addInfluenceBonus(player);
        return undefined;
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        return turmoil.hasDelegatesInReserve(player) && turmoil.chairman !== player;
    }
    action(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        turmoil.setNewChairman(player, player.game, false, false);
        turmoil.delegateReserve.remove(player);
        player.totalDelegatesPlaced += 1;
        this.isDisabled = true;
        return undefined;
    }
}
exports.Oscar = Oscar;
