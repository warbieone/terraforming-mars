"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketManipulation = void 0;
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderer_1 = require("../render/CardRenderer");
const SelectColony_1 = require("../..//inputs/SelectColony");
const LogHelper_1 = require("../../LogHelper");
class MarketManipulation extends Card_1.Card {
    constructor() {
        super({
            cost: 1,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.MARKET_MANIPULATION,
            type: CardType_1.CardType.EVENT,
            metadata: {
                cardNumber: 'C23',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Increase one colony tile track 1 step. Decrease another colony tile track 1 step.', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        const increasableColonies = this.getIncreasableColonies(player.game);
        const decreasableColonies = this.getDecreasableColonies(player.game);
        if (increasableColonies.length === 0)
            return false;
        if (decreasableColonies.length === 0)
            return false;
        if (increasableColonies.length === 1 &&
            decreasableColonies.length === 1 &&
            increasableColonies[0] === decreasableColonies[0]) {
            return false;
        }
        return true;
    }
    getIncreasableColonies(game) {
        return game.colonies.filter((colony) => colony.trackPosition < 6 && colony.isActive);
    }
    getDecreasableColonies(game) {
        return game.colonies.filter((colony) => colony.trackPosition > colony.colonies.length && colony.isActive);
    }
    bespokePlay(player) {
        let increasableColonies = this.getIncreasableColonies(player.game);
        const decreasableColonies = this.getDecreasableColonies(player.game);
        if (decreasableColonies.length === 1 && increasableColonies.some((colony) => colony.name === decreasableColonies[0].name)) {
            increasableColonies = increasableColonies.filter((colony) => colony.name !== decreasableColonies[0].name);
        }
        const increaseColonyTrack = new SelectColony_1.SelectColony('Select which colony tile track to increase', 'Increase', increasableColonies, (increasedColony) => {
            increasedColony.increaseTrack();
            LogHelper_1.LogHelper.logColonyTrackIncrease(player, increasedColony, 1);
            const decreaseColonyTrack = new SelectColony_1.SelectColony('Select which colony tile track to decrease', 'Decrease', decreasableColonies.filter((decreaseableColony) => decreaseableColony.name !== increasedColony.name), (decreasedColony) => {
                decreasedColony.decreaseTrack();
                LogHelper_1.LogHelper.logColonyTrackDecrease(player, decreasedColony);
                return undefined;
            });
            player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => decreaseColonyTrack));
            return undefined;
        });
        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => increaseColonyTrack));
        return undefined;
    }
}
exports.MarketManipulation = MarketManipulation;
