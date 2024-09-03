"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Philares = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const Priority_1 = require("../../deferredActions/Priority");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const BoardType_1 = require("../../boards/BoardType");
const Options_1 = require("../Options");
const SelectResources_1 = require("../../inputs/SelectResources");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
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
        const count = eligibleTiles.length;
        if (count > 0) {
            cardOwner.defer(() => {
                cardOwner.game.log('${0} must select ${1} bonus resource(s) from ${2}\' ability', (b) => b.player(cardOwner).number(count).card(this));
                return new SelectResources_1.SelectResources((0, MessageBuilder_1.message)('Gain ${0} standard resources', (b) => b.number(count)), count)
                    .andThen((units) => {
                    cardOwner.stock.addUnits(units, { log: true });
                    return undefined;
                });
            }, cardOwner.id !== activePlayer.id ? Priority_1.Priority.OPPONENT_TRIGGER : Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        }
    }
}
exports.Philares = Philares;
