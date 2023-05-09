"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greta = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Resource_1 = require("../../../common/Resource");
const Phase_1 = require("../../../common/Phase");
class Greta extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.GRETA,
            metadata: {
                cardNumber: 'L31',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br.br;
                    b.tr(1).colon().megacredits(4).asterix();
                    b.br;
                }),
                description: 'When you take an action or play a card that increases your TR THIS GENERATION (max 10 times), gain 4 M€.',
            },
        });
        this.opgActionIsActive = false;
        this.effectTriggerCount = 0;
    }
    action() {
        this.opgActionIsActive = true;
        this.isDisabled = true;
        return undefined;
    }
    onIncreaseTerraformRating(player, cardOwner) {
        const game = player.game;
        if (this.opgActionIsActive === true && this.effectTriggerCount < 10) {
            if (player === cardOwner && game.phase === Phase_1.Phase.ACTION) {
                player.addResource(Resource_1.Resource.MEGACREDITS, 4, { log: true });
                this.effectTriggerCount++;
            }
        }
        return undefined;
    }
}
exports.Greta = Greta;
