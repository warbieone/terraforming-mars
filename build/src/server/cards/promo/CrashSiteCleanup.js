"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashSiteCleanup = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
class CrashSiteCleanup extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.CRASH_SITE_CLEANUP,
            cost: 4,
            requirements: { plantsRemoved: true },
            victoryPoints: 1,
            metadata: {
                description: 'Requires that a player removed ANOTHER PLAYER\'s plants this generation. Gain 1 titanium or 2 steel.',
                cardNumber: 'X17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.titanium(1).nbsp.or().nbsp.steel(2);
                }),
            },
        });
    }
    bespokePlay(player) {
        const gainTitanium = new SelectOption_1.SelectOption('Gain 1 titanium', 'Gain titanium')
            .andThen(() => {
            player.stock.add(Resource_1.Resource.TITANIUM, 1, { log: true });
            return undefined;
        });
        const gain2Steel = new SelectOption_1.SelectOption('Gain 2 steel', 'Gain steel')
            .andThen(() => {
            player.stock.add(Resource_1.Resource.STEEL, 2, { log: true });
            return undefined;
        });
        return new OrOptions_1.OrOptions(gainTitanium, gain2Steel);
    }
    static resourceHook(player, resource, amount, from) {
        if (from === player || amount >= 0) {
            return;
        }
        if (resource === Resource_1.Resource.PLANTS && amount < 0) {
            player.game.someoneHasRemovedOtherPlayersPlants = true;
        }
    }
}
exports.CrashSiteCleanup = CrashSiteCleanup;
