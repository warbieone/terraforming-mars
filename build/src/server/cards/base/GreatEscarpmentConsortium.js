"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreatEscarpmentConsortium = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const DecreaseAnyProduction_1 = require("../../deferredActions/DecreaseAnyProduction");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const GainProduction_1 = require("../../deferredActions/GainProduction");
class GreatEscarpmentConsortium extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM,
            cost: 6,
            requirements: { production: Resource_1.Resource.STEEL, count: 1 },
            metadata: {
                cardNumber: '061',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().steel(-1, { all: Options_1.all }).br;
                        pb.plus().steel(1);
                    });
                }),
                description: 'Requires that you have steel production. Decrease any steel production 1 step and increase your own 1 step.',
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new DecreaseAnyProduction_1.DecreaseAnyProduction(player, Resource_1.Resource.STEEL, { count: 1, stealing: true }));
        player.game.defer(new GainProduction_1.GainProduction(player, Resource_1.Resource.STEEL, { count: 1, log: true }));
        return undefined;
    }
}
exports.GreatEscarpmentConsortium = GreatEscarpmentConsortium;
