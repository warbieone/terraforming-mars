"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologicalZone = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const TileType_1 = require("../../../common/TileType");
const PlaceTile_1 = require("../../../server/deferredActions/PlaceTile");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Phase_1 = require("../../../common/Phase");
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
                eb.tag(Tag_1.Tag.ANIMAL).slash().tag(Tag_1.Tag.PLANT).startEffect.resource(CardResource_1.CardResource.ANIMAL);
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
            requirements: { greeneries: 1 },
            metadata,
        });
    }
    getAvailableSpaces(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions)
            .filter((space) => player.game.board.getAdjacentSpaces(space).filter(Board_1.Board.isGreenerySpace).length > 0);
    }
    bespokeCanPlay(player, canAffordOptions) {
        return this.getAvailableSpaces(player, canAffordOptions).length > 0;
    }
    onCardPlayed(player, card) {
        const qty = player.tags.cardTagCount(card, [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT]);
        player.addResourceTo(this, { qty, log: true });
    }
    bespokePlay(player) {
        if (player.game.phase === Phase_1.Phase.PRELUDES && player.playedCards.length > 0 && player.playedCards[player.playedCards.length - 1].name === CardName_1.CardName.ECOLOGY_EXPERTS) {
            player.addResourceTo(this, { qty: 1, log: true });
        }
        player.game.defer(new PlaceTile_1.PlaceTile(player, {
            tile: { tileType: TileType_1.TileType.ECOLOGICAL_ZONE, card: this.name },
            on: () => this.getAvailableSpaces(player),
            title: 'Select space next to greenery for special tile',
            adjacencyBonus: this.adjacencyBonus,
        }));
        return undefined;
    }
}
exports.EcologicalZone = EcologicalZone;
