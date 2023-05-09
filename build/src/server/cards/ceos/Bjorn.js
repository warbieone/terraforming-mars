"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bjorn = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class Bjorn extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.BJORN,
            metadata: {
                cardNumber: 'L02',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('STEAL').megacredits(0, { multiplier: Options_1.multiplier }).asterix();
                    b.br;
                }),
                description: 'Once per game, steal X M€ from each player that has more M€ than you, where X is the current generation number.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const targetPlayers = game.getPlayers().filter((p) => p.id !== player.id && p.megaCredits > player.megaCredits);
        targetPlayers.forEach((target) => {
            target.stealResource(Resource_1.Resource.MEGACREDITS, game.generation, player);
        });
        return undefined;
    }
}
exports.Bjorn = Bjorn;
