"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Philares = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const AndOptions_1 = require("../../inputs/AndOptions");
const CardName_1 = require("../../../common/cards/CardName");
const Priority_1 = require("../../deferredActions/Priority");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const BoardType_1 = require("../../boards/BoardType");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class Philares extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.PHILARES,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 47,
            firstAction: {
                text: 'Place a greenery tile and raise the oxygen 1 step',
                greenery: {},
            },
            metadata: {
                cardNumber: 'R25',
                hasExternalHelp: true,
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
        const selectMegacredit = new SelectAmount_1.SelectAmount('Megacredits', 'Select', 0, resourceCount)
            .andThen((amount) => {
            megacreditsAmount = amount;
            return undefined;
        });
        const selectSteel = new SelectAmount_1.SelectAmount('Steel', 'Select', 0, resourceCount)
            .andThen((amount) => {
            steelAmount = amount;
            return undefined;
        });
        const selectTitanium = new SelectAmount_1.SelectAmount('Titanium', 'Select', 0, resourceCount)
            .andThen((amount) => {
            titaniumAmount = amount;
            return undefined;
        });
        const selectPlants = new SelectAmount_1.SelectAmount('Plants', 'Select', 0, resourceCount)
            .andThen((amount) => {
            plantsAmount = amount;
            return undefined;
        });
        const selectEnergy = new SelectAmount_1.SelectAmount('Energy', 'Select', 0, resourceCount)
            .andThen((amount) => {
            energyAmount = amount;
            return undefined;
        });
        const selectHeat = new SelectAmount_1.SelectAmount('Heat', 'Select', 0, resourceCount)
            .andThen((amount) => {
            heatAmount = amount;
            return undefined;
        });
        const selectResources = new AndOptions_1.AndOptions(selectMegacredit, selectSteel, selectTitanium, selectPlants, selectEnergy, selectHeat)
            .andThen(() => {
            if (megacreditsAmount +
                steelAmount +
                titaniumAmount +
                plantsAmount +
                energyAmount +
                heatAmount > resourceCount) {
                throw new Error('Need to select ' + resourceCount + ' resource(s)');
            }
            philaresPlayer.stock.add(Resource_1.Resource.MEGACREDITS, megacreditsAmount, { log: true });
            philaresPlayer.stock.add(Resource_1.Resource.STEEL, steelAmount, { log: true });
            philaresPlayer.stock.add(Resource_1.Resource.TITANIUM, titaniumAmount, { log: true });
            philaresPlayer.stock.add(Resource_1.Resource.PLANTS, plantsAmount, { log: true });
            philaresPlayer.stock.add(Resource_1.Resource.ENERGY, energyAmount, { log: true });
            philaresPlayer.stock.add(Resource_1.Resource.HEAT, heatAmount, { log: true });
            return undefined;
        });
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
            adjacentSpacesWithPlayerTiles.filter((space) => space.player?.id !== cardOwner.id) :
            adjacentSpacesWithPlayerTiles.filter((space) => space.player?.id === cardOwner.id);
        if (eligibleTiles.length > 0) {
            cardOwner.defer(() => {
                cardOwner.game.log('${0} must select ${1} bonus resource(s) from ${2}\' ability', (b) => b.player(cardOwner).number(eligibleTiles.length).card(this));
                return this.selectResources(cardOwner, eligibleTiles.length);
            }, cardOwner.id !== activePlayer.id ? Priority_1.Priority.OPPONENT_TRIGGER : Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        }
    }
}
exports.Philares = Philares;
