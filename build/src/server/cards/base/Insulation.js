"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insulation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Insulation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.INSULATION,
            cost: 2,
            metadata: {
                cardNumber: '152',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.text('-X').heat(1).nbsp.text('+').megacredits(1, { text: 'x' });
                    });
                }),
                description: 'Decrease your heat production any number of steps and increase your M€ production the same number of steps.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.production.heat >= 1;
    }
    bespokePlay(player) {
        return new SelectAmount_1.SelectAmount('Select amount of heat production to decrease', 'Decrease', 1, player.production.heat)
            .andThen((amount) => {
            player.production.add(Resource_1.Resource.HEAT, -amount, { log: true });
            player.production.add(Resource_1.Resource.MEGACREDITS, amount, { log: true });
            return undefined;
        });
    }
}
exports.Insulation = Insulation;
