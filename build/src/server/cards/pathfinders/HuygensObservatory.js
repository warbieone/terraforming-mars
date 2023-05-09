"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuygensObservatory = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const BuildColony_1 = require("../../deferredActions/BuildColony");
const OrOptions_1 = require("../../inputs/OrOptions");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectColony_1 = require("../../inputs/SelectColony");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
class HuygensObservatory extends Card_1.Card {
    constructor() {
        super({
            cost: 27,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE],
            name: CardName_1.CardName.HUYGENS_OBSERVATORY,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: 1,
            behavior: {
                tr: 1,
            },
            metadata: {
                cardNumber: 'Pf61',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.colonies(1).asterix().trade().asterix().tr(1)),
                description: 'Place a colony. MAY BE PLACED ON A COLONY TILE WHERE YOU ALREADY HAVE A COLONY. ' +
                    'Trade for free. You may use a Trade Fleet that is already on a colony tile, but you may not ' +
                    'trade with the tile that fleet came from. Gain 1 TR.',
            },
        });
    }
    trade(player, colonies) {
        return new SelectColony_1.SelectColony('Select colony tile to trade with for free', 'Select', colonies, (colony) => {
            colony.trade(player);
            return undefined;
        });
    }
    tradeableColonies(player) {
        return player.game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
    }
    tryToTrade(player) {
        const game = player.game;
        const tradeableColonies = this.tradeableColonies(player);
        if (tradeableColonies.length === 0) {
            game.log('${0} cannot trade with ${1} because there is no colony they may visit.', (b) => b.player(player).card(this));
            return;
        }
        const orOptions = new OrOptions_1.OrOptions();
        orOptions.title = 'Select a trade fleet';
        const visitedColonies = game.colonies.filter((colony) => colony.visitor === player.id);
        const hasFreeTradeFleet = visitedColonies.length < player.colonies.getFleetSize();
        const tradeInput = this.trade(player, tradeableColonies);
        if (visitedColonies.length > 0) {
            orOptions.options.push(new SelectColony_1.SelectColony('Select a colony tile to recall a trade fleet from', 'OK', visitedColonies, (colony) => {
                game.log('${0} is reusing a trade fleet from ${1}', (b) => b.player(player).colony(colony));
                colony.visitor = undefined;
                player.colonies.tradesThisGeneration--;
                game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => tradeInput));
                return undefined;
            }));
        }
        if (hasFreeTradeFleet) {
            if (orOptions.options.length === 1) {
                orOptions.options.push(new SelectOption_1.SelectOption('Use an available trade fleet', 'OK', () => {
                    game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => tradeInput));
                    return undefined;
                }));
            }
            else {
                game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => tradeInput));
            }
        }
        if (orOptions.options.length === 1) {
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => orOptions.options[0]));
        }
        if (orOptions.options.length > 1) {
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => orOptions));
        }
    }
    bespokeCanPlay(player) {
        return player.colonies.getPlayableColonies(true).length > 0 || this.tradeableColonies(player).length > 0;
    }
    bespokePlay(player) {
        const game = player.game;
        if (player.colonies.getPlayableColonies(true).length > 0) {
            game.defer(new BuildColony_1.BuildColony(player, {
                allowDuplicate: true,
                title: 'Select colony for Huygens Observatory',
                cb: () => this.tryToTrade(player),
            }));
        }
        else {
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                this.tryToTrade(player);
                return undefined;
            }));
        }
        return undefined;
    }
}
exports.HuygensObservatory = HuygensObservatory;
