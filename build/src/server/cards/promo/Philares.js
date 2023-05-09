"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Philares = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const AndOptions_1 = require("../../inputs/AndOptions");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const BoardType_1 = require("../../boards/BoardType");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class Philares extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.PHILARES,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 47,
            firstAction: {
                text: 'Place a greenery tile and raise the oxygen 1 step',
                greenery: {},
            },
            metadata: {
                cardNumber: 'R25',
                description: 'You start with 47 M€. As your first action, place a greenery tile and raise the oxygen 1 step.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(47).nbsp.greenery();
                    b.corpBox('effect', (ce) => {
                        ce.effect('Each new adjacency between your tile and an opponent\'s tile gives you a standard resource of your choice [regardless of who just placed a tile].', (eb) => {
                            eb.emptyTile('normal', { size: Size_1.Size.SMALL, all: Options_1.all }).nbsp;
                            eb.emptyTile('normal', { size: Size_1.Size.SMALL }).startEffect.wild(1);
                        });
                    });
                }),
            },
        });
    }
    selectResources(philaresPlayer, resourceCount) {
        let megacreditsAmount = 0;
        let steelAmount = 0;
        let titaniumAmount = 0;
        let plantsAmount = 0;
        let energyAmount = 0;
        let heatAmount = 0;
        const selectMegacredit = new SelectAmount_1.SelectAmount('Megacredits', 'Select', (amount) => {
            megacreditsAmount = amount;
            return undefined;
        }, 0, resourceCount);
        const selectSteel = new SelectAmount_1.SelectAmount('Steel', 'Select', (amount) => {
            steelAmount = amount;
            return undefined;
        }, 0, resourceCount);
        const selectTitanium = new SelectAmount_1.SelectAmount('Titanium', 'Select', (amount) => {
            titaniumAmount = amount;
            return undefined;
        }, 0, resourceCount);
        const selectPlants = new SelectAmount_1.SelectAmount('Plants', 'Select', (amount) => {
            plantsAmount = amount;
            return undefined;
        }, 0, resourceCount);
        const selectEnergy = new SelectAmount_1.SelectAmount('Energy', 'Select', (amount) => {
            energyAmount = amount;
            return undefined;
        }, 0, resourceCount);
        const selectHeat = new SelectAmount_1.SelectAmount('Heat', 'Select', (amount) => {
            heatAmount = amount;
            return undefined;
        }, 0, resourceCount);
        const selectResources = new AndOptions_1.AndOptions(() => {
            if (megacreditsAmount +
                steelAmount +
                titaniumAmount +
                plantsAmount +
                energyAmount +
                heatAmount > resourceCount) {
                throw new Error('Need to select ' + resourceCount + ' resource(s)');
            }
            philaresPlayer.addResource(Resource_1.Resource.MEGACREDITS, megacreditsAmount, { log: true });
            philaresPlayer.addResource(Resource_1.Resource.STEEL, steelAmount, { log: true });
            philaresPlayer.addResource(Resource_1.Resource.TITANIUM, titaniumAmount, { log: true });
            philaresPlayer.addResource(Resource_1.Resource.PLANTS, plantsAmount, { log: true });
            philaresPlayer.addResource(Resource_1.Resource.ENERGY, energyAmount, { log: true });
            philaresPlayer.addResource(Resource_1.Resource.HEAT, heatAmount, { log: true });
            return undefined;
        }, selectMegacredit, selectSteel, selectTitanium, selectPlants, selectEnergy, selectHeat);
        selectResources.title = 'Philares effect: select ' + resourceCount + ' resource(s)';
        return selectResources;
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        if (boardType !== BoardType_1.BoardType.MARS) {
            return;
        }
        if (space.player === undefined) {
            return;
        }
        const adjacentSpaces = cardOwner.game.board.getAdjacentSpaces(space);
        const adjacentSpacesWithPlayerTiles = adjacentSpaces.filter((space) => space.tile !== undefined && space.player !== undefined);
        const eligibleTiles = (cardOwner.id === activePlayer.id) ?
            adjacentSpacesWithPlayerTiles.filter((space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) !== cardOwner.id; }) :
            adjacentSpacesWithPlayerTiles.filter((space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === cardOwner.id; });
        if (eligibleTiles.length > 0) {
            cardOwner.game.defer(new DeferredAction_1.SimpleDeferredAction(cardOwner, () => {
                cardOwner.game.log('${0} must select ${1} bonus resource(s) from ${2}\' ability', (b) => b.player(cardOwner).number(eligibleTiles.length).card(this));
                return this.selectResources(cardOwner, eligibleTiles.length);
            }), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        }
    }
}
exports.Philares = Philares;
