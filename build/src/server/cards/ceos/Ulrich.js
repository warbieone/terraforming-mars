"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ulrich = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Resource_1 = require("../../../common/Resource");
const constants_1 = require("../../../common/constants");
const Options_1 = require("../Options");
class Ulrich extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.ULRICH,
            metadata: {
                cardNumber: 'L21',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().oceans(1).colon().megacredits(4, { multiplier: Options_1.multiplier }).slash().megacredits(15).asterix();
                }),
                description: 'Once per game, gain 4 M€ for each ocean placed. If all oceans are aleady placed, gain only 15 M€.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const oceansPlaced = game.board.getOceanCount();
        const bonusCredits = oceansPlaced < constants_1.MAX_OCEAN_TILES ? (oceansPlaced * 4) : 15;
        player.addResource(Resource_1.Resource.MEGACREDITS, bonusCredits, { log: true });
        return undefined;
    }
}
exports.Ulrich = Ulrich;
