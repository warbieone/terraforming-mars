"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinatedRaid = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const SelectColony_1 = require("../../inputs/SelectColony");
class CoordinatedRaid extends Card_1.Card {
    constructor() {
        super({
            cost: 5,
            name: CardName_1.CardName.COORDINATED_RAID,
            type: CardType_1.CardType.EVENT,
            requirements: { colonies: 1 },
            metadata: {
                cardNumber: 'Pf64',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.trade().asterix()),
                description: 'Requires at least 1 colony in play. Send one of your unused Trade Fleets to any colony tile. ' +
                    'Collect the trade bonus and colony bonus for every colony on this tile. Other players do not get their colony bonuses from this action.',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.colonies.getFleetSize() > player.colonies.tradesThisGeneration;
    }
    bespokePlay(player) {
        const activeColonies = player.game.colonies.filter((colony) => colony.isActive);
        return new SelectColony_1.SelectColony('Select colony tile for trade', 'trade', activeColonies)
            .andThen((colony) => {
            colony.trade(player, { selfishTrade: true });
            return undefined;
        });
    }
}
exports.CoordinatedRaid = CoordinatedRaid;
//# sourceMappingURL=CoordinatedRaid.js.map