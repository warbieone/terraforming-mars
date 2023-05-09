"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hackers = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const DecreaseAnyProduction_1 = require("../../deferredActions/DecreaseAnyProduction");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Hackers extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HACKERS,
            cost: 3,
            victoryPoints: -1,
            behavior: {
                production: { energy: -1, megacredits: 2 },
            },
            metadata: {
                cardNumber: '125',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).megacredits(2, { all: Options_1.all }).br;
                        pb.plus().megacredits(2);
                    });
                }),
                description: 'Decrease your energy production 1 step and any M€ production 2 steps. increase your M€ production 2 steps.',
            },
        });
    }
    bespokePlay(player) {
        player.game.defer(new DecreaseAnyProduction_1.DecreaseAnyProduction(player, Resource_1.Resource.MEGACREDITS, { count: 2, stealing: true }));
        return undefined;
    }
}
exports.Hackers = Hackers;
