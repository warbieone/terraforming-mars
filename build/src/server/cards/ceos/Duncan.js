"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duncan = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Resource_1 = require("../../../common/Resource");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
class Duncan extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.DUNCAN,
            victoryPoints: 'special',
            metadata: {
                cardNumber: 'L04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().vpIcon().asterix().megacredits(1, { text: '4x' });
                    b.br;
                }),
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.questionmark(),
                description: 'Once per game, gain 7-X VP and 4X M€, where X is the current generation number.',
            },
        });
        this.generationUsed = -1;
    }
    action(player) {
        this.isDisabled = true;
        player.stock.add(Resource_1.Resource.MEGACREDITS, 4 * player.game.generation, { log: true });
        this.generationUsed = player.game.generation;
        return undefined;
    }
    getVictoryPoints() {
        if (this.isDisabled === true && this.generationUsed !== undefined) {
            return 7 - this.generationUsed;
        }
        return 0;
    }
}
exports.Duncan = Duncan;
