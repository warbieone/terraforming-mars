"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bjorn = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Resource_1 = require("../../../common/Resource");
class Bjorn extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.BJORN,
            metadata: {
                cardNumber: 'L02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('STEAL').megacredits(1, { text: 'x+2' }).asterix();
                    b.br;
                }),
                description: 'Once per game, steal X+2 M€ from each player that has more M€ than you, where X is the current generation number.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const targets = player.getOpponents().filter((p) => p.megaCredits > player.megaCredits);
        targets.forEach((target) => {
            target.maybeBlockAttack(player, (proceed) => {
                if (proceed) {
                    target.stock.steal(Resource_1.Resource.MEGACREDITS, game.generation + 2, player);
                }
                return undefined;
            });
        });
        return undefined;
    }
}
exports.Bjorn = Bjorn;
