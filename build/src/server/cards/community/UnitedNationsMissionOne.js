"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitedNationsMissionOne = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Phase_1 = require("../../../common/Phase");
const Resource_1 = require("../../../common/Resource");
class UnitedNationsMissionOne extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.UNITED_NATIONS_MISSION_ONE,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 40,
            metadata: {
                cardNumber: 'R50',
                description: 'You start with 39 M€. Increase your TR 1 step.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(39).nbsp.tr(1);
                    b.corpBox('effect', (ce) => {
                        ce.vSpace();
                        ce.effect('When any player takes an action or plays a card that increases TR, including this, gain 1 M€ for each step.', (eb) => {
                            eb.tr(1, { all: Options_1.all }).startEffect.megacredits(1);
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        player.increaseTerraformRating();
        return undefined;
    }
    onIncreaseTerraformRating(player, cardOwner, steps) {
        const game = player.game;
        if (game.phase === Phase_1.Phase.ACTION || game.phase === Phase_1.Phase.PRELUDES) {
            cardOwner.addResource(Resource_1.Resource.MEGACREDITS, steps, { log: true });
        }
    }
}
exports.UnitedNationsMissionOne = UnitedNationsMissionOne;
