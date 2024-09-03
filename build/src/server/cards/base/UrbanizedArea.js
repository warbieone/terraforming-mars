"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrbanizedArea = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const PlaceCityTile_1 = require("../../deferredActions/PlaceCityTile");
const CardName_1 = require("../../../common/cards/CardName");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
class UrbanizedArea extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.URBANIZED_AREA,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 10,
            behavior: {
                production: { energy: -1, megacredits: 2 },
            },
            metadata: {
                cardNumber: '120',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(2);
                    }).city().asterix();
                }),
                description: 'Decrease your energy production 1 step and increase your M€ production 2 steps. Place a city tile ADJACENT TO AT LEAST 2 OTHER CITY TILES.',
            },
        });
    }
    getAvailableSpaces(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions)
            .filter((space) => player.game.board.getAdjacentSpaces(space).filter((adjacentSpace) => Board_1.Board.isCitySpace(adjacentSpace)).length >= 2);
    }
    bespokeCanPlay(player, canAffordOptions) {
        return this.getAvailableSpaces(player, canAffordOptions).length > 0;
    }
    bespokePlay(player) {
        player.game.defer(new PlaceCityTile_1.PlaceCityTile(player, {
            title: 'Select space next to at least 2 other city tiles',
            spaces: this.getAvailableSpaces(player),
        }));
        return undefined;
    }
}
exports.UrbanizedArea = UrbanizedArea;
