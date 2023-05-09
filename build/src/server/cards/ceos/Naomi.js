"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Naomi = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const constants_1 = require("../../../common/constants");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
class Naomi extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.NAOMI,
            metadata: {
                cardNumber: 'L14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.colonies(1).colon().energy(2).megacredits(3);
                    b.br.br.br;
                    b.opgArrow().text('SET ALL').colonies(1).asterix();
                }),
                description: 'When you build a colony, gain 2 energy and 3 M€. Once per game, move each colony tile track marker to its highest or lowest value.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        const openColonies = player.game.colonies.filter((colony) => colony.isActive && colony.visitor === undefined);
        return openColonies.length > 0;
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const activeColonies = game.colonies.filter((colony) => colony.isActive);
        activeColonies.forEach((colony) => {
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Move the ' + colony.name + ' tile track marker to its HIGHEST value', 'Select', () => {
                colony.trackPosition = constants_1.MAX_COLONY_TRACK_POSITION;
                return undefined;
            }), new SelectOption_1.SelectOption('Move the ' + colony.name + ' tile track marker to its LOWEST value', 'Select', () => {
                colony.trackPosition = colony.colonies.length;
                return undefined;
            }))));
        });
        return undefined;
    }
}
exports.Naomi = Naomi;
