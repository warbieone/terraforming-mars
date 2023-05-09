"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologicalZone = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const TileType_1 = require("../../../common/TileType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Phase_1 = require("../../../common/Phase");
const Options_1 = require("../Options");
const Board_1 = require("../../boards/Board");
class EcologicalZone extends Card_1.Card {
    constructor(name = CardName_1.CardName.ECOLOGICAL_ZONE, cost = 12, adjacencyBonus = undefined, metadata = {
        description: {
            text: 'Requires that YOU have a greenery tile. Place this tile adjacent to ANY greenery.',
            align: 'left',
        },
        cardNumber: '128',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.effect('When you play an animal or plant tag INCLUDING THESE, add an animal to this card.', (eb) => {
                eb.animals(1, { played: Options_1.played }).slash().plants(1, { played: Options_1.played }).startEffect.animals(1);
            }).br;
            b.vpText('1 VP per 2 animals on this card.').tile(TileType_1.TileType.ECOLOGICAL_ZONE, true).asterix();
        }),
    }) {
        super({
            type: CardType_1.CardType.ACTIVE,
            name,
            tags: [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT],
            cost,
            resourceType: CardResource_1.CardResource.ANIMAL,
            adjacencyBonus,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.greeneries()),
            metadata,
        });
    }
    getAvailableSpaces(player) {
        return player.game.board.getAvailableSpacesOnLand(player)
            .filter((space) => player.game.board.getAdjacentSpaces(space).filter(Board_1.Board.isGreenerySpace).length > 0);
    }
    bespokeCanPlay(player) {
        return this.getAvailableSpaces(player).length > 0;
    }
    onCardPlayed(player, card) {
        const qty = player.tags.cardTagCount(card, [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT]);
        player.addResourceTo(this, { qty, log: true });
    }
    bespokePlay(player) {
        if (player.game.phase === Phase_1.Phase.PRELUDES && player.playedCards.length > 0 && player.playedCards[player.playedCards.length - 1].name === CardName_1.CardName.ECOLOGY_EXPERTS) {
            player.addResourceTo(this, { qty: 1, log: true });
        }
        return new SelectSpace_1.SelectSpace('Select space next to greenery for special tile', this.getAvailableSpaces(player), (requestedSpace) => {
            player.game.addTile(player, requestedSpace, {
                tileType: TileType_1.TileType.ECOLOGICAL_ZONE,
            });
            requestedSpace.adjacency = this.adjacencyBonus;
            return undefined;
        });
    }
}
exports.EcologicalZone = EcologicalZone;
