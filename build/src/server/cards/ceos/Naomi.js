"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Naomi = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const constants_1 = require("../../../common/constants");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
const Resource_1 = require("../../../common/Resource");
class Naomi extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.NAOMI,
            metadata: {
                cardNumber: 'L14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.effect('When you build a colony, gain 2 energy and 3 M€.', (eb) => {
                        eb.colonies(1).startEffect.energy(2).megacredits(3);
                    });
                    b.br.br.br;
                    b.opgArrow().text('SET ALL').colonies(1).asterix();
                }),
                description: 'Once per game, move each colony tile track marker to its highest or lowest value.',
            },
        });
    }
    canAct(player) {
        return super.canAct(player) && ColoniesHandler_1.ColoniesHandler.tradeableColonies(player.game).length > 0;
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const activeColonies = game.colonies.filter((colony) => colony.isActive);
        activeColonies.forEach((colony) => {
            player.defer(() => new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Move the ' + colony.name + ' tile track marker to its HIGHEST value').andThen(() => {
                colony.trackPosition = constants_1.MAX_COLONY_TRACK_POSITION;
                return undefined;
            }), new SelectOption_1.SelectOption('Move the ' + colony.name + ' tile track marker to its LOWEST value').andThen(() => {
                colony.trackPosition = colony.colonies.length;
                return undefined;
            })));
        });
        return undefined;
    }
    onColonyAdded(player, cardOwner) {
        if (player === cardOwner) {
            player.stock.add(Resource_1.Resource.ENERGY, 2, { log: true });
            player.stock.add(Resource_1.Resource.MEGACREDITS, 3, { log: true });
        }
    }
}
exports.Naomi = Naomi;
